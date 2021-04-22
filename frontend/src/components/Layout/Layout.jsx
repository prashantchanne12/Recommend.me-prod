import React, { useState } from 'react';
import Header from '../Header/Header';
import LoadingBar from 'react-top-loading-bar';

function Layout({children}) {

    const [progress, setProgress] = useState(50)


    return (
        <div>
            <LoadingBar
                height={4}  
                color=''
                progress={progress}
                onLoaderFinished={() => setProgress(50)}
            />
            <Header />
            {children}
        </div>
    )
}

export default Layout;
