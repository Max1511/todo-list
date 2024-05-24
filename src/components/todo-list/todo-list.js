import React from 'react';
import propTypes from 'prop-types';

import TodoListItem from '../todo-list-item';
import './todo-list.css';

const TodoList = ({ todos, onChangeLabel, onDeleted, onToggleDone }) => {

    const elements = todos.map((item) => {
        const { id, ...itemProps } = item;
        return (
            <li key={id}>
                <TodoListItem
                    {...itemProps }
                    onChangeLabel = {(label) => onChangeLabel(id, label)}
                    onDeleted = {() => onDeleted(id)}
                    onToggleDone = {() => onToggleDone(id)}/>
            </li>
        );
    });

    return (
        <ul className="todo-list">
            { elements }
        </ul>
    );
};

TodoList.propTypes = {
    todos: propTypes.array,
    onDeleted: propTypes.func,
    onToggleDone: propTypes.func
};

TodoList.defaultProps = {
    todos: []
};

export default TodoList;