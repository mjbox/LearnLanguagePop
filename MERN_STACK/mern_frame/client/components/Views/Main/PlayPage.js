import React, { Component } from 'react';
import SubtitleListView from './PlayComponent/SubtitleListView';
import dbManager from '../../Controls/dbManager';
import VideoManager from '../../Controls/VideoManager';
import ControlMenu from './PlayComponent/ControlMenu';

var querystring = require('querystring');

class PlayPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player : null,
      list : null,
      list_eng : null,
      list_kor: null
    };
    this.ScriptList = React.createRef();
    this.onTick = this.onTick.bind(this);
    this.onLoadedYTScript = this.onLoadedYTScript.bind(this);
    this.dbListener = this.dbListener.bind(this);
    this.onPlayerReady = this.onPlayerReady.bind(this);
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    this.onEventScript = this.onEventScript.bind(this);
    this.onEventControl = this.onEventControl.bind(this);
  }
  
  onLoadedYTScript() {
    var id = this.props.match.params.name;
    this.state.player = VideoManager.create(id, 'player', this.onPlayerReady, this.onPlayerStateChange);
    dbManager.getdb("getScript", id, this.dbListener);
  }
  dbListener(req, res) {
    if(res !== null) {
      this.setState({
        list: res.script,
        list_eng: res.script,
        list_kor: res.script_kor
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
        clearInterval(this.timer);
        this.timer = setInterval(this.onTick, 100);
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
  
  onEventControl(e) {
    console.log(e.cmd + " : " + e.param2);
    switch(e.cmd) {
      case "check":this.ScriptList.current.onCheckAll(e.param2);break;
      case "show":this.ScriptList.current.onShowAll(e.param2);break;
      case "language":
        if(e.param2 == "English")
          this.setState({list: this.state.list_eng});
        else 
          this.setState({list: this.state.list_kor});
        break;
      case "speed":
        this.state.player.setPlaybackRate(e.param2);
        break;
    }
  }

  render() {
    return (
      <div>
        <div id='player'></div>
        <SubtitleListView ref={this.ScriptList} onEvent={this.onEventScript} list={this.state.list}/>
        <ControlMenu cb={this.onEventControl}/>
      </div>
    );
  }
}
export default PlayPage