import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import axios from 'axios';

var querystring = require('querystring');

class Script extends Component {
    constructor(props) {
        super(props);
        this.makeList = this.makeList.bind(this);
        this.onclick = this.onclick.bind(this);
        this.state = {
            list: this.props.list,
            index: 0,
        }
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
    onclick(e) {
        var index = this.state.index + 1;
        this.makeList();
        this.setState({index: index});
    }
    onclick2(e) {
        
    }
    render() {
        return (
            <div dt={this.state.index}>
                <a onClick={this.onclick2}>
                    {this.props.time + " "}
                    {this.makeList()}
                </a>
                <button onClick={this.onclick}>click</button>
            </div>
        );
    }
}
export default Script