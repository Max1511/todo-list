import React, {Component} from 'react';
import {formatDistanceToNow} from 'date-fns';

import './todo-list-item.css';

export default class TodoListItem extends Component {

    addClass = (classNames, newClass, comparator) => {
        if (comparator) {
            classNames += ` ${newClass}`;
        }
    }

    render() {
        const {label, date, onDeleted,
            onToggleImportant, onToggleDone,
            important, done} = this.props;

        let classNames = "todo-list-item";
        if (done) {
            classNames += " done";
        }
        if (important) {
            classNames += " important";
        }
        
        return (
            <span className={classNames}>
              <span
                className="todo-list-item-label"
                onClick={onToggleDone}>
                {label}
              </span>
        
              <button type="button"
                      className="btn btn-outline-success btn-sm float-right"
                      onClick={onToggleImportant}>
                <i className="fa fa-exclamation" />
              </button>
        
              <button type="button"
                      className="btn btn-outline-danger btn-sm float-right"
                      onClick={onDeleted}>
                <i className="fa fa-trash-o" />
              </button>

              <p className="date float-right">{formatDistanceToNow(date, { includeSeconds: true, addSuffix: true })}</p>
            </span>
        );
    }
}