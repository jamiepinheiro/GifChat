$.get('/newRoom', function (data) {
    $('#joinRoomLink').attr('href', data);
    $('#joinRoomLink').removeClass('disabled');
});
