import React from 'react';
import './alert.scss';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';

import { useSelector } from 'react-redux';

const Alert = () => {

    const alertMessage = useSelector(state => state.alertMessage);
    const {message, type} = alertMessage;

    return message ?(
        <>
            <div className="alert-message-container">
                <div className="alert-message"
                    style={{
                        borderLeft: type === 'success' ? '6px solid #00b894' : '6px solid #d63031',
                    }}
                >
                    {
                        type==='success' ? <AiOutlineCheckCircle style={{
                            color: '#00b894',
                            fontSize: '1.3rem',
                        }} /> : <AiOutlineCloseCircle style={{
                            color: '#d63031',
                            fontSize: '1.3rem',
                        }} />
                    }
                    <p>{message}</p>
                </div>
            </div>
        </>
    ) : null;
}

export default Alert;
