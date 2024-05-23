import React from 'react';
import propTypes from 'prop-types';

import ItemAddForm from '../item-add-form';

import './app-header.css';

const AppHeader = ({onItemAdded}) => {
    return (
        <header className="header">
            <h1>Todo List</h1>
            <ItemAddForm onItemAdded={onItemAdded}/>
        </header>
    );
};

AppHeader.propTypes = {
    onItemAdded: propTypes.func
};

export default AppHeader;