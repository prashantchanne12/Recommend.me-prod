import React, {useState} from 'react';
import './profileTabs.scss';
import Posts from '../Posts/Posts';
import Upvoted from '../Upvoted/Upvoted';
import Bucket from '../Bucket/Bucket';

const ProfileTabs = () => {

    const [tab, selectTab] = useState('posts');

    return (
        <>
            <div className="profile-tabs">
                <div className={tab==='posts' ? 'tab active': 'tab'} onClick={() => selectTab('posts')}>Posts</div>
                <div className={tab==='upvoted'? 'tab active': 'tab' } onClick={() => selectTab('upvoted')}>Upvoted</div>
                <div className={tab==='bucket'? 'tab active': 'tab' } onClick={() => selectTab('bucket')}>Bucket</div>
            </div>

            {
                tab === 'posts' && <Posts />
            }

            {
                tab === 'upvoted' && <Upvoted />
            }

            {
                tab === 'bucket' && <Bucket />
            }

        </>
    )
}

export default ProfileTabs;
