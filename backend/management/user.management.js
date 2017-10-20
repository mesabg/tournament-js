/**
 * Global dependencies
 */
const md5 = require('md5');
const EventEmitter = require('events');

/**
 * BD dependencies
 */
const User = require('../db').User.model;

/**
 * Token management functions
 * @param userData
 */
var create = function(userData){
    var dbResponse = new EventEmitter();
    var user = new User({
        name: userData.name,
        lastname: userData.lastname,
        username: userData.username,
        email: userData.email,
        password: md5(userData.password),
        type: userData.type
    });
    
    user.save(function(error){
        if (error) dbResponse.emit('db-response', {state: 'error', msg: error._message, data: { errors: error.errors }, status: 500});
        else dbResponse.emit('db-response', {state: 'success', msg: 'User created succesfully', data: { user: user }, status: 200});
    });

    return dbResponse;
};

module.exports = {
    create: create
};