import React, {useState, useRef} from 'react';

import AppHeader from '../app-header';
import ToDoList from '../todo-list';
import ItemController from '../item-controller';

import './app.css';

const App = () => {

    const maxIdRef = useRef(0);

    const createTodoItem = (label, min = 0, sec = 0) => {
        maxIdRef.current++;
        return {
            id: maxIdRef.current,
            label,
            date: new Date(),
            time: new Date(min * 60000 + sec * 1000),
            done: false,
        };
    };

    const [todoData, setTodoData] = useState([
        createTodoItem('Drink Coffee', 5),
        createTodoItem('Make React App', 30, 30),
        createTodoItem('Have a lunch', 30),
    ]);
    const [filteringProperty, setFilteringProperty] = useState(undefined);
    const [filteringTarget, setFilteringTarget] = useState(false);

    const addItem = (text, min, sec) => {
        const newItem = createTodoItem(text, min, sec);

        setTodoData((todoData) => {
            const newArray = [
                ...todoData,
                newItem,
            ];

            return newArray;
        });
    };

    const changeItemLabel = (id, label) => {
        setTodoData((todoData) => {
            const index = todoData.findIndex((element) => element.id === id);

            const newArray = todoData;
            newArray[index].label = label;

            return newArray;
        });
    };

    const deleteItem = (id) => {
        setTodoData((todoData) => {
            const index = todoData.findIndex((element) => element.id === id);
            const newArray = [
                ...todoData.slice(0, index),
                ...todoData.slice(index + 1),
            ];

            return newArray;
        });
    };

    const deleteByFilter = (filteringProperty, filteringTarget) => {
        setTodoData((todoData) => {
            const newArray = todoData.filter((element) => element[filteringProperty] !== filteringTarget);

            return newArray;
        });
    };

    const toggleProperty = (array, id, propertyName) => {
        const index = array.findIndex((element) => element.id === id);
        const oldItem = array[index];
        const newItem = {...oldItem, [propertyName]: !oldItem[propertyName]};

        return [
            ...array.slice(0, index),
            newItem,
            ...array.slice(index + 1),
        ];
    };

    const onToggleDone = (id) => {
        setTodoData((todoData) => {
            return toggleProperty(todoData, id, 'done');
        });
    };

    const onSetFilter = (filteringProperty, filteringTarget) => {
        setFilteringProperty(filteringProperty);
        setFilteringTarget(filteringTarget);
    };

    const getFilteringTodoData = () => {
        return todoData.filter((item) => {
            if (typeof filteringProperty === 'undefined' || item[filteringProperty] === filteringTarget) {
                return true;
            }
            return false;
        });
    };

    const doneCount = todoData.filter((item) => item.done).length;
    const todoCount = todoData.length - doneCount;

    return (
        <section className="todo-app">
            <AppHeader onItemAdded={addItem}/>
            <section className="main">
                <ToDoList
                    todos={getFilteringTodoData()}
                    onChangeLabel={changeItemLabel}
                    onDeleted={deleteItem}
                    onToggleDone={onToggleDone}/>
            </section>
    
            <ItemController
                toDo={todoCount}
                onSetFilter={onSetFilter}
                deleteByFilter={deleteByFilter}/>
        </section>
    );
};

export default App;