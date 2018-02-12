$('#joinRoomButton').on('click', () => {
    $.get('/newRoom', function (data) {
         window.open('/chat.html?room=' + data, '_parent');
    });
});
