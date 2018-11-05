import React, { Component } from 'react';
import axios from 'axios';
import ContentList from './ContentList';
import dbManager from '../../Controls/dbManager';

var querystring = require('querystring');

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list : null,
            contentList : ContentList,
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
                    <ContentList list={this.state.list}></ContentList>
                </div>
            </div>
        );
    }
}
export default Home;