import React from 'react';
import { ShareSocial } from 'react-share-social';
import { useDispatch, useSelector } from 'react-redux';
import { shareResetAction } from '../../actions/recommendActions';
import { CloseCircleOutlined } from '@ant-design/icons';
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
  position: 'relative',
};

const Share = () => {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.shareToggle);

  return (
    <div className='share-card'>
      <ShareSocial
        className='share'
        style={style}
        url={url ? url : ''}
        socialTypes={['facebook', 'twitter', 'reddit', 'linkedin']}
      />
      <CloseCircleOutlined
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
};

export default Share;
