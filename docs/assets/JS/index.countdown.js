const DATE = new Date("2026-10-1 11:00 UTC")

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;

function calcTimeTil() {
    const now = new Date();
    const diff = DATE - now;

    const weeks = Math.floor(diff/DAY);
    const days = Math.floor((diff % WEEK) /DAY);
    const hours = Math.floor((diff % DAY) / HOUR);
    const minutes = Math.floor((diff % HOUR) / MINUTE);
    const seconds = Math.floor((diff % MINUTE) / SECOND);

    return [weeks, days, hours, minutes, seconds];
}

var timer = setInterval(() => {
    var str = "";
    var remaining = calcTimeTil();

    remaining[1] = remaining[0]*7;
    remaining[0] = 0;

    var append = false;
    remaining.forEach((n) => {
        var padded = n.toString().padStart(2, "0")

        if (append) str += `:${padded}`;

        if (n > 0 && !append) {
            append = true;
            str += padded
        }

    });

    $("#countdown").text(str);
}, 1000);
