import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { userProfile } from '../../actions/userActions';

function HomeScreen({location, history}) { 

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userProfile());
    }, [dispatch]);

    return (
        <>
            <div className="container-md">
                <h3>Home</h3>
            </div>
        </>
    )
}

export default HomeScreen
