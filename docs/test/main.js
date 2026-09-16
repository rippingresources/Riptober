import {renderMessages} from '/assets/JS/discord.js';

// TEST
const text1 = `Test
wow
<#1305496269547896852>
<:jolly_fellow:852008796381118514>
test <:rivulet:1473089766940741672>ba<:survivor:1473089794581205012>
a<:siffling:1484633982543855808>a
<@&778253578862854169>
<@751106291539378281>`

const text2 = `__**Colour Roles:**__
🔴 - <@&633743162476855318>
🔶 - <@&633743235491168269>
💛 - <@&633743241287565312>
💚 - <@&633743372217090068>
💙 - <@&633743437581254696>
💜 - <@&633743568770695178>
🏳️‍🌈 - <@&635927881725378562>
🖤 - <@&640305928926658581>
🩷 - <@&1275413380836102174>`

const text3 = `\`\`\`Day 2 - Red\`\`\`
<@&1023989653033980076>`

const msg1 = [
    `React with 🎵 to get the <@&1023989653033980076> role.`,
`<@&582187540380123136>`,
`React with 🇼 to die instantly.`
]

const text4 = `[Yo-Yo-Yoshi!](https://youtu.be/648fkNsFKoY) from Yoshi's Story uses EastWest - Phat + Phunky
\`CD 1 -> Partition A -> VOL 7  4M -> 7 KIT [7 SNARE]\`
\`CD 1 -> Partition D -> VOL 6  5M -> 25 KIT [25 KICK 3]\``


// TEST END

const out = $(".discord #channel");

out.append(renderMessages([text1], "751106291539378281"))
out.append(renderMessages([text2], "96629205541859328"));
out.append(renderMessages(msg1, "96629205541859328"));
out.append(renderMessages([text3], "282673497002475520"));
out.append(renderMessages([text4, "TODO: Fix Me"], "915974271921180714"));
