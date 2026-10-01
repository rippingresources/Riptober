import {renderMessages, members} from '/assets/JS/discord.js';
const frame = $(".discord #channel");

//TEMP
const cue = '```Day 1 - Dawn```\n\n<@&1023989653033980076>'


frame.append(renderMessages([cue], "1057807052669460480", "2026-10-01T11:07:13.256Z"))

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

