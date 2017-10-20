/**
 * Global dependencies
 */
const EventEmitter = require('events');

/**
 * Dependencies
 */
const Post = require('../db').Post.model;
const socket = require('socket.io');

/**
 * Create socket
 */
const server = require('http').createServer().listen(3030);
const io = socket(server);
console.log("Socket created on port 3030");

/**
 * IO Socket functions
 */
io.use(function(socket, next){
    if (socket.handshake.query && socket.handshake.query.token){
        //-- Validating token
        Session.check(socket.handshake.query.token).on('db-response', (check) => {
            if (check.status === 200){
                //-- Token OK
                socket.user = check.data.user;
                return next();
            }else if (check.status === 401){
                next(new Error('Access token has not been set'));
            }else if (check.status === 400){
                next(new Error('Access token has expired'));
            }else if (check.status === 500){
                next(new Error('DB Error'));
            }
        });
    }else
        next(new Error('Authentication error'));
}).on('connection', function(socket) {
    //-- Connection Authenticated
    console.log("User is connected :: ", socket.user.username);
});

/**
 * Create new post
 * @param title => post title
 * @param content => post content
 * @param username => post username
 */
var _create = function(title, content, username){
    var dbResponse = new EventEmitter();

    //-- Create new post
    var post = new Post({
        title: title,
        content: content,
        username: username,
        createdAt: Date.now(),
        updatedAt: Date.now()
    });

    //-- Save post
    post.save(function(error){
        if (error) dbResponse.emit('db-response', {state: 'error', msg: error._message, data: { errors: error.errors }, status: 500});
        else {
            io.emit('create-post', {state: 'success', msg: 'Post created succesfully', data: {post: post}, status: 201});
            dbResponse.emit('db-response', {state: 'success', msg: 'Post created succesfully', data: {post: post}, status: 201});
        }
    });

    return dbResponse;
};


/**
 * Delete post
 * @param _id => post id
 */
var _delete = function(_id){
    var dbResponse = new EventEmitter();
    Post.findByIdAndRemove(_id, function(error, post){
        if (error) dbResponse.emit('db-response', {state: 'error', msg: error._message, data: { errors: error.errors }, status: 500});
        else {
            io.emit('delete-post', {state: 'success', msg: 'Post created succesfully', data: {post: post}, status: 204});
            dbResponse.emit('db-response', {state: 'success', msg: 'Post delete succesfully', data: {post: post}, status: 204});
        }
    });
    return dbResponse;
};


/**
 * Update post
 * @param _id => post identifier
 * @param title => post title
 * @param content => post content
 * @param username => post username
 */
var _update = function(_id, title, content, username){
    var dbResponse = new EventEmitter();
    Post.findByIdAndUpdate(_id, {
        title: title,
        content: content,
        username: username,
        updatedAt: Date.now
    }, {new: true}, function(error, post){
        if (error) dbResponse.emit('db-response', {state: 'error', msg: error._message, data: { errors: error.errors }, status: 500});
        else {
            io.emit('update-post', {state: 'success', msg: 'Post updated succesfully', data: {post: post}, status: 204});
            dbResponse.emit('db-response', {state: 'success', msg: 'Post updated succesfully', data: {post: post}, status: 204});
        }
    });
    return dbResponse;
};


/**
 * Retrieve all posts
 */
var _retrieve = function(){
    var dbResponse = new EventEmitter();
    Post.find({}, function(error, posts){
        if (error) dbResponse.emit('db-response', {state: 'error', msg: error._message, data: { errors: error.errors }, status: 500});
        else dbResponse.emit('db-response', {state: 'success', msg: 'Posts retrieve succesfully', data: posts, status: 200});
    });
    return dbResponse;
};

module.exports = {
    create: _create,
    delete: _delete,
    update: _update,
    retrieve: _retrieve
};