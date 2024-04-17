import React, {Component} from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {

  buttonClass = "btn btn-outline-secondary";
  activatedButtonClass = "btn btn-info";
  state = {
    classNames: [
      this.activatedButtonClass,
      this.buttonClass,
      this.buttonClass
    ],
  }
  
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
      }
    });
    return this.props.onSetFilter(filteringProperty, filteringTarget);
  }

  renderButton = (text, className, onClick) => {
    return (
      <button
          type="button"
          className={className}
          onClick={onClick}>
          {text}
      </button>
    );
  }
  
  render() {
    let id = 0;

    return (
      <div className="btn-group">
        {this.renderButton("All", this.state.classNames[id++], () => this.onClickButton(0, undefined, false))}
        {this.renderButton("Active", this.state.classNames[id++], () => this.onClickButton(1, "done", false))}
        {this.renderButton("Done", this.state.classNames[id++], () => this.onClickButton(2, "done", true))}
      </div>
    );
  }
}