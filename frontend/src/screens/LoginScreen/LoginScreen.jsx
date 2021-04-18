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
                            <FaGoogle/>
                            <p>Login with Google</p>
                        </div> 
                       </a>
                        <div className="twitter-button">
                            <FaTwitter />
                            <p>Login with Twitter</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen;
