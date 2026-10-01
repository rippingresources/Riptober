import {members, roles, BASE_DOMAIN, GUILD_ID} from '/assets/JS/discord.js';
const CONTAINER = $(".grid");

// Source - https://stackoverflow.com/a/47480429
const delay = ms => new Promise(res => setTimeout(res, ms));


for (let [id, data] of Object.entries(members)) {
    const pfp = data.server_avatar ? `https://cdn.${BASE_DOMAIN}/guilds/${GUILD_ID}/users/${id}/avatars/${(data.server_avatar || data.avatar)}.webp?size=80` :
    data.avatar ? `https://cdn.discordapp.com/avatars/${id}/${data.avatar}.webp?size=128` : '/assets/Images/discord_avatars/fallback.png';

    const color = roles[data.color_role_id].color || 'inherit';
    const name = data.server_nick || data.nick || data.username || "Unknown User";


    //var user = $(`<img class="avatar" alt="${name}" height="128" src="${pfp}" />`);
    var user = new Image(128);
    user.onerror = () => { user.src = `/assets/Images/discord_avatars/fallback.png`; };
    user.src = pfp;
    user.alt = name;
    user.className = "avatar";


    CONTAINER.append(user);
    await delay(200);
}
