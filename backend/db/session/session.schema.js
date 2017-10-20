/**
 * Global dependencies
 */
const Schema = require('mongoose').Schema;
const User = require('../user').schema;

/**
 * Session Schema
 * @param token => API Rest token authentication
 * @param key => Unlock token key
 * @param host => The hostname
 * @param createdAt => Token create day
 * @param expiresOn => Token expiration day
 * @param user => User related to this session 
 */
var SessionSchema = new Schema({
    token:{
        type:String,
        required:[true, 'Token is required'],
        unique:true
    },
    key:{
        type:String,
        minlength:64,
        maxlength:64,
        required:[true, 'Key is required']
    },
    host:{
        type:String,
        required:[true, 'Host is required']
    },
    createdAt:{
        type:String,
        required:true,
        default: Date.now()
    },
    expiresOn:{
        type:String,
        required:true,
        default: Date.now()
    },
    user:{
        type:User,
        required:[true, 'User is required']
    }
}, {collection: 'session'});

module.exports = SessionSchema;