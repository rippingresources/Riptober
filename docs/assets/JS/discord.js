//https://cdn.discordapp.com/emojis/700517552903684207.webp?size=40
//https://cdn.discordapp.com/avatars/230307446957146112/19d3e960c1ae75222d7440f4539aebb1.webp?size=80

const BASE_DOMAIN = "discordapp.com";
const GUILD_ID = "579770995519520797";

const EMOJI_SIZE = 48;
const EMOJI_INLINE_SIZE = 22;
const EMOJI_REACTION_SIZE = 20;

//const REGEX_ALL = /<(?:@[!&]?|#|:([\w]{2,32}):)(\d+)>/g;
const REGEX_EMOJI = /<:([\w]{2,32}):([\d]{18,28})>/g
const REGEX_BASIC = /<(@[!&]?|#)(\d+)>/g;
const REGEX_TIME = /<?t:([\w]{2,32}):([a-zA-Z])>/

const MENTIONS = ['@everyone', `@here`, '<@&582187540380123136>', '<@&1023989653033980076>']

const ICONS = {
    "Hash": `<svg id="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M10.99 3.16A1 1 0 1 0 9 2.84L8.15 8H4a1 1 0 0 0 0 2h3.82l-.67 4H3a1 1 0 1 0 0 2h3.82l-.8 4.84a1 1 0 0 0 1.97.32L8.85 16h4.97l-.8 4.84a1 1 0 0 0 1.97.32l.86-5.16H20a1 1 0 1 0 0-2h-3.82l.67-4H21a1 1 0 1 0 0-2h-3.82l.8-4.84a1 1 0 1 0-1.97-.32L15.15 8h-4.97l.8-4.84ZM14.15 14l.67-4H9.85l-.67 4h4.97Z" clip-rule="evenodd" class=""></path></svg>`,
}

// // // // // //

marked.use({
    extensions: [
        {
            name: 'discord-emoji',
            level: 'inline',
            start(src) { return src.match(REGEX_EMOJI)?.index; },
            tokenizer(src, tokens) {
                const match = new RegExp(`^${REGEX_EMOJI.source}`, 'i').exec(src);
                if (!match) return false;
                const size = EMOJI_INLINE_SIZE;//match[0]==src ? EMOJI_SIZE : EMOJI_INLINE_SIZE;
                const alt = match[1]
                const id = match[2]
                return {
                    type: 'discord-emoji',
                    raw: match[0],
                    emoji: `https://cdn.${BASE_DOMAIN}/emojis/${id}.webp?size=${size*2}`,
                    name: alt,
                    size: size

                }

            },
            renderer(token) {

                return `<img alt="${token.name}" src="${token.emoji}" height="${token.size}" class="emoji">`;
            },

        },
        {
            name: 'discord-mention',
            level: 'inline',
            start(src) { return src.match(REGEX_BASIC)?.index; },
           tokenizer(src, tokens) {
               const match = new RegExp(`^${REGEX_BASIC.source}`, 'i').exec(src);
               if (!match) return false;
               const mentionType = match[1]
               const id = match[2]
               return {
                   type: 'discord-mention',
                   raw: match[0],
                   id: id,
                   mentionType: mentionType,
               }

           },
           renderer(token) {
               switch (token.mentionType) {
                   case '#': // Channel
                       return `<span class="mention">${ICONS.Hash}<a href="discord://-/channels/${GUILD_ID}/${token.id}">${channels[token.id] || "Unknown"}</a></span>`;
                       break;
                   case '@&':
                       return `<span class="mention" style="background-color: ${roles[token.id]?.color}1a; color: ${roles[token.id]?.color}; ">@${roles[token.id]?.name || "Unknown Role"}</span>`;
                       break;
                   case '@':
                       return `<span class="mention">@${members[token.id]?.server_nick || "Unknown User"}</span>`;
                       break;
                   default:
                       return `<span class="mention">${token.raw}</span>`;
                }
           },

        }
    ]
});

// // // // // //

async function getDiscordData(file) {
    const url = `${window.location.origin}/data/discord/${GUILD_ID}/${file}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error.message);
    }

    return {};
}

export const roles = await getDiscordData("roles.json");
export const members = await getDiscordData("members.json");
export const channels = await getDiscordData("channels.json");


// FUNCTIONS
export function renderMessages(messages, uid, timestamp = '1970-01-01T00:00:00.000Z') {
    var renderedMessages = []

    const pfp = members[uid].server_avatar ? `https://cdn.${BASE_DOMAIN}/guilds/${GUILD_ID}/users/${uid}/avatars/${(members[uid].server_avatar || members[uid].avatar)}.webp?size=80` : members[uid].avatar ? `https://cdn.discordapp.com/avatars/${uid}/${members[uid].avatar}.webp?size=80` : '/assets/Images/discord_avatars/fallback.png';
    const color = roles[members[uid].color_role_id].color || 'inherit';
    const name = members[uid].server_nick || members[uid].nick || members[uid].username || "Unknown User";

    const formattedTime = new Intl.DateTimeFormat(navigator.language, {
        timeStyle: "short",
        dateStyle: "short",
    }).format(new Date(timestamp));

    var avatar = $(`<img id="avatar" height="40" src="${pfp}" />`);
    var header = $(`<h3 id="header"><span id="username" style="color: ${color};">${name}</span><span id="tag"></span><span id="timestamp">${formattedTime}</span></h3>`);

    messages.forEach((text) => {

        var attr = '';
        MENTIONS.every((p) => {
            if (text.includes(p)) {
                attr = 'mentioned';
                return false;
            }
            return true;
        })

        var message = $(`<span class="message" ${attr}></span>`);

        if (renderedMessages.length == 0) {
            message.append(avatar);
            message.append(header);
        }

        var contents = $(`<span id="message-contents"></span>`);
        contents.html(twemoji.parse(marked.parseInline(text)));
        message.append(contents);

        renderedMessages.push(message)
    })


    return $('<il class="messages"></il>').append(renderedMessages);
};
