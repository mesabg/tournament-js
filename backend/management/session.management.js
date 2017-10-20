/**
 * Global dependencies
 */
require('dotenv').config(); 
const jwt = require('jsonwebtoken');
const random = require('random-token');
const md5 = require('md5');
const EventEmitter = require('events');

/**
 * BD dependencies
 */
const User = require('../db').User.model;
const Session = require('../db').Session.model;

/**
 * Token management functions
 */
var _create = function(username, password, host){
    var dbResponse = new EventEmitter();

    User.findOne({'username': username, 'password': md5(password)}, function(findError, user){
        
        //-- Manage DB errors
        if (user === undefined || user === null){
            dbResponse.emit('db-response', {state: 'error', msg: 'User does not exist', data: null, status: 401});
            return;
        }

        if (findError){
            dbResponse.emit('db-response', {state: 'error', msg: findError._message, data: { errors: findError.errors }, status: 401});
            return;
        }


        //-- Generate a new token
        var key = random.create(`${password}${Date.now()}${host}`)(64); 
        var payload = {
            type: user.type, 
            username: user.username
        };
        var options = { 
            expiresIn: '1h',
            algorithm: 'HS256'
        };

        var token = jwt.sign(payload, key);
        var createdAt = Date.now();
        var expiresOn = jwt.decode(token, {complete: true}).payload.exp;

        var sessionObject = new Session({
            token: token,
            key: key,
            host: host,
            createdAt: createdAt,
            expiresOn: expiresOn,
            user: user
        });

        //-- User found, check if has a session and update it
        var queryObject = {
            'user.username': user.username
        };

        var updateObject = {
            'token': token,
            'key': key,
            'host': host,
            'createdAt': createdAt,
            'expiresOn': expiresOn
        };

        Session.findOneAndUpdate(queryObject, updateObject, function(sessionFindOneError, sessionModel){
            if (sessionFindOneError || sessionModel === null || sessionModel === undefined){
                //-- Session not found and update
                sessionObject.save(function(sessionSaveError){
                    if (sessionSaveError){
                        dbResponse.emit('db-response', {state: 'error', msg: saveError._message, data: { errors: saveError.errors }, status: 500});
                        return;
                    }

                    dbResponse.emit('db-response', {state: 'success', msg: 'Session created succesfully', data: { token:token }, status: 201});
                });
                return;
            }

            //-- Session updated
            dbResponse.emit('db-response', {state: 'success', msg: 'Session updated succesfully', data: { token:token }, status: 201});
        });
    });

    return dbResponse;
};

var _delete = function (token){
    var dbResponse = new EventEmitter();
    if (token === undefined ||
        token === null ||
        token === '')
        dbResponse.emit('db-response', {state: 'error', msg: 'Token is not set', data: null, status: 401});

    //-- Check session
    Session.findOne({'token': token}, function(findError, session){
        if (findError) {
            dbResponse.emit('db-response', {state: 'error', msg: findError._message, data: { errors: findError.errors }, status: 500});
        } else {
            //-- Delete token
            jwt.verify(session.token, session.key, function(verifyError, decoded) {
                session.remove(function(removeError){
                    if (removeError) dbResponse.emit('db-response', {state: 'error', msg: removeError._message, data: { errors: removeError.errors }, status: 500});
                    else dbResponse.emit('db-response', {state: 'success', msg: 'Token succesfully deleted', data: null, status: 200});
                });
            });
        }
    });
    return dbResponse;
};

var _check = function(token){
    var dbResponse = new EventEmitter();
    if (token === undefined ||
        token === null ||
        token === ''){
        dbResponse.emit('db-response', {state: 'error', msg: 'Token is not set', data: null, status: 401});
        return;
    }

    //-- Check session
    Session.findOne({'token': token}, function(findError, session){
        if (findError || session === null || session === undefined) {
            dbResponse.emit('db-response', {state: 'error', msg: findError._message, data: { errors: findError.errors }, status: 500});
            return;
        } else {
            jwt.verify(session.token, session.key, function(verifyError, decoded) {
                if (verifyError){
                    session.remove(function(removeError){
                        if (removeError) dbResponse.emit('db-response', {state: 'error', msg: removeError._message, data: { errors: removeError.errors }, status: 500});
                        else dbResponse.emit('db-response', {state: 'error', msg: 'Token expires', data: null, status: 400});
                    });
                } else dbResponse.emit('db-response', {state: 'success', msg: 'Token still alive', data: { user:session.user }, status: 200});
            });
        }
    });
    return dbResponse;
}

module.exports = {
    create: _create,
    delete: _delete,
    check: _check
};