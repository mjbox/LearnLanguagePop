import React, { Component } from 'react';
import SubTitle from './SubTitle'

class SubtitleList extends Component {
    constructor(props) {
        super(props);
        this.makeList = this.makeList.bind(this);
        this.state = {
            onEvent : this.props.onEvent,
            ref: new Object(),
            index: -1
        }
        this.eventListener = this.eventListener.bind(this);
        this.onFocus = this.onFocus.bind(this);
    }
    eventListener(time) {
        this.onFocus(time);
        var onEvent = this.state.onEvent;
        if(onEvent !== null) {
            onEvent(time);
        }
    }
    makeList() {
        var listItems = null; 
        if(this.props.list !== null) {
            var t = this.props.list.map((script) => {
                    this.state.ref[script.time] = React.createRef();
                    console.log(script.time);
                }
            );

            listItems = this.props.list.map((script) =>
                    <SubTitle ref={this.state.ref[script.time]} onEvent={this.eventListener} time={script.time} list={script.text}/>
            );
        }
        return listItems;
    }
    componentDidMount() {
        this.state.index = -1;
    }
    onFocus(time) {
        var find = 0;
        for (var key in this.state.ref) {
            if(key <= time) {
                find = key;
            } else break;
        }
        if(this.state.index != find) {
            if(this.state.index >= 0)
                this.state.ref[this.state.index].current.focus(false);
            this.state.ref[find].current.focus(true);
            this.state.index = find;
        }
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

export default SubtitleList;