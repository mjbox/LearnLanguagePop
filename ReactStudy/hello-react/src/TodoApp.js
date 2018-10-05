import React, { Component } from 'react';
import TodoList from './TodoList'

class TodoApp extends React.Component {
    constructor(props) {
      super(props);
      this.state = { items: [], text: '' };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleRemove = this.handleRemove.bind(this);
    }
    
    handleChange(e) {
      this.setState({ text: e.target.value });
    }
    handleSubmit(e) {
      e.preventDefault();
      if (!this.state.text.length) {
        return;
      }
      const newItem = {
        text: this.state.text,
        id: Date.now()
      };
      this.setState(state => ({
        items: state.items.concat(newItem),
        text: ''
      }));
    }
    handleRemove(id) {
      const {items, text} = this.state;
      this.setState({items : items.filter(item => item.id !== id)} )
      console.log(id + " : removed " + items.length);      
    }
    
    render() {
      return (
        <div>
          <h3>TODO</h3>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="new-todo">
              What needs to be done?
            </label><br></br>
            <input
              id="new-todo"
              onChange={this.handleChange}
              value={this.state.text}
            />
            <button>
              Add #{this.state.items.length + 1}
            </button>
          </form>
          <TodoList 
            items={this.state.items} 
            onRemoved={this.handleRemove}
          />
        </div>
      );
    }
}


export default TodoApp;