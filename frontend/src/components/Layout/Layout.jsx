import React from 'react';
import Header from '../Header/Header';
import Loader from '../Loader/Loader';
import Alert from '../Alert/Alert';


function Layout({children}) {

    return (
        <div>
           <Loader />
            <Header />
            {children}
            <Alert />
        </div>
    )
}

export default Layout;
