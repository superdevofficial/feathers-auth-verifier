const Verifier = require('./verifier');
const Debug = require('debug');

const debug = Debug('@superdevofficial/feathers-auth-verifier:jwt:verify');

class JwtVerifier extends Verifier {
  constructor (app, options = {}) {
    super(app,options);
    this.verify = this.verify.bind(this);
  }

  verify (req, payload, done) {
    if (this.active) {

      const id = payload[`${this.options.entity}Id`];

      if (id === undefined) {
        debug(`JWT payload does not contain ${this.options.entity}Id`);
        return done(null, {}, payload);
      }

      debug(`Looking up ${this.options.entity} by id`, id);

      this.service.get(id).then(entity => {
        const newPayload = { [`${this.options.entity}Id`]: id };
        return done(null, entity, newPayload);
      })
        .catch(error => {
          debug(`Error populating ${this.options.entity} with id ${id}`, error);
          return done(error);
        });

    } else {
      
      if (this.seeking) {
        // if still seeking for the service, throw appropiate error
        return ({ error: true, message: this.options.service + ' is not ready yet' });
      } else {
        // exhausted seeking tries, so throw unavailable error.
        return ({ error: true, message: this.options.service + ' is not unavailable' });
      }

    }
  }
}

module.exports = JwtVerifier;