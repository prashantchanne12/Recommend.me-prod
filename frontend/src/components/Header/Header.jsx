import React from 'react';
import { CgAddR } from 'react-icons/cg';
import {VscAccount} from 'react-icons/vsc';

function Header() {
    return (
        <div className='container'>
            <div className="header-container">
                <h3 className="title">Recommend.me</h3>
                <div className="search-input">
                    <input className='search' />
                </div>
                <div className="options">
                    <CgAddR />
                    <VscAccount />
                </div>
            </div>
        </div>
    )
}

export default Header;
