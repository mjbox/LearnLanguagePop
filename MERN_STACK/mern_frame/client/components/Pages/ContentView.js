import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import ScriptList from './ScriptList';

var querystring = require('querystring');

class ContentView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player : null,
      list : null
    };
    window.onYouTubeIframeAPIReady = this.onLoadedYTScript.bind(this);
    window.onPlayerReady = this.onPlayerReady.bind(this);
    window.onPlayerStateChange = this.onPlayerStateChange.bind(this);
  }
  
  onLoadedYTScript() {
    var id = this.props.match.params.name;
    var player = new window.YT.Player('player', {
      height: '360',
      width: '640',
      videoId: id,
      events: {
          'onReady': window.onPlayerReady,
          'onStateChange': window.onPlayerStateChange
      },
      playerVars: { 
        'controls': 0,
      }
    });
    this.getScript(id);
    this.setState({
      player: player
    });
    console.log("onLoadedYTScript ");
  }
  getScript(id) {
    var _this = this;
    axios.post('/getdb',
        querystring.stringify({
            cmd: "getScript",
            param: id
        }), {
            headers: { 
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function(response) {
            var txt = response.data;
            console.log(txt);
            _this.setState({
              list: txt.script
            });
        });
}
  onPlayerReady(event) {
  }
  onPlayerStateChange(event) {
    console.log(event);
  }
  componentWillMount() {
    console.log('componentWillMount is called');
  }
  componentDidMount() {
    if(document.getElementById('YoutubeScript') !== null) {
      this.onLoadedYTScript();
    } else {
      var script = document.createElement('script');
      script.id = "YoutubeScript";
      script.src = 'http://www.youtube.com/player_api';
      document.body.appendChild(script);
    }

    if(this.props.match.params.name === undefined) {
      const values = queryString.parse(this.props.location.search)
      console.log(values.filter) // "top"
      console.log(values.origin) // "im"
    }
    console.log('componentDidMount ' + this.props.match.params.name);
  }
  render() {
    return (
      <div>
        <div id='player'></div>
        <ScriptList list={this.state.list}></ScriptList>
      </div>
    );
  }
}
export default ContentView