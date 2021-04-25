import React from 'react';
import './profileOptions.scss';
import { RiAccountPinCircleLine } from 'react-icons/ri';
import { AiOutlineLogin } from 'react-icons/ai';
import {IoLogOutOutline} from 'react-icons/all'

const ProfileOptions = () => {
    return (
        <>
         <div className="profile-options-container">
            <div className="profile-options">
                <div className="profile">
                    <p>Profile</p>    
                    <RiAccountPinCircleLine className='icon' />
                </div> 
                <div className="hr"></div>
                <div className="profile-login">
                    <p>Login</p>
                    <AiOutlineLogin className='icon' />
                    </div>
                <div className="hr"></div>
                <div className="profile-logout">
                    <p>Logout</p>
                    <IoLogOutOutline className='icon' />
                </div>
            </div>  
        </div> 
        </>
    )
}

export default ProfileOptions;
