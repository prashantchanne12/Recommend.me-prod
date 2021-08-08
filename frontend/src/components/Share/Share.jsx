import React from 'react';
import {ShareSocial} from 'react-share-social';
import { useDispatch } from 'react-redux';
import { shareResetAction } from '../../actions/recommendActions';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import './Share.scss';

const style = {
    // background: 'linear-gradient(45deg, #0984e3 30%, #7879FF 90%)',
    background: '#fff',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: '180px',
    padding: '0 30px',
    boxShadow: '0px 3px 15px rgba(0,0,0,0.2)',
    position:'relative',
  };


const Share = () => {

    const dispatch = useDispatch();

    return (
        <div className="share-card">
            <ShareSocial
                className='share'
                style={style}
                url ="url_to_share.com"
                socialTypes={['facebook','twitter','reddit','linkedin']}
           />
          <AiOutlineCloseCircle
            style={{
                position: 'absolute',
                top: 10,
                fontSize: '1.3rem',
                right: 10,
                cursor: 'pointer',
            }}
            onClick={() => {
                dispatch(shareResetAction());
            }}
          />
        </div>
    );
}

export default Share;
