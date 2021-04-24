import React, {useState} from 'react';
import './profileTabs.scss';
import Posts from '../Posts/Posts';

import { useSelector } from 'react-redux';

const ProfileTabs = () => {


    let props = {};
    const userSession = useSelector(state => state.userSession);
    const { user } = userSession;

    const userRecommendations = useSelector(state => state.userRecommendations);
    const {lists} = userRecommendations;

    const [tab, selectTab] = useState('posts');

    if(lists){
        
        if(tab === 'posts'){
            props = lists.uploadedRecommendations;
        }else if(tab === 'upvoted'){
            props = lists.upvotedRecommendations;
        }else{
            props = lists.bucketRecommendations;
        }

    }

    return (
        <>
            <div className="profile-tabs">
                <div className={tab==='posts' ? 'tab active': 'tab'} onClick={() => selectTab('posts')}>Posts</div>
                <div className={tab==='upvoted'? 'tab active': 'tab' } onClick={() => selectTab('upvoted')}>Upvoted</div>
                <div className={tab==='bucket'? 'tab active': 'tab' } onClick={() => selectTab('bucket')}>Bucket</div>
            </div>

            <Posts  props = {lists ? props : null} />

        </>
    )
}

export default ProfileTabs;
