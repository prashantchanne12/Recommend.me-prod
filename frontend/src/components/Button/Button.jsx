import React from 'react';
import './button.scss';

const Button = ({onClick}) => {
    return (
        <button className='regular' onClick={onClick}>
            Create
        </button>
    )
}

export default Button;
