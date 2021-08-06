import React from 'react';
import { Link } from 'react-router-dom';
import { CgAddR } from 'react-icons/cg';
import {VscAccount} from 'react-icons/vsc';
import './header.scss';
// import {RiSearchLine} from 'react-icons/ri';
import {RiNotification2Line} from 'react-icons/all';
import ProfileOptions from '../ProfileOptions/ProfileOptions';
import { useDispatch, useSelector } from 'react-redux';
import { profileToggle, profileToggleReset } from '../../actions/userActions';
import SearchBar from '../SearchBar/SearchBar';

function Header() {

    const dispatch = useDispatch();

    const {toggle} = useSelector(state => state.profileToggle);


    return (
        <div className='container header'>

            <div className="header-container">
                
                <Link to='/'><h3 className="title">Recommend.me</h3></Link>

                <SearchBar />

                <div className="options-container" style={{
                    position:"relative"
                }}>


                 <div className="options">
                        
                        {/* <Link to='/' className='link'>
                            <RiSearchLine className='header-icon' />
                        </Link> */}

                        <div className="link">
                            <RiNotification2Line
                             className='header-icon'
                             />
                        </div>

                        
                        <Link to='/create' className='link'>
                            <CgAddR className='header-icon' />
                        </Link>
                        <div className='link' onClick={() => toggle ? dispatch(profileToggleReset()) : dispatch(profileToggle())}>
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
