import React from "react";

import AppHeader from "../app-header";
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter'
import ToDoList from '../todo-list';

import './app.css';

const App = () => {
    const toDoData = [
      {label: "Drink Coffee", important: false, id: 1},
      {label: "Make React App", important: true, id: 2},
      {label: "Have a lunch", important: false, id: 3}
    ]

    return (
    <div className="todo-app">
      <AppHeader toDo={1} done={3} />
      <div className="top-panel d-flex">
        <SearchPanel />
        <ItemStatusFilter />
      </div>
      
      <ToDoList todos={toDoData}/>
    </div>
  );
}

export default App;