import React, { Component } from 'react';

class ControlMenu extends Component {
    constructor(props) {
        super(props);
        this.onclick = this.onclick.bind(this);

        this.state = {
            check: "Check All",
            show: "Show All",
            language: "English",
            speed: 1.0,
            repeat: "None"
        }
    }
    componentDidMount() {    
    }
    onclick(e) {
        const cmd = e.target.getAttribute("cmd");
        var result = {state:{}, param:{}};
        switch(cmd) {
            case "check":
                result.param = this.state.check == "Check All"?
                {cmd:cmd, param1:"Uncheck All", param2:true}:
                {cmd:cmd, param1:"Check All", param2:false};
                result.state = {check:result.param.param1};
            break;
            case "show":
                result.param = this.state.show == "Show All"?
                {cmd:cmd, param1:"Hide All", param2:true}:
                {cmd:cmd, param1:"Show All", param2:false};
                result.state = {show:result.param.param1};
            break;
            case "language":
                result.param = this.state.language == "English"?
                {cmd:cmd, param1:"Korean", param2:"Korean"}:
                {cmd:cmd, param1:"English", param2:"English"};
                result.state = {language:result.param.param1};
            break;
            case "speed":
                var speed = this.state.speed >= 2 ? 0.5 : this.state.speed + 0.5;
                result.param = {cmd:cmd, param1:speed, param2:speed};
                result.state = {speed:result.param.param1};
            break;
            case "repeat":
                switch(this.state.repeat) {
                    case "None":result.param = {cmd:cmd, param1: "Checked", param2: 1}; break;
                    case "Checked":result.param = {cmd:cmd, param1: "All", param2: 2}; break;
                    default:result.param = {cmd:cmd, param1: "None", param2: 0}; break;
                }
                result.state = {repeat:result.param.param1};
            break;
        }
        this.props.cb(result.param);
        this.setState(result.state);
    }
    render() {
        return (
            <div>
                <hr/>
                <button cmd="check"     onClick={this.onclick}>{this.state.check}</button>
                <button cmd="show"      onClick={this.onclick}>{this.state.show}</button>
                <button cmd="language"  onClick={this.onclick}>{this.state.language}</button>
                <button cmd="speed"     onClick={this.onclick}>{this.state.speed+" Fast"}</button>
                <button cmd="repeat"    onClick={this.onclick}>{this.state.repeat+" Repeat"}</button>
            </div>
        );
    }
}

export default ControlMenu;