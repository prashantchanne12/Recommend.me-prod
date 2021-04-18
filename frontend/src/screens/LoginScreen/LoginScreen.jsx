import React from 'react'
import './loginScreen.scss';
import { FaGoogle, FaTwitter } from 'react-icons/fa';


function LoginScreen() {
    return (
        <div className='container'>
            <h3>Recommend.me</h3>

            <div className="login-container">
                <div className="container-sm ">
                    <h2>Welcome</h2>
                    <p className='policy'>By logging in you accept our <a href='None'>Privacy Policy</a> and <a href='None'>Terms of Service</a>.</p>

                    <div className="login-buttons">
                       <a href='/auth/google'>
                            <div className="google-button">
                                <FaGoogle className='icon'/>
                                <p>Login with Google</p>
                            </div> 
                       </a>
                        <a href="/auth/twitter">
                            <div className="twitter-button">
                                <FaTwitter className='icon'/>
                                <p>Login with Twitter</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen;
