const errors = require('feathers-errors');

var gErrMessages = {
    'ERR_INVALID_PORT': 'Port number should be in the range [1, 65535]',
    'ERR_SERVICE_UNAVAIALBLE': 'Service not avaialble',
    'ERR_REQLDRIVERERROR': 'RethinkDB service unavailable',
    'ERR_PRAMATER_MISSING': 'Job data missing, Please provide body as paramater',
    'ERR_CONTENT_TYPE': 'Content-Type should be application/json',
    'ERR_INVALID_PRAMATER': 'Please provide valid paramater',
    'ERR_NOTAUTHENTICATED': 'User authentication fail'
}  

exports = module.exports = function errorHandler (options) {
  // get environment
  var env = process.env.NODE_ENV || 'development'

  // get options
  var opts = options || {}

  // get log option
  var log = opts.log === undefined
    ? env !== 'test'
    : opts.log

  if (typeof log !== 'function' && typeof log !== 'boolean') {
    throw new TypeError('option log must be function or boolean')
  }

  // default logging using console.error
  if (log === true) {
    log = logerror
  }

  return function errorHandler (err, req, res, next) {
    if (err.name == 'ReqlDriverError') {
      throw new errors.GeneralError(gErrMessages.ERR_REQLDRIVERERROR);
    } else if(err.name == 'NotAuthenticated') {
      throw new errors.NotAuthenticated(gErrMessages.ERR_NOTAUTHENTICATED);
    } else {
      console.log('New Error From Feather-Error-Handler :: ', err);
    }
  }
}

function logerror (err, str) {
  console.error(str || err.stack)
}