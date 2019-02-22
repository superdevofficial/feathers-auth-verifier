# @superdevofficial/feathers-auth-verifier


> Customs verifiers for feathers authentication strategy using Passport

## Installation

```
npm install @superdevofficial/feathers-verifier --save
```

## Quick example

```js
const feathers = require('@feathersjs/feathers');
const authentication = require('feathers-authentication');
const jwt = require('@feathersjs/authentication-jwt');
const local = require('@feathersjs/authentication-local');
const oauth2 = require('@feathersjs/authentication-oauth2');
const Auth0Strategy = require('passport-auth0');
const customVerifier = require('@superdevofficial/feathers-auth-verifier');
const app = feathers();

// Setup authentication
app.configure(authentication(settings));
app.configure(jwt({ Verifier: customVerifier.Jwt }));
app.configure(local({ Verifier: customVerifier.Local }));
app.configure(oauth2(Object.assign({
    name: 'auth0',
    Strategy: Auth0Strategy,
    Verifier: customVerifier.Oauth2
    // !code: auth0_options // !end
  }, config.auth0)));

// Setup a hook to only allow valid JWTs to authenticate
// and get new JWT access tokens
app.service('authentication').hooks({
  before: {
    create: [
      authentication.hooks.authenticate(['jwt'])
    ]
  }
});
```

## License

Copyright (c) 2018

Licensed under the [MIT license](LICENSE).
)