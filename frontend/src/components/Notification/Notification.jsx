import React from 'react';
import { useDispatch } from 'react-redux';
import { NOTIFICATION_TOGGLE_RESET } from '../../constants/userConstants';
import './Notification.scss';
import {useHistory} from 'react-router-dom';

const Notification = ({notification}) => {

    const history = useHistory();
    const dispatch = useDispatch();

    const gotoProfilePage = () => {
        history.push(`/profile/${notification.userId._id}`);
        dispatch({type: NOTIFICATION_TOGGLE_RESET});
    }

    const gotoPost = () => {
        history.push(`/list/${notification.recommendation}`);
        dispatch({type: NOTIFICATION_TOGGLE_RESET});

    }

    const notificationTemplate = () => {

        switch(notification.type){

            case 'upvote': {
                return <p>upvoted <span 
                onClick={() => {gotoPost()}}
                className="noti-post-title">{notification.title}</span></p>
            }

            case 'comment': {
                return <p>commented ...something on <span className="noti-post-title">{notification.title}</span></p>
            }

            case 'follow': {
                return <p>started following you</p>
            }

            default: break;
        }

    }

    return (
        <>   
            <div className="notification-details" >
                <img src={notification.userId.image} 
                    alt=""
                    onClick={() => {gotoProfilePage()}}
                />
                <div className="details">
                    <span className="notification-username"
                        onClick={() => {gotoProfilePage()}}
                    >{notification.userId.userName}</span>    

                    {notificationTemplate()}

                </div>                                  
            </div>
            {/* <div className="line"> */}
            {/* </div> */}
        </>
    )
}

export default Notification;
