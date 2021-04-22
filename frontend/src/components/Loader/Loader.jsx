import React, {useState} from 'react'
import './loader.scss';
import LoadingBar from 'react-top-loading-bar';

import {useSelector} from 'react-redux';

const Loader = () => {

    const loader = useSelector(state => state.loader);
    const {loading} = loader;

    
    const [progress, setProgress] = useState(20)


    const progressLoader = () => {
        setTimeout(() => {
            setProgress(progress + 50)
        },1000);
    }

    if(progress!== 100) {
        progressLoader();
    }

    return loading ?  (
        <div className='loader'>
            <LoadingBar
            height={3}
            color='#0984e3'
            background='#ddd'
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
            />
        </div>
    ) : <></>
}

export default Loader
