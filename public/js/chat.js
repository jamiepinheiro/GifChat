var socket = io();

socket.on('connect', function () {
    var params = $.deparam(window.location.search);
    socket.emit('join', params);
});

socket.on('gotMessage', function (message) {
    var $messageArea = $('#message-area');
    $messageArea.css('max-height', ($(window).height() - $('#gif-search-area').height() -$('#header').height()) * 0.95 + 'px');
    $messageArea.animate({
      scrollTop: $messageArea.scrollHeight - $messageArea.clientHeight
    }, 1000);
    console.log(message);
});

socket.on('status', function (status) {
    if (status == 'Waiting') {
        $('#loadingScreen').show();
        $('#newChatScreen').hide();
        $('#chatScreen').hide();
    }else if (status == 'Ended') {
        socket.disconnect()
        $('#loadingScreen').hide();
        $('#newChatScreen').show();
        $('#chatScreen').hide();
    }else if (status == 'Chating') {
        $('#loadingScreen').hide();
        $('#newChatScreen').hide();
        $('#chatScreen').show();
    }
});

// predict when a user is done typing
var typingTimer;
var doneTypingInterval = 1000;
var $input = $('#gif-search');

$input.on('keyup', function () {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
});

$input.on('keydown', function () {
    clearTimeout(typingTimer);
});

$input.change(function () {
    clearTimeout(typingTimer);
    doneTyping()
});

function doneTyping () {

    var search = $input.val();

    if (search.length >= 2) {
        $.get('/gifs?search=' + search, function (data) {
          for (var i = 0; i < 4; i++) {
              var $img = $(`#gif-${i}`);
              $img.attr('src', '/img/gifs/temp.png')
              if (data[i]) {
                  $img.attr('name', data[i].name);
                  $img.attr('src', data[i].url)
                  $img.height($img.height());
                  $img.width($img.height());
              }
          }
        });
    }

}

var sendMessage = function (i) {
    var gif = $(`#gif-${i}`);
    if (gif.attr('src') != '/img/gifs/temp.png') {
        socket.emit('createMessage', {
            name: gif.attr('name'),
            url: gif.attr('src')
        });
    }
}

$('#newChatButton').on('click', () => {
    $.get('/newRoom', function (data) {
         window.open(data, '_parent');
    });
});
