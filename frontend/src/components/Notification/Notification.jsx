import React from 'react';
import './Notification.scss';

const Notification = () => {
    return (
        <>   
            <div className="notification-details">
                <img src="https://lh3.googleusercontent.com/a/AATXAJx70eI4pzHaKxQo-zg7bC2gY7Olds6s9FFvI1RF=s96-c" alt="" />
                <p className="details">
                <span className="notification-username">loganPaul</span>    
                upvoted your recommendation
                </p>                                  
            </div>
            {/* <div className="line"> */}
            {/* </div> */}
        </>
    )
}

export default Notification;
