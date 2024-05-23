import React from 'react';
import propTypes from 'prop-types';

import ItemStatusFilter from '../item-status-filter';

import './item-controller.css';

const ItemController = ({toDo, onSetFilter, deleteByFilter}) => {
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
};

ItemController.propTypes = {
    toDo: propTypes.number,
    onSetFilter: propTypes.func,
    deleteByFilter: propTypes.func
};

ItemController.defaultProps = {
    toDo: 0,
};

export default ItemController;