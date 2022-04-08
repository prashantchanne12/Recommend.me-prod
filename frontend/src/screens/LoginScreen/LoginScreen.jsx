import React, { useEffect } from 'react';
import './loginScreen.scss';
import { GoogleOutlined } from '@ant-design/icons';

import { useSelector } from 'react-redux';

function LoginScreen({ history }) {
  const { user } = useSelector((state) => state.mySession);
  const redirectUrl = history.location.search.split('?')[1];

  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, [user, history]);

  return (
    <div className='container'>
      <div className='login-container'>
        <div className='container-sm '>
          <h2>Welcome</h2>
          <p className='policy'>
            By logging in you accept our <a href='None'>Privacy Policy</a> and{' '}
            <a href='None'>Terms of Service</a>.
          </p>

          <div className='login-buttons'>
            <a href={`/auth/google?redirect=${redirectUrl}`}>
              <div className='google-button'>
                <GoogleOutlined className='icon' />
                <p>Login with Google</p>
              </div>
            </a>
            {/* <a href="/auth/twitter">
                            <div className="twitter-button">
                                <FaTwitter className='icon'/>
                                <p>Login with Twitter</p>
                            </div>
                        </a> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
