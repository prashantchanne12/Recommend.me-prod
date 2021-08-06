import React from 'react';
import './SearchProfile.scss';

function SearchProfile({user}) {
    return (
        <div>
            <div className="search-profile-details">

                <div className="search-profile-image">
                    <img src={user.image} alt="" />
                </div>
                    
                <p className="search-profile-name">
                   {user.displayName}
                </p>

            </div> 
        </div>
    )
}

export default SearchProfile;
