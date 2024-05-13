import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ItemStatusFilter from '../item-status-filter';

import './item-controller.css';

export default class ItemController extends Component {
    render() {
        const {toDo, onSetFilter, deleteByFilter} = this.props;
        
        return (
            <footer className="footer">
                <span className="todo-count">{toDo} items left</span>

                <ItemStatusFilter
                    onSetFilter={onSetFilter}/>

                <button type="button"
                    className="clear-completed"
                    onClick={() => deleteByFilter('done', true)}>
                    Clear completed
                </button>
            </footer>
        );
    }
}

ItemController.PropTypes = {
    toDo: PropTypes.number,
    onSetFilter: PropTypes.func,
    deleteByFilter: PropTypes.func
};

ItemController.defaultProps = {
    toDo: 0,
};