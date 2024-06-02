import React, {useState, useEffect} from 'react';
import propTypes from 'prop-types';
import {format, formatDistanceToNow} from 'date-fns';

import './todo-list-item.css';

const TodoListItem = ({label, date, time, onDeleted, onToggleDone, done}) => {
    const [currentLabel, setLabel] = useState(label);
    const [currentTime, setTime] = useState(time);
    const [, setTimer] = useState(undefined);
    const [labelIsEditing, setLabelIsEditing] = useState(false);
    const [timerIsWorking, setTimerIsWorking] = useState(false);

    const second = 1000;

    useEffect(() => {
        if (timerIsWorking) {
            setTimer(setInterval(updateTimer, second));
            return;
        }
        stopTimer();
        return () => stopTimer();
    }, [timerIsWorking]);

    const stopTimer = () => {
        setTimer((timer) => {
            clearInterval(timer);
            return timer;
        });
    };

    const updateTimer = () => {
        setTime((currentTime) => {
            return currentTime - second;
        });
        if (currentTime === 0) {
            stopTimer();
        }
    };

    const onToggleTimer = () => {
        setTimerIsWorking((timerIsWorking) => !timerIsWorking);
    };

    const onEdit = () => {
        setLabelIsEditing(true);
    };

    const onSubmit = (event) => {
        event.preventDefault();

        if (currentLabel === '') return;
        
        setLabelIsEditing(false);
    };

    const onLabelChange = (event) => {
        setLabel(event.target.value);
    };

    const onDeleteWithTimer = () => {
        stopTimer();
        onDeleted();
    };

    const renderEdit = () => {
        if (labelIsEditing) {
            return (
                <form onSubmit={onSubmit}>
                    <input type="text"
                        onChange={onLabelChange}
                        autoFocus
                        value={currentLabel} />
                </form>
            );
        } else {
            return (<span className="title">{currentLabel}</span>);
        }
    };

    let classNames = 'view';
    if (done) {
        classNames += ' completed';
    }

    let timerIconClassNames = 'icon';
    if (timerIsWorking) {
        timerIconClassNames += ' icon-pause';
    }
    else {
        timerIconClassNames += ' icon-play';
    }

    return (
        <React.Fragment>
            <div className={classNames}>
                <input
                    className="toggle"
                    type="checkbox"
                    onClick={onToggleDone}/>
                <label>
                    {renderEdit()}
                    <span className="description">
                        <button type="button"
                            className={timerIconClassNames}
                            onClick={onToggleTimer}>
                            {format(new Date(currentTime), 'mm:ss')}
                        </button>
                    </span>
                    <span className="created">{formatDistanceToNow(date, { includeSeconds: true, addSuffix: true })}</span>
                </label>

                <button type="button"
                    className="icon icon-edit"
                    onClick={onEdit}>
                </button>
    
                <button type="button"
                    className="icon icon-destroy"
                    onClick={onDeleteWithTimer}>
                </button>
            </div>
        </React.Fragment>
    );
};

TodoListItem.propTypes = {
    label: propTypes.string,
    date: propTypes.object,
    time: propTypes.object,
    done: propTypes.bool,
    onDeleted: propTypes.func,
    onToggleDone: propTypes.func,
};

TodoListItem.defaultProps = {
    label: '',
    date: Date.now(),
    time: new Date(0),
    done: false
};

export default TodoListItem;