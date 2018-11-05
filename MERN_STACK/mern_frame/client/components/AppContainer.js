import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Menu from './Views/Menu/Menu';
import Home from './Views/Main/Home';
import About from './Views/Main/About';
import CreateView from './Views/Main/CreateView';
import ContentView from './Views/Main/ContentView';

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div>
        <Menu />
        <Route exact path="/" component={Home}/>
        <Route exact path="/about" component={About}/>
        <Route exact path="/CreateView" component={CreateView}/>
        <Route exact path="/Youtube/:name" component={ContentView}/>
      </div>
    );
  }
}
export default AppContainer