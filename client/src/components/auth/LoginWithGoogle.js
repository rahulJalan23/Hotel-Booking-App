import React from 'react';
import GoogleLogin from 'react-google-login';

function LoginWithGoogle() {
  const responseGoogle = (response) => {
    console.log(response);
    if (response.data.accesssToken) {
      console.log(response.data.accessToken);
    }
  };
  return (
    <div>
      <GoogleLogin
        clientId="361147163970-od52cj3utale7adobeuqlvnfau1sego8.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
}

export default LoginWithGoogle;
