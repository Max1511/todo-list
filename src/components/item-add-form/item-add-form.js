import React, {useState} from 'react';
import propTypes from 'prop-types';

import './item-add-form.css';

const ItemAddForm = ({onItemAdded}) => {

    const [label, setLabel] = useState('');
    const [min, setMin] = useState('');
    const [sec, setSec] = useState('');

    const onLabelChange = (event) => {
        setLabel(event.target.value);
    };

    const onMinChange = (event) => {
        setMin(event.target.value);
    };

    const onSecChange = (event) => {
        setSec(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();

        if (label === '') return;
        onItemAdded(label, Number(min), Number(sec));

        setLabel('');
        setMin('');
        setSec('');
    };

    return (
        <form className="new-todo-form"
            onSubmit={onSubmit}>
            
            <input type="text"
                className="new-todo"
                onChange={onLabelChange}
                placeholder="What needs to be done?"
                autoFocus
                value={label} />
            <input type="number"
                className="new-todo-form__timer"
                placeholder="Min"
                onChange={onMinChange}
                max="60"
                inputMode="none"
                value={min} />
            <input type="number"
                className="new-todo-form__timer"
                placeholder="Sec"
                onChange={onSecChange}
                max="59"
                inputMode="none"
                value={sec} />
            <input type="submit" hidden />
        </form>
    );
};

ItemAddForm.propTypes = {
    onItemAdded: propTypes.func
};

export default ItemAddForm;