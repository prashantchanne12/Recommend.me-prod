import React from 'react';
import './SearchProfile.scss';

function SearchProfile() {
    return (
        <div>
            <div className="search-profile-details">

                <div className="search-profile-image">
                    <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="" />
                </div>
                    
                <p className="search-profile-name">
                    Logan Paul
                </p>

            </div> 
        </div>
    )
}

export default SearchProfile;
