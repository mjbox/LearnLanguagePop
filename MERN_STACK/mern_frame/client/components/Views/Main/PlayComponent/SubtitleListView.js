import React, { Component } from 'react';
import SubTitle from './SubTitle'

class SubtitleListView extends Component {
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
        this.getFocus = this.getFocus.bind(this);
        this.onCheckAll = this.onCheckAll.bind(this);
        this.getNext = this.getNext.bind(this);
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
                    <SubTitle key={script.time} ref={this.state.ref[script.time]} onEvent={this.eventListener} time={script.time} list={script.text}/>
            );
        }
        return listItems;
    }
    componentDidMount() {
        this.state.index = -1;
    }
    getFocus(time) {
        var result = {change:false, checked:false, find:-1};
        for (var key in this.state.ref) {
            if(key <= time) {
                result.find = key;
            } else {
                break;
            }
        }
        if(this.state.index != find && result.find != -1) {
            result.change = true;
            result.checked = this.state.ref[result.find].current.getCheckbox();
        }
        return result;
    }
    onFocus(find) {
        if(this.state.index != find && find != -1) {
            if(this.state.index >= 0)
                this.state.ref[this.state.index].current.focus(false);
            this.state.ref[find].current.focus(true);
            this.state.index = find;
        }
    }
    getNext(time) {
        for (var key in this.state.ref) {
            if(key > time) {
                if(this.state.ref[key].current.getCheckbox()) {
                    console.log(key + " : " + time);
                    return key;
                }
            }
        }
        return -1;
    }
    onCheckAll(isShow) {
        var _this = this;
        Object.keys(_this.state.ref).map(function(objectKey, index) {
            var value = _this.state.ref[objectKey];
            value.current.setCheckbox(isShow);
        });
    }
    onShowAll(isShow) {
        var _this = this;
        Object.keys(_this.state.ref).map(function(objectKey, index) {
            var value = _this.state.ref[objectKey];
            value.current.setShowAll(isShow);
        });
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

export default SubtitleListView;