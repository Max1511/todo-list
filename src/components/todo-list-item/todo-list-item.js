import React, {Component} from 'react';
import propTypes from 'prop-types';
import {format, formatDistanceToNow} from 'date-fns';

import './todo-list-item.css';

export default class TodoListItem extends Component {
    state = {
        label: this.props.label,
        labelIsEditing: false,
        timerIsWorking: false,
        timer: this.props.timer
    };

    componentWillUnmount = () => {
        clearInterval(this.interval);
    };

    updateTimer = () => {
        this.setState(({timer}) => {
            return {
                timer: timer - 1000
            };
        });
        if (this.state.timer === 0) {
            clearInterval(this.interval);
        }
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

    onEdit = () => {
        this.setState({
            labelIsEditing: true
        });
    };

    onSubmit = (event) => {
        event.preventDefault();

        const label = this.state.label;
        if (label === '') return;
        
        this.props.onChangeLabel(label);
        this.setState({
            label: label,
            labelIsEditing: false
        });
    };

    onLabelChange = (event) => {
        this.setState({
            label: event.target.value,
        });
    };

    renderEdit = () => {
        const {label, labelIsEditing} = this.state;

        if (labelIsEditing) {
            return (
                <form onSubmit={this.onSubmit}>
                    <input type="text"
                        onChange={this.onLabelChange}
                        autoFocus
                        value={label} />
                </form>
            );
        } else {
            return (<span className="title">{label}</span>);
        }
    };

    render() {
        const {date, onDeleted, onToggleDone, done} = this.props;

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
            <React.Fragment>
                <div className={classNames}>
                    <input
                        className="toggle"
                        type="checkbox"
                        onClick={onToggleDone}/>
                    <label>
                        {this.renderEdit()}
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
                        className="icon icon-edit"
                        onClick={this.onEdit}>
                    </button>
        
                    <button type="button"
                        className="icon icon-destroy"
                        onClick={onDeleted}>
                    </button>
                </div>
            </React.Fragment>
        );
    }
}

TodoListItem.propTypes = {
    label: propTypes.string,
    date: propTypes.object,
    timer: propTypes.object,
    done: propTypes.bool,
    onDeleted: propTypes.func,
    onToggleDone: propTypes.func,
};

TodoListItem.defaultProps = {
    label: '',
    date: Date.now(),
    timer: new Date(0),
    done: false
};