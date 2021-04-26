import React from 'react';
import { Link } from 'react-router-dom';
import { CgAddR } from 'react-icons/cg';
import {VscAccount} from 'react-icons/vsc';
import './header.scss';
import {RiSearchLine} from 'react-icons/ri';
import ProfileOptions from '../ProfileOptions/ProfileOptions';

import { useDispatch, useSelector } from 'react-redux';
import { userProfileToggle, userProfileToggleReset } from '../../actions/userActions';

function Header() {

    const dispatch = useDispatch();

    const {toggle} = useSelector(state => state.userProfileToggle);

    return (
        <div className='container header'>
            <div className="header-container">
                <Link to='/'><h3 className="title">Recommend.me</h3></Link>
                <div className="options-container" style={{
                    position:"relative"
                }}>
                    <div className="options">
                        <Link to='/' className='link'>
                            <RiSearchLine className='header-icon' />
                        </Link>
                        <Link to='/create' className='link'>
                            <CgAddR className='header-icon' />
                        </Link>
                        <div className='link' onClick={() => toggle ? dispatch(userProfileToggleReset()) : dispatch(userProfileToggle())}>
                            <VscAccount className='header-icon'/>
                        </div>
                    </div>
                   {
                       toggle && <ProfileOptions />
                   } 
                </div>
            </div>
        </div>
    )
}

export default Header;
