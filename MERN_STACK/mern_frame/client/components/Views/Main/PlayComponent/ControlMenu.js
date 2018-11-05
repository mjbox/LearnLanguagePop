import React, { Component } from 'react';

class ControlMenu extends Component {
    constructor(props) {
        super(props);
        this.onclick = this.onclick.bind(this);
        this.speed = [0.7, 1.0, 1.5, 2.0];
        this.speedIndex = 1;
        this.state = {
            check: "Check All",
            show: "Show All",
            language: "English",
            rate: 1.0,
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
                this.speedIndex = (this.speedIndex+1) % this.speed.length;
                var rate = this.speed[this.speedIndex];
                result.param = {cmd:cmd, param1:rate, param2:rate};
                result.state = {rate:rate};
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
                <button cmd="speed"     onClick={this.onclick}>{this.state.rate+" Fast"}</button>
                <button cmd="repeat"    onClick={this.onclick}>{this.state.repeat+" Repeat"}</button>
            </div>
        );
    }
}

export default ControlMenu;