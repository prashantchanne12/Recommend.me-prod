import React from 'react';
import Header from '../Header/Header';
import Loader from '../Loader/Loader';
import Alert from '../Alert/Alert';
import ProfileOptions from '../ProfileOptions/ProfileOptions';

function Layout({children}) {

    return (
        <div>
           <Loader />
            <Header />
            <ProfileOptions />
            {children}
            <Alert />
        </div>
    )
}

export default Layout;
