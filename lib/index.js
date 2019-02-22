const JwtVerifier = require('./jwt');
const LocalVerifier = require('./local');
const Oauth2Verifier = require('./oauth2');

module.exports = {
    Jwt:JwtVerifier,
    Local:LocalVerifier,
    Oauth2:Oauth2Verifier
}