/**
 * Global dependencies
 */
const Schema = require('mongoose').Schema;

/**
 * Post Schema
 * @param title => Title of the post
 * @param content => Content of the post
 * @param username => User who post
 * @param createdAt => Post date
 */
var PostSchema = new Schema({
	title:{
        type:String, 
        required:[true, 'Title is required']
    },
    content:{
        type:String, 
        required:[true, 'Content is required']
    },
	username:{
        type:String, 
        required:[true , 'Username is required']
    },
	createdAt:{
        type:String, 
        required:[true, 'Created is required'], 
        unique:true,
        default: Date.now()
    },
    updatedAt:{
        type:String, 
        required:[true, 'Updated is required'], 
        unique:true,
        default: Date.now()
    }
}, {collection: 'post'});

module.exports = PostSchema;