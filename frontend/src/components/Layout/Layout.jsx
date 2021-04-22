import React, { useState } from 'react';
import Header from '../Header/Header';
import Loader from '../Loader/Loader';

function Layout({children}) {

    return (
        <div>
           <Loader />
            <Header />
            {children}
        </div>
    )
}

export default Layout;
