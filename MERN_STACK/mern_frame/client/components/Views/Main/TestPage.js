import React, { Component } from 'react';
import queryString from 'query-string';

class TestPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text:"test"
        }
    }
    componentWillMount() {
        const query = queryString.parse(this.props.location.search);
        console.log("componentWillMount " + query.type);
        this.setState({
            text:this.props.match.params.name + " : " + query.type
        })
    }
    componentDidMount() {
    }

    render() {
        return (
            <div className="container-wrap">
                {this.state.text}
            </div>
        );
    }
}

export default TestPage;