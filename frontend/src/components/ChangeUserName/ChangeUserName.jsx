import React, { useState } from 'react';
import './ChangeUserName.scss';
import { CloseCircleOutlined } from '@ant-design/icons';
import Loader from 'react-loader-spinner';

import { useSelector, useDispatch } from 'react-redux';
import {
  changeUserNameCardReset,
  changeUserName,
} from '../../actions/userActions';

const ChangeUserName = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.mySession);
  const {
    error,
    loading,
    userName: newUserName,
  } = useSelector((state) => state.changeUserName);
  const [userName, setUserName] = useState(user.userName);
  const initialUserName = user.userName;

  const submit = () => {
    dispatch(changeUserName(userName));
  };

  if (newUserName) {
    setTimeout(() => {
      dispatch({ type: 'CHANGE_USERNAME_RESET' });
    }, 3000);
  }

  return (
    <>
      <div className='chageUserName'>
        <div className='userNameCard'>
          <CloseCircleOutlined
            className='close'
            onClick={() => {
              dispatch(changeUserNameCardReset());
            }}
          />
          <p
            style={{
              fontSize: '16px',
              paddingTop: '1rem',
              textAlign: 'center',
              fontWeight: 600,
              paddingBottom: '0.5rem',
            }}
          >
            Change Username
          </p>
          <input
            type='text'
            id='username'
            name='username'
            placeholder='Enter username'
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            style={{
              outlineColor: `${error && '#d63031'}`,
            }}
          ></input>
          {error && <p className='err-msg'>{`*username is taken!`}</p>}
          {newUserName && (
            <p className='success-msg'>username updated successfully!</p>
          )}
          <div className='change-name-button'>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <input
                type='button'
                value='submit'
                onClick={() => {
                  console.log('called');
                  submit();
                }}
                required={true}
                disabled={
                  loading ||
                  userName.length === 0 ||
                  userName === initialUserName
                }
                style={{
                  cursor: `${
                    loading ||
                    userName.length === 0 ||
                    userName === initialUserName
                      ? 'not-allowed'
                      : 'pointer'
                  }`,
                }}
              />

              {loading && (
                <div
                  style={{
                    paddingTop: '1.8rem',
                    paddingLeft: '0.5rem',
                  }}
                >
                  <Loader type='Oval' color='#16a085' height={20} width={20} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangeUserName;
