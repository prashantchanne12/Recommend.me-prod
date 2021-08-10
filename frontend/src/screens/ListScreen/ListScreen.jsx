import React,{useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPost } from '../../actions/recommendPostActions';
import PostItem from '../../components/PostItem/PostItem';
import './ListScreen.scss';

const ListScreen = ({match}) => {

    const dispatch = useDispatch();
    const {post, loading} = useSelector(state => state.singlePost);
  
    useEffect(() => {

        if(!post){
            dispatch(getPost(match.params.listId));
        }

    }, [post, match, dispatch, loading]);
  
    return (
        <div
        
            style={{
                width: '360px',
                margin: '0 auto',
                marginTop: '2rem',
                position: 'relative',
            }}
        >
            <PostItem item={post} isSinglePost={true} />
        </div>
    );
   
}

export default ListScreen;
