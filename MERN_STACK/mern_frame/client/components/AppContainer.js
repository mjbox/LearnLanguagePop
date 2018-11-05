import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Menu from './Views/Global/Menu';
import HomePage from './Views/Main/HomePage';
import About from './Views/Main/AboutPage';
import CreatePage from './Views/Main/CreatePage';
import PlayPage from './Views/Main/PlayPage';

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
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/about" component={About}/>
        <Route exact path="/create" component={CreatePage}/>
        <Route exact path="/play/:name" component={PlayPage}/>
      </div>
    );
  }
}
export default AppContainer