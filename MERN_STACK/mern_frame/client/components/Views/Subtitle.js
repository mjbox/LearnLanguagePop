import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import axios from 'axios';
var querystring = require('querystring');

class SubTitle extends Component {
    constructor(props) {
        super(props);
        this.focus = this.focus.bind(this);
        this.makeList = this.makeList.bind(this);
        this.onClickOpen = this.onClickOpen.bind(this);
        this.onClickScript = this.onClickScript.bind(this);
        this.state = {
            list: this.props.list,
            index: 0,
            onEvent : this.props.onEvent,
            time : this.props.time,
            style: "item"
        }
    }
    focus(onOff) {
        if(onOff) {
            this.setState({
                style: "item active"
            })
        }
        else {
            this.setState({
                style: "item"
            })
        }
        return this.props.time;
    }
    makeList() {
        var listItems = null;
        var _this = this;
        if(this.props.list !== null) {
            var i = 0;
            listItems = this.props.list.map(function(text){
                var txt = i < _this.state.index ? text : "...";
                i = i + 1;
                return (
                    <span>
                        {txt + " "}
                    </span>
                );
            });
        }
        return listItems;
    }
    componentDidMount() {
    }
    onClickOpen(e) {
        var index = this.state.index + 1;
        this.makeList();
        this.setState({index: index});
    }
    onClickScript(e) {
        var onEvent = this.state.onEvent;
        if(onEvent !== null) {
            onEvent(this.props.time);
        }
    }
    render() {
        return (
            <li className={this.state.style} dt={this.state.index}>
                <a className={this.state.style} onClick={this.onClickScript}>
                    {this.props.time + " "}
                    {this.makeList()}
                </a>
                <button onClick={this.onClickOpen}>click</button>
            </li>
        );
    }
}
export default SubTitle