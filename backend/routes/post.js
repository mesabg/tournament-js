/**
 * Global dependencies
 */
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bodyParser = require('body-parser');

/**
 * Local dependencies
 */
const Session = require('../management').session;
const User = require('../management').user;
const Post = require('../management').post;
const Auth = require('./jwt');

/**
 * Allow CORS
 */
router.use(function(request, response, next) {
	response.header("Access-Control-Allow-Origin", "*");
	response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	next();
});

/**
 * GET :: Retrieve all the posts
 * User types accepted :: (reader, creator, administrator)
 */
router.get('/', [Auth], function(request, response, next) {
	Post.retrieve().on('db-response', function(dbResponse){
		response.json(dbResponse);
	});
});

/**
 * POST :: Create new post
 * User types accepted :: (creator, administrator)
 * @param title => post title
 * @param content => post content
 */
router.post('/', [Auth], function(request, response, next) {
	//-- Check input erros
	if (!request.body.hasOwnProperty('title') ||
		request.body.title === '' ||
		!request.body.hasOwnProperty('content') ||
		request.body.content === '' ){
			response.json({ state: 'error', msg:'Data is not set', data:null, status: 400 });
			return;
		}
	
	//-- Check user type
	if (request.user.type === 'reader'){
			//-- User not allowed
			response.json({ state: 'error', msg:'User not allowed', data:null, status: 400 });
			return;
		}

	//-- Create post
	Post.create(request.body.title, request.body.content, request.user.username).on('db-response', function(dbResponse){
		response.json(dbResponse);
	});
});

/**
 * PUT :: Update a post
 * User types accepted :: (creator, administrator)
 * @param _id => post identifier
 * @param title => post title
 * @param content => post content
 */
router.put('/', [Auth], function(request, response, next) {
	//-- Check input erros
	if (!request.body.hasOwnProperty('_id') ||
		request.body._id === '' ||
		!request.body.hasOwnProperty('title') ||
		request.body.title === '' ||
		!request.body.hasOwnProperty('content') ||
		request.body.content === '' ){
			response.json({ state: 'error', msg:'Data is not set', data:null, status: 400 });
			return;
		}
	
	//-- Check user type
	if (!(request.user.type === 'creator' &&
		request.user.type === 'administrator')){
			//-- User not allowed
			response.json({ state: 'error', msg:'User not allowed', data:null, status: 400 });
			return;
		}

	//-- Update post
	Post.update(request.body._id, request.body.title, request.body.content, request.user.username).on('db-response', function(dbResponse){
		response.json(dbResponse);
	});
});

/**
 * DELETE :: Delete a post
 * User types accepted :: (administrator)
 * @param _id => post id
 */
router.delete('/:_id', [Auth], function(request, response, next) {
	//-- Check input erros
	if (!request.params.hasOwnProperty('_id') ||
		request.params._id === ''){
			response.json({ state: 'error', msg:'Data is not set', data:null, status: 400 });
			return;
		}
	
	//-- Check user type
	if (!(request.user.type === 'administrator')){
			//-- User not allowed
			response.json({ state: 'error', msg:'User not allowed', data:null, status: 400 });
			return;
		}

	//-- Delete post
	Post.delete(request.params._id).on('db-response', function(dbResponse){
		response.json(dbResponse);
	});
});

module.exports = router;
