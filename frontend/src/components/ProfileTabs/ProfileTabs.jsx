import React, {useState} from 'react';
import './profileTabs.scss';
import Posts from '../Posts/Posts';

import { useSelector } from 'react-redux';

const ProfileTabs = () => {


    let props = {};
    const userSession = useSelector(state => state.userSession);
    const { user } = userSession;


    const [tab, selectTab] = useState('posts');

    if(tab === 'posts'){
        props = user.recommendations;
    }else if(tab === 'upvoted'){
        props = user.upvotedRecommendations;
    }else{
        props = user.bucket;
    }

    return (
        <>
            <div className="profile-tabs">
                <div className={tab==='posts' ? 'tab active': 'tab'} onClick={() => selectTab('posts')}>Posts</div>
                <div className={tab==='upvoted'? 'tab active': 'tab' } onClick={() => selectTab('upvoted')}>Upvoted</div>
                <div className={tab==='bucket'? 'tab active': 'tab' } onClick={() => selectTab('bucket')}>Bucket</div>
            </div>

            <Posts props={props} />

        </>
    )
}

export default ProfileTabs;
