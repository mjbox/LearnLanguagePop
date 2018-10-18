import React, { Component } from 'react';

class YoutubeC extends Component {
  constructor() {
    super();
    window.onYouTubeIframeAPIReady = this.onLoadedYTScript.bind(this);
    window.onPlayerReady = this.onPlayerReady.bind(this);
    window.onPlayerStateChange = this.onPlayerStateChange.bind(this);
  }
  
  onLoadedYTScript() {
    var player = new window.YT.Player('player', {
      height: '360',
      width: '640',
      videoId: 'M7lc1UVf-VE',
      events: {
          'onReady': window.onPlayerReady,
          'onStateChange': window.onPlayerStateChange
      },
      playerVars: { 
        'controls': 0,
      }
    });
    //player.setSize(100, 400);
    console.log("onLoadedYTScript ");
  }
  onPlayerReady(event) {
  }
  onPlayerStateChange(event) {
    console.log(event);
  }

  componentWillMount() {
    console.log('componentWillMount is called');
    var script = document.createElement('script');
    script.src = 'http://www.youtube.com/player_api';
    document.body.appendChild(script);
  }
  componentDidMount() {
    console.log("componentDidMount");
  }
  render() {
    return (
      <div id='player' />
    );
  }
}
export default YoutubeC