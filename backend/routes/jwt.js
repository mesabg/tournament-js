/**
 * Global dependencies
 */
const jwt = require('jsonwebtoken');
const Session = require('../management').session;

/**
 * Handle user session
 */
 module.exports = function(request, response, next){
    //-- Getting the token
    var token = request.headers.authorization;

    //-- Validate
    if (token === null || token === undefined){
        response.end('Access token has not been set', 401);
        console.log('here');
        return;
    }

    //-- Check Bearer DO IT LATER
    token = token.replace('Bearer ', '');

    //-- Validating token
    Session.check(token).on('db-response', (check) => {
        if (check.status === 200){
            //-- Token OK
            request.user = check.data.user;
            return next();
        }else if (check.status === 401){
            response.end('Access token has not been set', 401);
        }else if (check.status === 400){
            response.end('Access token has expired', 400);
        }else if (check.status === 500){
            response.end('DB Error', 400);
        }
    });
 }