import React from 'react';
import './button.scss';

const Button = ({props}) => {
    console.log(props);
    return (
        <button className={props}>
            Create
        </button>
    )
}

export default Button;
