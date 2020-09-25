function pad(n) {
    return ('0' + n).substr(-2);
}

function stamp() {
    const d = new Date();
    return [d.getHours(), d.getMinutes(), d.getSeconds()].map(pad).join(':');
}
