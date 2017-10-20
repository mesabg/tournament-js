/**
 * Global dependencies
 */
const Schema = require('mongoose').Schema;

/**
 * User Schema
 * @param name => Name of the user
 * @param lastname => Lastname of the user
 * @param username => An alias or nickname
 * @param email => User's email
 * @param password => User's password encrypted
 * @param type => User's type
 */
var UserSchema = new Schema({
	name:{
        type:String, 
        required:[true, 'Name is required']
    },
    lastname:{
        type:String, 
        required:[true, 'Lastname is required']
    },
	username:{
        type:String, 
        required:[true , 'Username is required'],
        unique:true
    },
	email:{
        type:String, 
        required:[true, 'Email is required'], 
        unique:true,
        validate:{
            validator: function(value){
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
            },
            message: '{VALUE} is not a valid email'
        }
    },
	password:{
        type:String,
        required:[true, 'Password is required']
    },
	type:{
        type:String, 
        enum: ['reader', 'creator', 'administrator'],
        required:[true, 'Type is required']
    }
}, {collection: 'user'});

module.exports = UserSchema;