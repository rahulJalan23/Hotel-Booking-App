import React from 'react';
import GoogleLogin from 'react-google-login';
import { googleAuth } from '../services/auth';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

function LoginWithGoogle() {
  const dispatch = useDispatch();
  const history = useHistory();

  const responseGoogleSuccess = async (res) => {
    try {
      if (res.tokenId) {
        const response = await googleAuth({ tokenId: res.tokenId });
        console.log(response);

        // Send Access Id Back to the Backend
        // console.log(response.tokenId);
        window.localStorage.setItem('auth', JSON.stringify(response.data));
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: response.data,
        });
        history.push('/dashboard');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const responseGoogleFailure = (res) => {
    console.log('Google Auth Failed', res);
    return;
  };

  return (
    <div>
      <GoogleLogin
        clientId="361147163970-od52cj3utale7adobeuqlvnfau1sego8.apps.googleusercontent.com"
        buttonText="Login With Google"
        onSuccess={responseGoogleSuccess}
        onFailure={responseGoogleFailure}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
}

export default LoginWithGoogle;
