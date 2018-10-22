import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
    }
    render() {
        return (
            <div>
                <ul id='HomeListTable'>
                    <li><Link to="/Youtube/test1" >Youtube 1</Link></li>
                    <li><Link to="/Youtube/test2" >Youtube 2</Link></li>
                </ul>
            </div>
        );
    }
}
export default Home;