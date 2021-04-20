import React from 'react';
import { Link } from 'react-router-dom';
import { CgAddR } from 'react-icons/cg';
import {VscAccount} from 'react-icons/vsc';
import './header.scss';
import {RiSearchLine} from 'react-icons/ri';

function Header() {
    return (
        <div className='container header'>
            <div className="header-container">
                <Link to='/'><h3 className="title">Recommend.me</h3></Link>
                <div className="options">
                    <Link to='/' className='link'>
                        <RiSearchLine className='header-icon' />
                    </Link>
                    <Link to='/create' className='link'>
                        <CgAddR className='header-icon' />
                    </Link>
                    <Link to='/' className='link'>
                        <VscAccount className='header-icon'/>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header;
