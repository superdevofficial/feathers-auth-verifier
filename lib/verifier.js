const Debug = require('debug');

const debug = Debug('@superdev-official/feathers-auth-verifier');

class Verifier {
  constructor (app, options = {}) {
    this.app      = app;
    this.active   = false
    this.options  = options;
    this.service  = typeof options.service === 'string' ? app.service(options.service) : options.service;
    this.counter   = 0      // times we've checked for the user service to be there
    this.seeking   = true   // checking for users service.  haven't given up yet
    this.times     = 30     // number of times we need to check.  ( default 30 times, 2 second intervals = 1 minute  )
    this.interval  = 2000   // milliseconds between tries.

    // Recursive fucntion that waits for the users service.
    const findSetupService = () => {
      // check if the service is there
      if (!this.service) {
        // if the service isn't there start waiting.
        if ( !Object.keys(app.services).includes(options.service)) {
          // service isn't there. increment counter, wait internal, try again
          if (this.counter < this.times) {
            // times not exceeded try again
            this.counter = this.counter + 1
            setTimeout(() => findSetupService(), this.interval)
          } else {
            // times exceeded throw error
            this.seeking = false
            throw new Error('user service not available.');
          }
        } else {
            debug('Auth and users services founded.');
          // service found.  set it up.
          this.service      = typeof options.service === 'string' ? app.service(options.service) : options.service;
          // sevice _id field required.
          // adding it here, but there must be a better way.
          // this will only work for mongo
          this.service.id   = '_id'
          this.active       = true
          this.seeking      = false
        }
      }
    }
    // run the find and setup service function
    findSetupService()
    this.verify = this.verify.bind(this);
  }

  verify () {}
}

module.exports = Verifier;