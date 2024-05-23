import React, {Component} from 'react';
import propTypes from 'prop-types';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {

    buttonClass = 'not-selected';
    activatedButtonClass = 'selected';
    state = {
        classNames: [
            this.activatedButtonClass,
            this.buttonClass,
            this.buttonClass
        ],
    };
  
    onClickButton = (id, filteringProperty, filteringTarget) => {
        const newArray = [
            this.buttonClass,
            this.buttonClass,
            this.buttonClass,
        ];
        newArray[id] = this.activatedButtonClass;

        this.setState(() => {
            return {
                classNames: newArray,
            };
        });
        return this.props.onSetFilter(filteringProperty, filteringTarget);
    };

    renderButton = (text, className, onClick) => {
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
        let id = 0;

        return (
            <ul className="filters">
                <li>{this.renderButton('All', this.state.classNames[id++], () => this.onClickButton(0, undefined, false))}</li>
                <li>{this.renderButton('Active', this.state.classNames[id++], () => this.onClickButton(1, 'done', false))}</li>
                <li>{this.renderButton('Completed', this.state.classNames[id++], () => this.onClickButton(2, 'done', true))}</li>
            </ul>
        );
    }
}

ItemStatusFilter.propTypes = {
    onSetFilter: propTypes.func
};