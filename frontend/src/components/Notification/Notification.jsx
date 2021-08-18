import React from 'react';
import { useDispatch } from 'react-redux';
import { NOTIFICATION_TOGGLE_RESET } from '../../constants/userConstants';
import './Notification.scss';
import {useHistory} from 'react-router-dom';

const Notification = ({notification}) => {

    const history = useHistory();
    const dispatch = useDispatch();

    const gotoProfilePage = () => {
        history.push(`/profile/${notification.userId}`);
        dispatch({type: NOTIFICATION_TOGGLE_RESET});
    }

    return (
        <>   
            <div className="notification-details" >
                <img src={notification.userProfileImg} 
                    alt={notification.userName}
                    onClick={() => {gotoProfilePage()}}
                />
                <p className="details">
                <span className="notification-username"
                    onClick={() => {gotoProfilePage()}}
                >{notification.userName}</span>    
                upvoted your recommendation
                </p>                                  
            </div>
            {/* <div className="line"> */}
            {/* </div> */}
        </>
    )
}

export default Notification;
