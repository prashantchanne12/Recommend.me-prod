import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { mySession } from '../../actions/userActions';
import {myTimeline} from '../../actions/timelineActions';
import Posts from '../../components/Posts/Posts';

function HomeScreen() { 

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.mySession);
    const {timeline, loading} = useSelector(state => state.myTimeline);

    useEffect(() => {
        if(!user){
            dispatch(mySession());
        }
        if(!timeline){
            dispatch(myTimeline());
        }
    }, [user, timeline, dispatch]);


    return (
        <>
            <div className="container-md-2">
                <Posts props={ timeline ? timeline.recommendations : null} loading={loading}/>
            </div>
        </>
    )
}

export default HomeScreen;
