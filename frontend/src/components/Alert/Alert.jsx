import React from 'react';
import './alert.scss';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

import { useSelector, useDispatch } from 'react-redux';
import { alertMessageResetAction } from '../../actions/alertActions';

const Alert = () => {
  const dispatch = useDispatch();
  const alertMessage = useSelector((state) => state.alertMessage);
  let { message, type } = alertMessage;

  if (message !== null) {
    setTimeout(() => {
      dispatch(alertMessageResetAction());
    }, 5000);
  }

  return message ? (
    <>
      <div className='alert-message-container'>
        <div
          className='alert-message'
          style={{
            borderLeft:
              type === 'success' ? '6px solid #00b894' : '6px solid #ff6b6b',
          }}
        >
          {type === 'success' ? (
            <CheckCircleOutlined
              style={{
                color: '#00b894',
                fontSize: '1.3rem',
              }}
            />
          ) : (
            <CloseCircleOutlined
              style={{
                color: '#ff6b6b',
                fontSize: '1.3rem',
              }}
            />
          )}
          <p>{message}</p>
        </div>
      </div>
    </>
  ) : null;
};

export default Alert;
