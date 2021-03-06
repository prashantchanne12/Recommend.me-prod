import React, {useState} from 'react';
import './profileTabs.scss';
import Posts from '../Posts/Posts';

const ProfileTabs = ({lists, loading}) => {

    let props = {};

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

            <Posts  props = {lists ? props : null} loading={loading}/>

        </>
    )
}

export default ProfileTabs;
