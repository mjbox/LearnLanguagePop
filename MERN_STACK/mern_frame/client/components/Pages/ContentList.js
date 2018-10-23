import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ContentList extends Component {
    constructor(props) {
        super(props);
        this.makeList = this.makeList.bind(this);
    }
    componentDidMount() {
        
    }
    makeList() {
        const listItems = this.props.list !== null ? this.props.list.map((link) =>
            <li>
                <Link to={"/Youtube/"+link.id} >
                    <img src={"http://img.youtube.com/vi/"+link.id+"/default.jpg"}/>
                    Youtube 
                    {link.name}
                </Link>
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

export default ContentList;