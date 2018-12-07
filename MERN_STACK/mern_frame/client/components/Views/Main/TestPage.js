import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import queryString from 'query-string';

class TestPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            playing: false,
            id: this.props.match.params.name,
            type: this.props.match.params
        }
        this.onclick = this.onclick.bind(this);
        this.onclick2 = this.onclick2.bind(this);
    }
    componentWillMount() {
    }
    componentDidMount() {
        const query = queryString.parse(this.props.location.search);
        console.log("componentDidMount " + query.filter);
    }
    onclick() {
        this.setState({playing:true});
    }
    onclick2() {
        this.setState({playing:false});
    }
    render() {
        const { playing, id } = this.state;
        return (
            <div className="player-wrap"> 
                <ReactPlayer 
                    url={'Contents/videos/' + id}
                    playing={playing}
                    />
                    <button onClick={this.onclick}>play</button>
                    <button onClick={this.onclick2}>pause</button>
            </div>
        );
    }
}

export default TestPage;