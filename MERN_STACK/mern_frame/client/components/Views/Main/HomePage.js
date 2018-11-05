import React, { Component } from 'react';
import axios from 'axios';
import ContentListView from './HomeComponent/ContentListView';
import dbManager from '../../Controls/dbManager';

var querystring = require('querystring');

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list : null
        }
        this.dbListener = this.dbListener.bind(this);
    }
    dbListener(req, res) {
        if(res !== null && res.length > 0) {
            this.setState({
                list: res
            });
        }
    }
    componentDidMount() {
        dbManager.getdb("getContentsHeader", "", this.dbListener);
    }
    render() {
        return (
            <div>
                <div id='HomeListTable'>
                    <ContentListView list={this.state.list}></ContentListView>
                </div>
            </div>
        );
    }
}
export default HomePage;