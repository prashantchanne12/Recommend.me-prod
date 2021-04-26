import React from 'react';
import './profileOptions.scss';
import { RiAccountPinCircleLine } from 'react-icons/ri';
import { AiOutlineLogin } from 'react-icons/ai';
import { IoLogOutOutline } from 'react-icons/all';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { userProfileToggleReset, userLogout } from '../../actions/userActions';

const ProfileOptions = () => {

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.userSession);

    return (
        <>
         <div className="profile-options-container">
            <div className="profile-options">
                <Link to='/profile' className="profile" onClick={() => dispatch(userProfileToggleReset())}>
                    <p>Profile</p>    
                    <RiAccountPinCircleLine className='icon' />
                </Link> 
                <div className="hr"></div>

                {
                    user ? (<div className="profile-logout" onClick={() => dispatch(userLogout())}>
                    <p>Logout</p>
                    <IoLogOutOutline className='icon' />
                </div>) : ( <Link to='/login' className="profile-login" onClick={() => dispatch(userProfileToggleReset())}>
                    <p>Login</p>
                    <AiOutlineLogin className='icon' />
                    </Link>)

                }
                
            </div>  
        </div> 
        </>
    )
}

export default ProfileOptions;
