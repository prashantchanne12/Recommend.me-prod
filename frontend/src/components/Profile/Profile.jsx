import React from 'react';
import './profile.scss';

const Profile = ({user}) => {


    return user ? (
        <>
            <div className="profile-box">
               <div className="profile-header">
                    <div className="profile-image">
                        <img src={user.image} alt='' />
                    </div>
                    <div className="display-name">
                        <p className='f-name'>{user.firstName}</p>
                        <p className='l-name'>{user.lastName}</p>
                    </div>
               </div>
                <div className="counts">
                    <div className="recommendation-counts">
                        <p>Recommendations</p>
                        <p>{user.recommendations.length}</p>
                    </div>
                    <div className="following-counts">
                        <p>Following</p>
                        <p>{user.followings.length}</p>
                    </div>
                    <div className="followers-counts">
                        <p>Followers</p>
                        <p>{user.followers.length}</p>
                    </div>
                </div>
            </div>
        </>
    ): <p>Loading...</p>;
}

export default Profile;
