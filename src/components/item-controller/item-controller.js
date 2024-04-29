import React, {Component} from 'react';

import './item-controller.css';

export default class ItemController extends Component {
    render() {
        const {deleteByFilter} = this.props;
        
        return (
            <div className="item-controller btn-group">
                <button type="button"
                    className="btn btn-outline-danger float-right"
                    onClick={() => deleteByFilter('done', true)}>
                    Clear completed
                </button>
            </div>
        );
    }
}