import React from 'react';
import './SearchProfile.scss';

function SearchProfile({user}) {
    return (
        <div>
            <div className="search-profile-details">

                <div className="search-profile-image">
                    <img src={user.image} alt="" />
                </div>
            
                <div>
                    <p className="search-profile-name">
                    {user.displayName}
                    </p>
                    
                    <p className="search-profile-username">{user.userName}</p>
                </div>

            </div> 
        </div>
    )
}

export default SearchProfile;
