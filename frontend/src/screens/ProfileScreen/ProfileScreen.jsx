import React, {useEffect} from 'react';
import './profileScreen.scss';
import { useDispatch, useSelector } from 'react-redux';
import { userProfile } from '../../actions/userActions';


const ProfileScreen = ({history}) => {

    const dispatch = useDispatch();

    const userProfile = useSelector(state => state.userProfile);
    const { user } = userProfile;

    useEffect(() => {

        if(!user){
            dispatch(userProfile());
        }else{
            history.push('/auth/login');
        }

    },[dispatch, user, history, userProfile]);

    return (
        <>
           <div className="container-md">
               <h2>Profile Screen</h2>
           </div>
        </>
    )
}

export default ProfileScreen;
