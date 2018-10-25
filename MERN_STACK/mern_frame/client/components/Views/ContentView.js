import React, { Component } from 'react';
import SubtitleList from './SubtitleList';
import dbManager from '../Controls/dbManager';
import VideoManager from '../Controls/VideoManager';

var querystring = require('querystring');

class ContentView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player : null,
      list : null
    };
    this.ScriptList = React.createRef();
    this.onTick = this.onTick.bind(this);
    this.onLoadedYTScript = this.onLoadedYTScript.bind(this);
    this.dbListener = this.dbListener.bind(this);
    this.onPlayerReady = this.onPlayerReady.bind(this);
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    this.onEventScript = this.onEventScript.bind(this);
  }
  
  onLoadedYTScript() {
    var id = this.props.match.params.name;
    this.setState({
      player : VideoManager.create(id, 'player', this.onPlayerReady, this.onPlayerStateChange)
    });
    dbManager.getdb("getScript", id, this.dbListener);
    console.log("onLoadedYTScript ");
  }
  dbListener(req, res) {
    if(res !== null) {
      this.setState({
        list: res.script
      });
    }
  }
  onPlayerReady(event) {
  }
  onPlayerStateChange(event) {
    console.log(event);
    switch(event.data) {
      case -1:  // not yet started
        break;
      case 1: // playing
        this.timer = setInterval(this.onTick, 1000);
        break;
      case 2: // paused
        clearInterval(this.timer);
        break;
      case 3: // bufferd
        break;
    }
  }
  componentDidMount() {
    VideoManager.init(this.onLoadedYTScript);

    if(this.props.match.params.name === undefined) {
      const values = queryString.parse(this.props.location.search)
      console.log(values.filter) // "top"
      console.log(values.origin) // "im"
    }
    console.log('componentDidMount ' + this.props.match.params.name);
  }
  componentWillUnmount() {
    // 이벤트, setTimeout, 외부 라이브러리 인스턴스 제거
    console.log("componentWillUnmount");
    clearInterval(this.timer);
    this.state.player.stopVideo();
    this.state.player.destroy();
  }
  onEventScript(event) {
    console.log(event);
    this.state.player.seekTo(event, true);
    this.state.player.playVideo();
  }
  onTick() {
    if(this.state.player.getPlayerState() == 1) {
      this.ScriptList.current.onFocus(this.state.player.getCurrentTime());
    }
    else 
    {
      clearInterval(this.timer);
    }
  }
  render() {
    return (
      <div>
        <div id='player'></div>
        <SubtitleList ref={this.ScriptList} onEvent={this.onEventScript} list={this.state.list}></SubtitleList>
      </div>
    );
  }
}
export default ContentView