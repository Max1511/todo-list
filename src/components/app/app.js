import React, {Component} from "react";

import AppHeader from "../app-header";
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter'
import ToDoList from '../todo-list';

import './app.css';
import ItemAddForm from "../item-add-form";

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      {label: "Drink Coffee", important: false, id: 1},
      {label: "Make React App", important: true, id: 2},
      {label: "Have a lunch", important: false, id: 3}
    ],
  };

  addItem = (text) => {
    const newItem = {
      label: text,
      important: false,
      id: this.maxId++,
    }

    this.setState(({todoData}) => {
      const newArray = [
        ...todoData,
        newItem,
      ];

      return {
        todoData: newArray,
      }
    })
  }

  deleteItem = (id) => {
    this.setState(({todoData}) => {
      const index = todoData.findIndex((element) => element.id === id);
      const newArray = [
        ...todoData.slice(0, index),
        ...todoData.slice(index + 1),
      ];

      return {
        todoData: newArray,
      }
    });
  }

  render() {
    return (
      <div className="todo-app">
        <AppHeader toDo={1} done={3} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
        
        <ToDoList
          todos={this.state.todoData}
          onDeleted={this.deleteItem}/>
        
        <ItemAddForm onItemAdded={this.addItem}/>
      </div>
    );
  }
}