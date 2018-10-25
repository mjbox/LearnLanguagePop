import React, { Component } from 'react';

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: props.items, text: '' };
        this.handleRemove = this.handleRemove.bind(this);
    }
    handleRemove = (id) => {
        this.props.onRemoved(id);
    }
    render() {
        return (
        <ul>
            {this.props.items.map(item => (
                <TodoItem 
                    id={item.id} 
                    text={item.text} 
                    key={item.id}
                    onRemoved={this.handleRemove}>
                </TodoItem>
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
        this.onRemoveClick = this.onRemoveClick.bind(this);
    }
    
    onChange(e) {
        this.setState({text: e.target.value});
    }
    onRemoveClick(e) {
        e.preventDefault();
        this.props.onRemoved(this.state.id);
        //var li = e.target.parentElement;
        //li.parentNode.removeChild(li);
    }
    render() {
        const remove_text = 'xx';
        return (
            <li id={this.state.id}>
                <input 
                    onChange={this.onChange}
                    value={this.state.text}>
                </input>
                <button onClick={this.onRemoveClick}>{remove_text}</button>
            </li>
        );
    };
}
export default TodoList;