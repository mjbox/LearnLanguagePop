import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import queryString from 'query-string';
import ControlMenu from './PlayComponent/ControlMenu';
import SubtitleListView from './PlayComponent/SubtitleListView';
import dbManager from '../../Controls/dbManager';

class PlayPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            player: null,
            playing: false,
            id: null,
            type: this.props.match.params,
            url: null,
            list:null,
            list_eng : null,
            list_kor: null,
            repeat: 0,
            rate: 1,
            loop: false
        }
        this.ScriptList = React.createRef();
        this.onPlay = this.onPlay.bind(this);
        this.onPause = this.onPause.bind(this);
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
        this.ref = this.ref.bind(this);
        this.onTick = this.onTick.bind(this);
        this.dbListener = this.dbListener.bind(this);
        this.onEventScript = this.onEventScript.bind(this);
        this.onEventControl = this.onEventControl.bind(this);
    
    }
    componentWillMount() {
        const query = queryString.parse(this.props.location.search);
        console.log("componentWillMount " + query.type);
        this.state.id = this.props.match.params.name;
        switch(query.type) {
            case 'youtube':
            this.state.url = 'https://www.youtube.com/watch?v='+this.state.id;
            break;
            case 'local':
            this.state.url = 'Contents/videos/'+this.state.id;
            break;
        }
        dbManager.getdb("getScript", this.state.id, this.dbListener);
    }
    componentDidMount() {
        
    }
    dbListener(req, res) {
        //console.log(res.script);
        this.setState({
            id:this.state.id,
            url:this.state.url,
            list: res.script,
            list_eng: res.script,
            list_kor: res.script_kor
        });
    }
    onPlay() {
        this.setState({playing:true});
    }
    onPause() {
        this.setState({playing:false});
    }
    onPlayerStateChange(event) {
        switch(event.data) {
          case -1:  // not yet started
            break;
          case 1: // playing
            break;
          case 2: // paused
            break;
          case 3: // bufferd
            break;
          case 4:
            this.onTick(this.player.getCurrentTime());
            break;
        }
    }
    onTick(time) {
        var result = this.ScriptList.current.getFocus(time);
        if(this.state.repeat == 1 && result.change && !result.checked) // repeat checked
        {
        var next = this.ScriptList.current.getNext(time);
        if(next < 0) next = this.ScriptList.current.getNext(0);
        if(next >= 0) {
            this.player.seekTo(next);
            this.setState({playing:true});
        }
        } else {
            this.ScriptList.current.onFocus(result.find);
        }
    }
    ref(player) {
        this.player = player
    }
    onEventScript(event) {
        console.log(event);
        this.player.seekTo(event);
        this.setState({playing:true});
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
            this.setState({rate: e.param2});
            break;
          case "repeat":
            this.state.repeat = e.param2;
            switch(e.param2) {
              case 0: // none
                this.setState({loop: false});
                break;
              case 1: // checked
                this.setState({loop: true});
                break;
              case 2: // all
                this.setState({loop: true});
                break;
            }
            break;
        }
      }
    render() {
        const { playing, id , url, rate, loop} = this.state;
        return (
            <div className="container-wrap">
                <div className="player-wrap"> 
                    <div className="player-content"> 
                        <ReactPlayer 
                            id="player"
                            ref={this.ref}
                            url={url}
                            playing={playing}
                            onProgress={() => {this.onPlayerStateChange({'data':4})}}
                            onReady={() => {this.onPlayerStateChange({'data':-1})}}
                            onPlay={() => {this.onPlayerStateChange({'data':1})}}
                            onPause={() => {this.onPlayerStateChange({'data':2})}}
                            progressInterval={100}
                            playbackRate={rate}
                            loop={loop}
                        />
                        <button onClick={this.onPlay}>play</button>
                        <button onClick={this.onPause}>pause</button>
                    </div>
                </div>
                <SubtitleListView ref={this.ScriptList} onEvent={this.onEventScript} list={this.state.list}/>
                <ControlMenu cb={this.onEventControl}/>
            </div>
        );
    }
}

export default PlayPage;