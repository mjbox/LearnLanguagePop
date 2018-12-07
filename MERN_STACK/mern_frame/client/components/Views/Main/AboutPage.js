import React, { Component } from 'react';
import queryString from 'query-string';

class AboutPage extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const query = queryString.parse(this.props.location.search);
        console.log(query.filter);
    }
    render() {
        return (
            <div>
                <h2>About </h2>
            </div>
        );
    }
}

export default AboutPage;