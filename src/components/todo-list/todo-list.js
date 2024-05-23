import React from 'react';
import propTypes from 'prop-types';

import TodoListItem from '../todo-list-item';
import './todo-list.css';

const TodoList = ({ todos, filteringProperty, filteringTarget, onDeleted, onToggleDone }) => {

    const elements = todos.map((item) => {
        const { id, ...itemProps } = item;

        let isHidden = false;
        if (typeof filteringProperty !== 'undefined' && itemProps[filteringProperty] !== filteringTarget) {
            isHidden = true;
        }

        return (
            <li key={id}>
                <TodoListItem
                    {...itemProps }
                    isHidden = {isHidden}
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
    filteringProperty: propTypes.string,
    filteringTarget: propTypes.bool,
    onToggleDone: propTypes.func
};

TodoList.defaultProps = {
    todos: [],
    filteringProperty: undefined,
    filteringTarget: false
};

export default TodoList;