import React, {Component} from 'react';
import propTypes from 'prop-types';
import {format, formatDistanceToNow} from 'date-fns';

import './todo-list-item.css';

export default class TodoListItem extends Component {

    state = {
        timerIsWorking: false,
        timer: 0
    };

    componentWillUnmount = () => {
        console.log('componentWillUnmount');
        clearInterval(this.interval);
    };

    updateTimer = () => {
        this.setState(({timer}) => {
            return {
                timer: timer + 1000
            };
        });
    };

    onToggleTimer = () => {
        this.setState(({timerIsWorking}) => {
            if (timerIsWorking) {
                clearInterval(this.interval);
            }
            else {
                this.interval = setInterval(this.updateTimer, 1000);
            }
            return {
                timerIsWorking: !timerIsWorking
            };
        });
    };

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

        let timerIconClassNames = 'icon';
        if (this.state.timerIsWorking) {
            timerIconClassNames += ' icon-pause';
        }
        else {
            timerIconClassNames += ' icon-play';
        }
        
        return (
            <div className={classNames}>
                <input
                    className="toggle"
                    type="checkbox"
                    onClick={onToggleDone}/>
                <label>
                    <span className="title">{label}</span>
                    <span className="description">
                        <button type="button"
                            className={timerIconClassNames}
                            onClick={this.onToggleTimer}>
                            {format(new Date(this.state.timer), 'mm:ss')}
                        </button>
                    </span>
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

TodoListItem.propTypes = {
    label: propTypes.string,
    date: propTypes.object,
    onDeleted: propTypes.func,
    onToggleDone: propTypes.func,
    done: propTypes.bool
};

TodoListItem.defaultProps = {
    label: '',
    date: Date.now(),
    done: false
};