import React from 'react';
import {ShareSocial} from 'react-share-social';
import './Share.scss';

const style = {
    // background: 'linear-gradient(45deg, #0984e3 30%, #7879FF 90%)',
    background: '#fff',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: '180px',
    padding: '0 30px',
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    boxShadow: '0px 3px 15px rgba(0,0,0,0.2)',
  };


const Share = () => {
    return (
        <div className="share-card">
            <ShareSocial
                className='share'
                style={style}
                url ="url_to_share.com"
                socialTypes={['facebook','twitter','reddit','linkedin']}
           />
        </div>
    );
}

export default Share;
