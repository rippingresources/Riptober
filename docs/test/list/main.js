import {initMarkedExtentions} from '/assets/JS/discord.js';
initMarkedExtentions();
//<img height="200" src="https://resources.rip/assets/Images/Meat.png">
function createNewListItem(title, description) {
    var root = $('<li></li>');
    var label = $('<span id="label">Any%</span>')
    var content = $('<div id="content"></div>')

    label.text(title);
    content.html(twemoji.parse(marked.parseInline(description)));

    root.append([label, content]);
    return root;
}

var t = createNewListItem('Any%', '<img height="200" src="https://resources.rip/assets/Images/Meat.png">wawawawawawawawaWAW');
$('.list').append(t);
var t = createNewListItem('Placeholder%', 'wawawawawawawawaWAW');
$('.list').append(t);
var t = createNewListItem('Meat%', '<img height="200" src="https://resources.rip/assets/Images/Meat.png">');
$('.list').append(t);
