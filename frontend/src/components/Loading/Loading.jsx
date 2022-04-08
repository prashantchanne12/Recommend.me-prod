import React from 'react';
import { Pulse } from 'better-react-spinkit';
import './loading.scss';
// better-react-spinkit

const Loading = () => {
  return (
    <div className='loading-spinner'>
      <div>
        <Pulse size={50} color='#0984e3' />
      </div>
    </div>
  );
};

export default Loading;
