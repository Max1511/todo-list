import React, {Component} from 'react';

import AppHeader from '../app-header';
import ToDoList from '../todo-list';
import ItemController from '../item-controller';

import './app.css';

export default class App extends Component {

    maxId = 1;

    createTodoItem = (label, min = 0, sec = 0) => {
        return {
            id: this.maxId++,
            label,
            date: new Date(),
            timer: new Date(min * 60000 + sec * 1000),
            done: false,
        };
    };

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee', 5),
            this.createTodoItem('Make React App', 30, 30),
            this.createTodoItem('Have a lunch', 30),
        ],
        filteringProperty: undefined,
        filteringTarget: false
    };

    addItem = (text, min, sec) => {
        const newItem = this.createTodoItem(text, min, sec);

        this.setState(({todoData}) => {
            const newArray = [
                ...todoData,
                newItem,
            ];

            return {
                todoData: newArray,
            };
        });
    };

    changeItemLabel = (id, label) => {
        this.setState(({todoData}) => {
            const index = todoData.findIndex((element) => element.id === id);

            const newArray = todoData;
            newArray[index].label = label;

            return {
                todoData: newArray,
            };
        });
    };

    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const index = todoData.findIndex((element) => element.id === id);
            const newArray = [
                ...todoData.slice(0, index),
                ...todoData.slice(index + 1),
            ];

            return {
                todoData: newArray,
            };
        });
    };

    deleteByFilter = (filteringProperty, filteringTarget) => {
        this.setState(({todoData}) => {
            const newArray = todoData.filter((element) => element[filteringProperty] !== filteringTarget);

            return {
                todoData: newArray,
            };
        });
    };

    toggleProperty = (array, id, propertyName) => {
        const index = array.findIndex((element) => element.id === id);
        const oldItem = array[index];
        const newItem = {...oldItem, [propertyName]: !oldItem[propertyName]};

        return [
            ...array.slice(0, index),
            newItem,
            ...array.slice(index + 1),
        ];
    };

    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done'),
            };
        });
    };

    onSetFilter = (filteringProperty, filteringTarget) => {
        this.setState(() => {
            return {
                filteringProperty,
                filteringTarget,
            };
        });
    };

    onSetSearchString = (searchString) => {
        this.setState(() => {
            return {
                searchString
            };
        });
    };

    getFilteringTodoData = () => {
        const {todoData, filteringProperty, filteringTarget} = this.state;

        return todoData.filter((item) => {
            if (typeof filteringProperty === 'undefined' || item[filteringProperty] === filteringTarget) {
                return true;
            }
            return false;
        });
    };

    render() {
        const {todoData} = this.state;
        const doneCount = todoData.filter((item) => item.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <section className="todo-app">
                <AppHeader onItemAdded={this.addItem}/>
                <section className="main">
                    <ToDoList
                        todos={this.getFilteringTodoData()}
                        onChangeLabel={this.changeItemLabel}
                        onDeleted={this.deleteItem}
                        onToggleDone={this.onToggleDone}/>
                </section>
        
                <ItemController
                    toDo={todoCount}
                    onSetFilter={this.onSetFilter}
                    deleteByFilter={this.deleteByFilter}/>
            </section>
        );
    }
}