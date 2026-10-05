import {renderMessages, members} from '/assets/JS/discord.js';
const frame = $(".discord #channel");

//TEMP
const cue = 'hey guys! sasha\'s currently resting so she gave me the opportunity to post the prompt for today\n\nanyways here\'s the prompt cuz i cant type anymore idk why theres a 6 hour wait mode:\n\`\`\`Day 4 - Sad\`\`\`\n@riptoberpings (i cant ping sasha forgot to give me pinging permission)'


frame.append(renderMessages([cue], "710373509410324500", "2026-10-02T11:02:29.293Z"))

//

/*
CSV.fetch({url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTvDewFfwojvKHEOF12J1aeT4Ph21e4DeJJNpcjTJJKXwjM7vBdQ0FReciPS5Ou81-7ja_FQ_-G6gze/pub?output=csv'}).done(function(dataset) {

    const day =  Math.floor(Math.random()*(dataset.fields.length-1))+1
    const year = Math.floor(Math.random()*(dataset.records.length))

    console.debug(dataset.records[year][day]);

    frame.append($(`<div class="divider"><span>October ${day}, ${year+2020}</span></div>`));
    var keys = Object.keys(members);
    const ruid = keys[Math.floor(Math.random()*(keys.length))]

    var msgs = [`\`\`\`Day ${day} - ${dataset.records[year][day]}\`\`\`\n<@&1023989653033980076>`]
    CSV.fetch({url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTvDewFfwojvKHEOF12J1aeT4Ph21e4DeJJNpcjTJJKXwjM7vBdQ0FReciPS5Ou81-7ja_FQ_-G6gze/pub?output=csv&gid=1497237988#gid=1497237988'}).done(function(notes) {
        if (notes.records[year][day] != null) { msgs.push(notes.records[year][day]) }
        frame.append(renderMessages(msgs, ruid, `${year+2020}-10-${day.toString().padStart(2, "0")}T11:00:00.000Z`));
    });
});
*/

