import React from 'react'
import './loader.scss';
import LoadingBar from 'react-top-loading-bar';

import {useSelector} from 'react-redux';
const Loader = () => {

    const loader = useSelector(state => state.loader);
    let {loading, percentage} = loader;
    return loading || percentage > 0 ?  (
        <div className='loader'>
            <LoadingBar
            height={3}
            color='#0984e3'
            loaderSpeed={1000}
            progress={percentage}
            onLoaderFinished={0}
            />
        </div>
    ) : <></>
}

export default Loader
