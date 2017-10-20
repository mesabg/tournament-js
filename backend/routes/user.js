/**
 * Global dependencies
 */
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

/**
 * Local dependencies
 */
const Session = require('../management').session;
const User = require('../management').user;

/**
 * Allow CORS
 */
router.use(function(request, response, next) {
	response.header("Access-Control-Allow-Origin", "*");
	response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

/**
 * POST :: Login function
 * @param username => An alias or nickname
 * @param password => User's password
 */
router.post('/login', function(request, response, next) {
	//-- Check input erros
	if (!request.body.hasOwnProperty('username') || 
		request.body.username === '' ||
		!request.body.hasOwnProperty('password') || 
		request.body.password === '' || 
		request.body.password.length < 5){
			response.json({ state: 'error', msg:'Data is not set', data:null });
			return;
		}

	//-- Create session
	Session.create(request.body.username, request.body.password, request.headers.host).on('db-response', (dbResponse) => {
		response.json(dbResponse);
	});
});

/**
 * POST :: Create new user (Register)
 * @param name => Name of the user
 * @param lastname => Lastame of the user
 * @param username => An alias or nickname
 * @param email => User's email
 * @param password => User's password
 * @param type => User's type
 */
router.post('/register', function(request, response, next) {
	//-- Check input erros
	if (!request.body.hasOwnProperty('name') ||
		request.body.name === '' ||
		!request.body.hasOwnProperty('lastname') ||
		request.body.lastname === '' ||
		!request.body.hasOwnProperty('username') || 
		request.body.username === '' ||
		!request.body.hasOwnProperty('email') || 
		request.body.email === '' ||
		!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(request.body.email) ||
		!request.body.hasOwnProperty('password') || 
		request.body.password === '' || 
		request.body.password.length < 5 ||
		!request.body.hasOwnProperty('type') || 
		!(request.body.type === 'reader' || request.body.type === 'creator' || request.body.type === 'administrator')){
			response.json({ state: 'error', msg:'Data is not set', data:null });
			return;
		}
	
	User.create(request.body).on('db-response', (dbResponse) => {
		response.json(dbResponse);
	});
});

/**
 * DELETE :: Logout
 */
router.delete('/logout', function(request, response, next) {
	//-- Getting the token
	var token = (request.body && request.body.access_token) || (request.query && request.query.access_token) || request.headers['x-access-token'];
	
	//-- Delete token
	Session.delete(token).on('db-response', (dbResponse) => {
		response.json(dbResponse);
	});
});

module.exports = router;
