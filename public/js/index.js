$('#joinRoomButton').on('click', () => {
    $.get('/newRoom', function (data) {
         window.open(data, '_parent');
    });
});
