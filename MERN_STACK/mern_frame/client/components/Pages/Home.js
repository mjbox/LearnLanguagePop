import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ContentList from './ContentList';

var querystring = require('querystring');

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list : null,
            contentList : ContentList,
        }
    }

    run() {
        var _this = this;
        axios.post('/getdb',
            querystring.stringify({
                cmd: "getContentsHeader",
                param: ""
            }), {
                headers: { 
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(function(response) {
                var arr = response.data;
                if(arr !== null && arr.length > 0) {
                    console.log("true " + arr.length);
                    _this.setState({
                        list: arr
                    });
                }
            });
    }
    componentWillMount() {
        this.run();
    }
    componentDidMount() {

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