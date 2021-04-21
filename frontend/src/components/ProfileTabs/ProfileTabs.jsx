import React from 'react';
import './profileTabs.scss';

const ProfileTabs = () => {
    return (
        <>
            <div className="profile-tabs">
                <div className='tab active'>Posts</div>
                <div className='tab'>Upvoted</div>
                <div className='tab'>Bucket</div>
            </div>
        </>
    )
}

export default ProfileTabs;
