import React, {useState} from 'react';
import propTypes from 'prop-types';

import './item-status-filter.css';

const ItemStatusFilter = ({onSetFilter}) => {

    const [activatedButtonId, setActivatedButtonId] = useState(0);
  
    const onClickButton = (id, filteringProperty, filteringTarget) => {
        setActivatedButtonId(id);
        return onSetFilter(filteringProperty, filteringTarget);
    };

    const renderButton = (id, text, onClick) => {
        let className = 'not-selected';
        if (id === activatedButtonId) {
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
  
    return (
        <ul className="filters">
            <li>{renderButton(0, 'All', () => onClickButton(0, undefined, false))}</li>
            <li>{renderButton(1, 'Active', () => onClickButton(1, 'done', false))}</li>
            <li>{renderButton(2, 'Completed', () => onClickButton(2, 'done', true))}</li>
        </ul>
    );
};

ItemStatusFilter.propTypes = {
    onSetFilter: propTypes.func
};

export default ItemStatusFilter;