import React from 'react';

import './search-panel.css';

const SearchPanel = ({onSetSearchString}) => {
    return (
        <input type="text"
            className="form-control search-input"
            placeholder="type to search" 
            onChange={event => onSetSearchString(event.target.value)}/>
    );
};

export default SearchPanel;