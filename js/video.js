var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: 'kNNpZ1-4YW0',
        events: {
            'onReady': function(e) {
                //e.target.playVideo();
                $('#mute_button').show();
            }
        },
        playerVars: {
            'autoplay': '0',
            'loop': '1',
            'playlist': 'kNNpZ1-4YW0',
            'start': '3',
            'enablejsapi': '1',
            'rel': '0'
        }
    });
}

function handleMute() {
    if (player.getPlayerState() == 1) { player.pauseVideo() }
    else { player.playVideo() }

    if (player.getPlayerState() == 1) {
        $('#mute_button_icon').removeClass("fa-volume-up").addClass("fa-volume-off");
    }
    else {
        $('#mute_button_icon').removeClass("fa-volume-off").addClass("fa-volume-up");
    }
}
