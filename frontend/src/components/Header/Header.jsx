import React from 'react';
import { Link } from 'react-router-dom';
import { CgAddR } from 'react-icons/cg';
import {VscAccount} from 'react-icons/vsc';
import './header.scss';
// import {RiSearchLine} from 'react-icons/ri';
import {RiNotification2Line} from 'react-icons/all';
import ProfileOptions from '../ProfileOptions/ProfileOptions';
import { useDispatch, useSelector } from 'react-redux';
import { profileToggle, profileToggleReset } from '../../actions/userActions';
import { NOTIFICATION_TOGGLE_REQUEST, NOTIFICATION_TOGGLE_RESET } from '../../constants/userConstants';
import SearchBar from '../SearchBar/SearchBar';
import Notification from '../Notification/Notification';

function Header() {

    const dispatch = useDispatch();

    const {toggle} = useSelector(state => state.profileToggle);
    const {toggle: notificationToggle} = useSelector(state => state.notificationToggle);
    const {notifications : userNotifications} = useSelector(state => state.notifications);
    
    let notifications = null;

    if(userNotifications){
        notifications = userNotifications.notifications;
    }

    return (
        <div className='container header'>

            <div className="header-container">
                
                <Link to='/'><h3 className="title">Recommend.me</h3></Link>

                <SearchBar />

                <div className="options-container" style={{
                    position:"relative"
                }}>


                 <div className="options">
                        
                        {/* <Link to='/' className='link'>
                            <RiSearchLine className='header-icon' />
                        </Link> */}

                        <div className="link">
                            <div className='notification'
                                onClick={() => {
                                    notificationToggle ? dispatch({ type: NOTIFICATION_TOGGLE_RESET }) : dispatch({type: NOTIFICATION_TOGGLE_REQUEST});
                                
                                }}
                            >
                                <RiNotification2Line
                                className='header-icon'
                               />
                            </div>
                             <div className='notification-count'>
                                10
                             </div>
                                
                            {
                                notificationToggle && 
                                <div className="notification-result"
                                    onBlur={(e) => {
                                        dispatch({type: NOTIFICATION_TOGGLE_RESET});
                                    }}
                                >
                                    {
                                        notifications ?
                                        notifications.map(notification => <Notification notification = {notification} key={notification._id} />) 
                                        :
                                        <div>No Notifications for now</div>
                                    }
                                </div>
                            }

                        </div>

                        
                        <Link to='/create' className='link'>
                            <CgAddR className='header-icon' />
                        </Link>
                        <div className='link' onClick={() => toggle ? dispatch(profileToggleReset()) : dispatch(profileToggle())}>
                            <VscAccount className='header-icon'/>
                        </div>
                    </div>
                   {
                       toggle && <ProfileOptions />
                   } 
                </div>
            </div>
        </div>
    )
}

export default Header;
