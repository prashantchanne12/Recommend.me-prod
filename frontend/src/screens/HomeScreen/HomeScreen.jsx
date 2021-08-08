import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { mySession } from '../../actions/userActions';

function HomeScreen() { 

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.mySession);

    useEffect(() => {
        if(!user){
            dispatch(mySession());
        }
    }, [user, dispatch]);


    return (
        <>
            <div className="container-md">
            </div>
        </>
    )
}

export default HomeScreen;
