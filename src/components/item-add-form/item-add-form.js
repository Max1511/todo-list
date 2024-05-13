import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './item-add-form.css';

export default class ItemAddForm extends Component {

    state = {
        label: '',
    };

    onLabelChange = (event) => {
        this.setState({
            label: event.target.value,
        });
    };

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onItemAdded(this.state.label);
        this.setState({
            label: '',
        });
    };

    render() {
        return (
            <form className="item-add-form"
                onSubmit={this.onSubmit}>
                
                <input type="text"
                    className="new-todo"
                    onChange={this.onLabelChange}
                    placeholder="What needs to be done?"
                    autoFocus
                    value={this.state.label} />
            </form>
        );
    }
}

ItemAddForm.PropTypes = {
    onSubmit: PropTypes.func
};