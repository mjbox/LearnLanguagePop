import React, { Component } from 'react';

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: [], text: '' };
    }
    render() {
        return (
        <ul>
            {this.props.items.map(item => (
                <TodoItem id={item.id} text={item.text} key={item.id}></TodoItem>
            ))}
        </ul>
        );
    }
}

class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { id: props.id, text: props.text };
        this.onChange = this.onChange.bind(this);
    }
    
    onChange(e) {
        this.setState({text: e.target.value});
    }
    onRemoveClick(e) {
        e.preventDefault();
        var li = e.target.parentElement;
        li.parentNode.removeChild(li);
    }
    render() {
        return (
            <li id={this.state.id}>
                <input 
                    onChange={this.onChange}
                    value={this.state.text}>
                </input>
                <button onClick={this.onRemoveClick}>x</button>
            </li>
        );
    };
}
export default TodoList;