//client/components/App.js
import React, { Component } from 'react';
import '../css/App.css';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';
import YoutubeC from './YoutubeC';

var querystring = require('querystring');

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'new book',
      author: 'mjbox',
      messageFromServer: '',
      modalIsOpen: false
    }
    this.onClick = this.onClick.bind(this);
    this.onClick2 = this.onClick2.bind(this);
  }
  onClick(e) {
    this.insertNewExpense(this);
  }
  insertNewExpense(e) {
    axios.post('/insert',
      querystring.stringify({
        name: this.state.name,
        author: this.state.amount
      }), {
        headers: { 
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(function(response) {
      e.setState({
        messageFromServer: response.data
      });
      console.log(response.data);
    });
  }
  onClick2(e) {
    var _this = this;
    axios.post('/read',
      querystring.stringify({
        name: this.state.name,
        author: this.state.amount
      }), {
        headers: { 
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(function(response) {
      _this.setState({
        messageFromServer: response.data
      });
      console.log(response.data);
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <YoutubeC />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.onClick}>Add</button>
        <button onClick={this.onClick2}>Read</button>
      </div>
    );
  }
}
export default App