var socket = io();

socket.on('connect', function () {
    var params = $.deparam(window.location.search);
    socket.emit('join', params);
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
    //MOVE INTO LOAD MESSAGE LOGIC
    var $messageArea = $('#message-area');
    $messageArea.css('max-height', ($(window).height() - $('#gif-search-area').height()) + 'px');
    $messageArea.scrollTop = $messageArea.scrollHeight;

    var search = $input.val();

    if (search.length >= 2) {
        $.get('/gifs?search=' + search, function (data) {
          for (var i = 0; i < 4; i++) {
              var $img = $(`#gif-${i}`);
              $img.attr('src', data[i].url)
              $img.height($img.height());
              $img.width($img.height());
          }
        });
    }

}

console.log($('#gif-search').val());
