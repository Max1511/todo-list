import React, {Component} from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter"
import ToDoList from "../todo-list";

import "./app.css";
import ItemAddForm from "../item-add-form";

export default class App extends Component {

  maxId = 1;

  createTodoItem = (label) => {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++,
    }
  }

  state = {
    todoData: [
      this.createTodoItem("Drink Coffee"),
      this.createTodoItem("Make React App"),
      this.createTodoItem("Have a lunch"),
    ],
    filteringProperty: undefined,
    filteringTarget: false
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({todoData}) => {
      const newArray = [
        ...todoData,
        newItem,
      ];

      return {
        todoData: newArray,
      }
    });
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

  toggleProperty = (array, id, propertyName) => {
    const index = array.findIndex((element) => element.id === id);
    const oldItem = array[index];
    const newItem = {...oldItem, [propertyName]: !oldItem[propertyName]};

    return [
      ...array.slice(0, index),
      newItem,
      ...array.slice(index + 1),
    ];
  }

  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important'),
      }
    });
  }

  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done'),
      }
    });
  }

  onSetFilter = (filteringProperty, filteringTarget) => {
    this.setState(() => {
      return {
        filteringProperty,
        filteringTarget,
      }
    });
  }

  render() {
    const {todoData} = this.state;
    const doneCount = todoData.filter((item) => item.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter
            onSetFilter={this.onSetFilter}
            onDisplayAll={this.displayAll}/>
        </div>
        
        <ToDoList
          todos={this.state.todoData}
          filteringProperty={this.state.filteringProperty}
          filteringTarget={this.state.filteringTarget}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}/>
        
        <ItemAddForm onItemAdded={this.addItem}/>
      </div>
    );
  }
}