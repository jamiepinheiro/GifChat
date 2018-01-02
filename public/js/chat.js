var socket = io();

socket.on('connect', function () {
    var params = $.deparam(window.location.search);
    socket.emit('join', params);
});
