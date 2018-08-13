import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'regen-network.auth0.com',
    clientID: 'SabnXOxTOiSbfUHOaSvrsEMSGWr7xabm',
    redirectUri: process.env.PUBLIC_URL ? `${process.env.PUBLIC_URL}/callback` : 'http://localhost:3000/callback',
    audience: 'https://app.regen.network/graphql',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login = () => {
    this.auth0.authorize();
  }

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        fetch('/api/login', {
          headers: {
            Authorization: `Bearer ${authResult.accessToken}`
          },
          method: "POST",
        }).then((res) => {
          console.log(res);
        });
      } else if (err) {
        console.log(err);
      }
    });
  }

  setSession = (authResult) => {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  logout = () => {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  isAuthenticated = () => {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

}
