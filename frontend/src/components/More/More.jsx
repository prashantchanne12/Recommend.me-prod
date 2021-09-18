import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserRecommendations } from '../../actions/recommendActions';
import Posts from '../Posts/Posts';

const More = ({userId}) => {

    const dispatch = useDispatch();
    const {lists, loading} = useSelector(state => state.userRecommendations);
    useEffect(() => {
        dispatch(fetchUserRecommendations(userId));
    },[dispatch, userId]);

    return !loading && lists ? (
        <>
          <Posts props={lists.uploadedRecommendations} loading={loading} full={true} />   
        </>
    ) : <div>Loading...</div>
}

export default More;
