import React, {Component} from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {
  
  onClickButton = (filteringProperty, filteringTarget) => {
    return this.props.onSetFilter(filteringProperty, filteringTarget);
  }
  
  render() {
    return (
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-info"
          onClick={() => this.onClickButton(undefined, false)}>
          All
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => this.onClickButton("done", false)}>
          Active
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => this.onClickButton("done", true)}>
          Done
        </button>
      </div>
    );
  }
}