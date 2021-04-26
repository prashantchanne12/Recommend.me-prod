import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

const UserProfile = ({match}) => {
    return (
        <div className='container'>
            {match.params.userId}
        </div>
    )
}

export default UserProfile;
