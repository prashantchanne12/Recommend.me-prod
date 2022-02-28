import React from 'react';
import './SearchBar.scss';
import SearchProfile from '../SearchProfile/SearchProfile';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

import { useSelector, useDispatch } from 'react-redux';
import { searchUser } from '../../actions/searchActions';
import { inboxToggle, inboxToggleReset } from '../../actions/userActions';
import { useHistory } from 'react-router-dom';

import { USER_PROFILE_RESET } from '../../constants/userConstants';
import { FETCH_USER_RECOMMEND_LIST_RESET } from '../../constants/recommendConstants';

import { BiSearch } from 'react-icons/bi';

const SearchBar = () => {
  const dispatch = useDispatch();
  let history = useHistory();

  const onChangeName = (change) => {
    if (change.target.value.length > 0 && change.target.value !== '') {
      dispatch(searchUser({ query: change.target.value }));
    } else {
      dispatch({ type: 'SEARCH_PROFILE_RESET' });
    }
  };

  const onInputboxClick = (id) => {
    dispatch({ type: USER_PROFILE_RESET });
    dispatch({ type: FETCH_USER_RECOMMEND_LIST_RESET });
    dispatch(inboxToggleReset());
    history.push(`/profile/${id}`);
  };

  const { users, loading } = useSelector((state) => state.searchUsers);
  const { toggle } = useSelector((state) => state.inboxToggle);

  return (
    <div>
      <div className='search-bar'>
        <input
          type='text'
          placeholder='search'
          onChange={onChangeName}
          onClick={() => {
            dispatch(inboxToggle());
          }}
          onBlur={() => {
            setTimeout(() => {
              dispatch(inboxToggleReset());
            }, 260);
          }}
        />

        <div className='search-icon'>
          <BiSearch className='bi-search' />
        </div>

        {toggle && (
          <div className='search-result'>
            {users &&
              users.map((user) => (
                <div
                  key={user._id}
                  onClick={() => onInputboxClick(user._id)}
                  style={{
                    width: '100%',
                  }}
                >
                  <SearchProfile user={user} />
                </div>
              ))}

            {loading && (
              <div
                style={{
                  // position: 'absolute',
                  // top: 50,
                  // left: 50,
                  display: 'flex',
                  marginTop: 20,
                  justifyContent: 'center',
                }}
              >
                <Loader type='Oval' color='#0984e3' height={30} width={30} />
              </div>
            )}

            {users && loading === false && users.length === 0 && (
              <p
                style={{
                  display: 'flex',
                  marginTop: 20,
                  justifyContent: 'center',
                  color: '#c6c6c6',
                }}
              >
                No users found!
              </p>
            )}
            {users === null && loading === false && (
              <p
                style={{
                  display: 'flex',
                  marginTop: 20,
                  justifyContent: 'center',
                  color: '#c6c6c6',
                }}
              >
                Users will appear here
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
