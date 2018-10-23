import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import axios from 'axios';

var querystring = require('querystring');

class Script extends Component {
  constructor(props) {
    super(props);
    this.makeList = this.makeList.bind(this);
  }
  makeList() {
    const listItems = this.props.list !== null ? this.props.list.map((text) =>
        <a>{text + " "}</a>
    ) : null;
    return listItems;
}
  componentDidMount() {
    
  }
  render() {
    return (
        <div>
            {this.props.time + " "}
            {this.makeList()}
        </div>
    );
  }
}
export default Script