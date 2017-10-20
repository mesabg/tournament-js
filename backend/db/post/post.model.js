/**
 * Global dependencies
 */
const mongoose = require('mongoose');

/**
 * Local dependencies
 */
const PostSchema = require('./post.schema');

/**
 * Declare model
 */
const PostModel = mongoose.model('PostModel', PostSchema);

module.exports = PostModel;