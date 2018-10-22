import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Menu from './Pages/Menu';
import Home from './Pages/Home';
import About from './Pages/About';
import YoutubeC from './Pages/YoutubeC';

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
        <Route exact path="/Youtube/:name" component={YoutubeC}/>
      </div>
    );
  }
}
export default AppContainer