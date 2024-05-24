import React, {Component} from 'react';
import propTypes from 'prop-types';

import './item-add-form.css';

export default class ItemAddForm extends Component {

    state = {
        label: '',
        min: '',
        sec: '',
    };

    onLabelChange = (event) => {
        this.setState({
            label: event.target.value,
        });
    };

    onMinChange = (event) => {
        this.setState({
            min: event.target.value,
        });
    };

    onSecChange = (event) => {
        this.setState({
            sec: event.target.value,
        });
    };

    onSubmit = (event) => {
        event.preventDefault();

        const {label, min, sec} = this.state;

        if (label === '') return;
        this.props.onItemAdded(label, Number(min), Number(sec));

        this.setState({
            label: '',
            min: '',
            sec: '',
        });
    };

    render() {
        return (
            <form className="new-todo-form"
                onSubmit={this.onSubmit}>
                
                <input type="text"
                    className="new-todo"
                    onChange={this.onLabelChange}
                    placeholder="What needs to be done?"
                    autoFocus
                    value={this.state.label} />
                <input type="number"
                    className="new-todo-form__timer"
                    placeholder="Min"
                    onChange={this.onMinChange}
                    max="60"
                    inputMode="none"
                    value={this.state.min} />
                <input type="number"
                    className="new-todo-form__timer"
                    placeholder="Sec"
                    onChange={this.onSecChange}
                    max="59"
                    inputMode="none"
                    value={this.state.sec} />
                <input type="submit" hidden />
            </form>
        );
    }
}

ItemAddForm.propTypes = {
    onSubmit: propTypes.func
};