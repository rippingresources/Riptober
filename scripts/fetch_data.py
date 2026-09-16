import os
import sys
import time
import json
import requests
from secrets import DISCORD_TOKEN
from config import GUILD_ID


BASE_URL = 'https://discord.com/api/v9'
FILE_NAME = os.path.basename(__file__)
DATA_DIR = '../unminified/data/discord'

def log(*args):
    print(f'[{FILE_NAME}]: ',args)

def color_to_hex(color):
    return f'#{str(hex(color))[2:]}'.ljust(7, '0')  if color > 0 else None

def fetch_json(endpoint):
    r = requests.get(f'{BASE_URL}/{endpoint}', headers={"authorization": DISCORD_TOKEN})
    if not r.ok:
        if r.status_code == 429:
            s_time = r.json()['retry_after']+0.5
            log(f'Rate Limited. Sleeping for {s_time}s')
            time.sleep(s_time)
            return fetch_json(endpoint)

        log(r.status_code,r.text)
        sys.exit(-1)
    return r.json()

def save_json(name, data):
    os.makedirs(f'{DATA_DIR}/{GUILD_ID}', mode=0o777, exist_ok=True)
    with open(f'{DATA_DIR}/{GUILD_ID}/{name}.json', "w+") as f:
        f.write(json.dumps(data, indent=4))


def fetch_channels():
    return {c['id']: c['name'] for c in fetch_json(f'/guilds/{GUILD_ID}/channels')}

def fetch_roles():
    formatted = {}
    j = fetch_json(f'/guilds/{GUILD_ID}/roles')


    for r in j:
        formatted[r['id']] = {
            'name': r['name'],
            'color': color_to_hex(r['color']),
            'position': r['position'],
        }

    return formatted

def fetch_members():
    members = {}
    roles = {}

    with open(f'{DATA_DIR}/{GUILD_ID}/members.json', "r") as rf:
        members = json.load(rf)

    # No error checking? Add some
    #with open(f'{DATA_DIR}/{GUILD_ID}/roles.json', "r") as rf:
    #    roles = json.load(rf)
    #
    ## CHECK EACH ROLE
    #num_roles = len(roles.keys())
    #num_roles_checked = 0
    #for r in roles.keys():
    #    log(f'fetch_members - Roles: {num_roles_checked}/{num_roles} [{roles[r]["name"]}]')
    #    num_roles_checked+=1
    #
    #    j = fetch_json(f'/guilds/{GUILD_ID}/roles/{r}/member-ids')
    #    for m in j:
    #        if not m in members:
    #            members[m] = {'colorRoleId': r}
    #
    #        # COLOR
    #        mr = members[m]['colorRoleId']
    #        if roles[r]['color'] != None and roles[r]['position'] > roles[mr]['position']:
    #            members[m]['colorRoleId'] = r


    log(f'fetch_members - Found {len(members.keys())} members')
    #log(fetch_json(f'/guilds/{GUILD_ID}/members/275033949695115264'))
    for m in members.keys():
        j = fetch_json(f'/guilds/{GUILD_ID}/members/{m}')
        log(f'fetch_members - {j['user']['username']}')

        members[m]['server_avatar'] = j['avatar']
        members[m]['server_banner'] = j['banner']
        members[m]['server_nick'] = j['nick']

        members[m]['username'] = j['user']['username']
        members[m]['avatar'] = j['user']['avatar'] if 'avatar' in j['user'] else None
        members[m]['banner'] = j['user']['banner'] if 'banner' in j['user'] else None
        members[m]['nick'] = j['user']['global_name'] if 'global_name' in j['user'] else None
        members[m]['tag'] = j['user']['tag'] if 'tag' in j['user'] else None
        members[m]['tag'] = j['user']['badge'] if 'badge' in j['user'] else None

        members[m]['banner_color'] = j['user']['banner_color'] if 'banner_color' in j['user'] else None
        members[m]['accent_color'] = j['user']['accent_color'] if 'accent_color' in j['user'] else None
        members[m]['display_name_styles'] = j['display_name_styles']


    #log(j)

    return members

# save
#save_json('roles', fetch_roles())
save_json('members', fetch_members())
#save_json('channels', fetch_channels())

