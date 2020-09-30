let room = location.search.substr(1);
const big = Math.pow(16, 10);
let connected = false;

if (!room) {
    room = ((Math.random() * big | 0) + big).toString(16);
    history.replaceState(null, null, `?${room}`);
}

const socket = io();

socket.on('connect', () => {
    if (!connected) {
        connected = true;
        socket.emit('join', { room });
    }
});

socket.on('message', (data) => {
    write(`<them> ${data}`);
});

const out = document.querySelector('pre');
function write(msg) {
    const row = document.createElement('div');
    row.appendChild(document.createTextNode(`[${stamp()}] ${msg}`));
    out.appendChild(row);
    out.scrollTop = out.scrollHeight;
}

const input = document.querySelector('input');
input.addEventListener('keypress', function (e) {
    if (e.keyCode === 13 && connected) {
        e.preventDefault();
        write(`<you> ${input.value}`);
        socket.emit('message', { msg: input.value, room });
        input.value = '';
        input.focus();
    }
});
