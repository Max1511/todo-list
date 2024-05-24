import React, {Component} from 'react';
import propTypes from 'prop-types';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {

    state = {
        activatedButtonId: 0
    };
  
    onClickButton = (id, filteringProperty, filteringTarget) => {
        this.setState(() => {
            return {
                activatedButtonId: id,
            };
        });
        return this.props.onSetFilter(filteringProperty, filteringTarget);
    };

    renderButton = (id, text, onClick) => {
        let className = 'not-selected';
        if (id === this.state.activatedButtonId) {
            className = 'selected';
        }

        return (
            <button
                type="button"
                className={className}
                onClick={onClick}>
                {text}
            </button>
        );
    };
  
    render() {
        return (
            <ul className="filters">
                <li>{this.renderButton(0, 'All', () => this.onClickButton(0, undefined, false))}</li>
                <li>{this.renderButton(1, 'Active', () => this.onClickButton(1, 'done', false))}</li>
                <li>{this.renderButton(2, 'Completed', () => this.onClickButton(2, 'done', true))}</li>
            </ul>
        );
    }
}

ItemStatusFilter.propTypes = {
    onSetFilter: propTypes.func
};