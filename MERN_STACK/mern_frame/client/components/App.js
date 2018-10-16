//client/components/App.js
import React, { Component } from 'react';
import '../css/App.css';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';
var querystring = require('querystring');

class App extends Component {
  constructor() {
    super();
    this.state = {
      description: '',
      amount: '',
      month: '',
      year: '',
      messageFromServer: '',
      modalIsOpen: false
    }
    this.onClick = this.onClick.bind(this);
  }
  onClick(e) {
    this.insertNewExpense(this);
  }
  insertNewExpense(e) {
    axios.post('/insert',
      querystring.stringify({
        desc: "aaa",
        amount: e.state.amount,
        month: e.state.month,
        year: e.state.year
      }), {
        headers: { 
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(function(response) {
      e.setState({
        messageFromServer: response.data
      });
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.onClick}>Add</button>
      </div>
    );
  }
}
export default App