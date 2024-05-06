import React from 'react';

import TodoListItem from '../todo-list-item';
import './todo-list.css';

const TodoList = ({ todos, searchString, filteringProperty, filteringTarget, onDeleted, onToggleImportant, onToggleDone }) => {

    const elements = todos.map((item) => {
        const { id, ...itemProps } = item;

        if (typeof filteringProperty !== 'undefined' && itemProps[filteringProperty] !== filteringTarget ||
            itemProps.label.toLowerCase().indexOf(searchString.toLowerCase()) === -1) {
            return;
        }

        return (
            <li key={id} className="list-group-item">
                <TodoListItem
                    {...itemProps }
                    onDeleted = {() => onDeleted(id)}
                    onToggleImportant = {() => onToggleImportant(id)}
                    onToggleDone = {() => onToggleDone(id)}/>
            </li>
        );
    });

    return (
        <ul className="list-group todo-list">
            { elements }
        </ul>
    );
};

export default TodoList;