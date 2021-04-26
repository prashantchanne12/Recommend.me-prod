import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { userSession } from '../../actions/userActions';

function HomeScreen() { 

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.userSession);

    useEffect(() => {
        if(!user){
            dispatch(userSession());
        }
    }, [user, dispatch]);


    return (
        <>
            <div className="container-md">
                <h3>Home</h3>
            </div>
        </>
    )
}

export default HomeScreen;
