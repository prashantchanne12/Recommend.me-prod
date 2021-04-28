import React from 'react';
import './profile.scss';
import {BiLink, BiUnlink} from 'react-icons/bi';

import { useSelector, useDispatch } from 'react-redux';
import { followUser } from '../../actions/userActions';

const Profile = ({user, loading}) => {

    const dispatch = useDispatch();
    const mySession = useSelector(state => state.mySession);
    const currentUser = mySession.user;
    let isUserProfile = null;
    let amIFollowing = null;

    if (currentUser && user){
        isUserProfile =  currentUser._id !== user._id;
        amIFollowing = user.followers.find(id => id === currentUser._id);
    }

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
               <div className='hr' />
                <div className="counts">
                    <div className="count">
                        <p>Recommendations</p>
                        <p className='count-number'>{user.recommendations.length}</p>
                    </div>
                    <div className="count">
                        <p>Following</p>
                        <p className='count-number'>{ user.followings.length}</p>
                    </div>
                    <div className="count">
                        <p>Followers</p>
                        <p className='count-number'>{user.followers.length}</p>
                    </div>
                </div>
                {

                   isUserProfile ? (
                        <div className="follow-unfollow" style={{
                            cursor: loading ? 'progress' : 'pointer'
                        }}>
                        <div className='hr' />
                         
                         {

                            amIFollowing ? (
                                <div className="connect" style={{
                                    color: '#d63031'
                                }}>
                                    <p>Disconnect</p>
                                    <BiUnlink className='icon' />
                                </div>
                            ): (
                                <div className="connect" style={{
                                    color: '#0985e3'
                                }} onClick={() => dispatch(followUser(user._id))}>
                                    <p>Connect</p>
                                    <BiLink className='icon' />
                                </div>
                            )

                         }
                     </div>
                    ) : null
                }
            </div>
        </>
    ): <p>Loading...</p>;
}

export default Profile;
