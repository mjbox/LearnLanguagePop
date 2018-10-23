import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Script from './Script'

class ScriptList extends Component {
    constructor(props) {
        super(props);
        this.makeList = this.makeList.bind(this);
    }
    makeList() {
        const listItems = this.props.list !== null ? this.props.list.map((script) =>
            <li>
                <Script time={script.time} list={script.text}/>
            </li>
        ) : null;
        return listItems;
    }
    render() {
        return (
            <div className="container">
                <ul className="list-group text-center">
                    {this.makeList()}
                </ul>
           </div>
        );
    }
}

export default ScriptList;