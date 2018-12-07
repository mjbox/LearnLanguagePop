import React, { Component } from 'react';
//import '../css/App.css';
import { BrowserRouter, HashRouter, Route, Switch} from 'react-router-dom';
import AppContainer from './AppContainer';

class App extends Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <HashRouter>
                <AppContainer/>
            </HashRouter>
        )
    }
}
export default App
