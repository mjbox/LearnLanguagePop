
// private static value
var _createListener = null;

class VideoManager { 
    init(cb) {
        if(cb === null) return;
        _createListener = cb;
        if(document.getElementById('VideoScript') !== null) {
            // Video script is already loaded  on the body.
            _createListener();
        } else {
            window.onYouTubeIframeAPIReady = _createListener;
            var script = document.createElement('script');
            script.id = "VideoScript";
            script.src = 'http://www.youtube.com/player_api';
            document.body.appendChild(script);
        }
    }
    create(videoID, viewID, cbReady, cbStateChange) {
        return new window.YT.Player(viewID, {
            height: '360',
            width: '640',
            videoId: videoID,
            events: {
                'onReady': cbReady,
                'onStateChange': cbStateChange
            },
            playerVars: { 
              'controls': 1,
              'rel': 0 
            }
          });
    }
}

var videoManager = new VideoManager();
export default videoManager;