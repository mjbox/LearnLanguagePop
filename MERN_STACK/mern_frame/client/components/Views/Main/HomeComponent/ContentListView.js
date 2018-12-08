import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ContentListView extends Component {
    constructor(props) {
        super(props);
        this.makeList = this.makeList.bind(this);
    }
    componentDidMount() {
        
    }
    makeList() {
        const listItems = this.props.list !== null ? this.props.list.map((link) =>
            <li key={link.id} align="left" >
                <Link to={"/play/"+link.id+"?type="+link.type+"&origin=im"} >
                    <img src={"http://img.youtube.com/vi/"+link.id+"/default.jpg"}/> 
                    {link.name}
                </Link>
            </li>
        ) : null;
        return listItems;
    }
    render() {
        return (
            <div className="content-wrap">
                <ul className="list-group text-center">
                    {this.makeList()}
                </ul>
           </div>
        );
    }
}

export default ContentListView;