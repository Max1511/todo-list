import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {formatDistanceToNow} from 'date-fns';

import './todo-list-item.css';

export default class TodoListItem extends Component {

    addClass = (classNames, newClass, comparator) => {
        if (comparator) {
            classNames += ` ${newClass}`;
        }
    };

    render() {
        const {label, date, onDeleted, onToggleDone, done} = this.props;

        let classNames = 'view';
        if (done) {
            classNames += ' completed';
        }
        
        return (
            <div className={classNames}>
                <input
                    className="toggle"
                    type="checkbox"
                    onClick={onToggleDone}/>
                <label>
                    <span className="description">{label}</span>
                    <span className="created">{formatDistanceToNow(date, { includeSeconds: true, addSuffix: true })}</span>
                </label>
        
                <button type="button"
                    className="icon icon-edit">
                </button>
        
                <button type="button"
                    className="icon icon-destroy"
                    onClick={onDeleted}>
                </button>
            </div>
        );
    }
}

TodoListItem.PropTypes = {
    label: PropTypes.string,
    date: PropTypes.date,
    onDeleted: PropTypes.func,
    onToggleDone: PropTypes.func,
    done: PropTypes.bool
};

TodoListItem.defaultProps = {
    label: '',
    date: Date.now(),
    done: false
};