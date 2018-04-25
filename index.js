const errors = require('feathers-errors');
const jsonfile = require('jsonfile');
let gErrMessages =  {
  'INVALID_PORT': 'Port number should be in the range [1, 65535]',
  'SERVICE_UNAVAIALBLE': 'Service not avaialble',
  'REQLDRIVERERROR': 'RethinkDB service unavailable',
  'PRAMATER_MISSING': 'Job data missing, Please provide body as paramater',
  'CONTENT_TYPE': 'Content-Type should be application/json',
  'INVALID_PRAMATER': 'Please provide valid paramater',
  'NOTAUTHENTICATED': 'User authentication fail',
  'BADGATEWAY': 'API service not avaialble',
  'MONGOERROR': 'MongoDB service unavailable'
}

if (process.env.errorMessages !== undefined) {
  gErrMessages = require(process.env.errorMessages);
}

module.exports =  function errorHandler (options) {
  // get environment
  let env = process.env.NODE_ENV || 'development';

  // get options
  let opts = options || {}

  // get log option
  let log = opts.log === undefined ? env !== 'test' : opts.log;

  if (typeof log !== 'function' && typeof log !== 'boolean') {
    throw new TypeError('option log must be function or boolean');
  }

  // default logging using console.error
  if (log === true) {
    log = logerror;
  }
  return function errorHandler (err, req, res, next) {
    // let test
    if (gErrMessages[err.name.toUpperCase()] !== undefined) {
      throw new errors.GeneralError(gErrMessages[err.name.toUpperCase()]); 
    } else {
      console.log('New Error catch from FLOWZ-ERROR-HANDLER ::', err);
      throw err
    }
  }
}

function logerror (err, str) {
  console.error(str || err.stack);
}