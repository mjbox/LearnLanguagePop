import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import axios from 'axios';
var querystring = require('querystring');

class SubTitle extends Component {
    constructor(props) {
        super(props);
        this.focus = this.focus.bind(this);
        this.makeList = this.makeList.bind(this);
        this.openScript = this.openScript.bind(this);
        this.onClickOpen = this.onClickOpen.bind(this);
        this.onClickScript = this.onClickScript.bind(this);
        this.setCheckbox = this.setCheckbox.bind(this);
        this.getCheckbox = this.getCheckbox.bind(this);
        this.setShowAll = this.setShowAll.bind(this);
        this.onClickCheckbox = this.onClickCheckbox.bind(this);
        this.state = {
            list: this.props.list,
            index: 0,
            onEvent : this.props.onEvent,
            time : this.props.time,
            style: "item",
            checked: false
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
                    <span key={i}>
                        {txt + " "}
                    </span>
                );
            });
        }
        return listItems;
    }
    componentDidMount() {
    }
    openScript(index) {
        this.makeList();
        this.setState({index: index});
    }
    onClickOpen(e) {
        this.openScript(this.state.index + 1);
    }
    onClickScript(e) {
        const onEvent = this.state.onEvent;
        if(onEvent !== null) {
            onEvent(this.props.time);
        }
    }
    setCheckbox(value) {
        this.setState(
            {checked:value}
        );
    }
    getCheckbox() {
        return this.state.checked;
    }
    setShowAll(value) {
        const index = value ? this.state.list.length : 0;
        this.openScript(index);
    }
    onClickCheckbox(e) {
        this.setCheckbox(!this.state.checked);
    }
    render() {
        return (
            <li className={this.state.style} index={this.state.index}  align="left" >
                {/* <span className="time">{this.props.time + "  "}</span> */}
                <span className="checkbox-cell">
                    <input type="checkbox" onChange={this.onClickCheckbox} checked={this.state.checked} />
                </span>
                <a className="text-cell" onClick={this.onClickScript}>
                    {this.makeList()}
                </a>
                <div className="btn-cell">
                    <button className="btn_show" onClick={this.onClickOpen}>show</button>
                </div>
            </li>
        );
    }
}
export default SubTitle