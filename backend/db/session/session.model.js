/**
 * Global dependencies
 */
const mongoose = require('mongoose');

/**
 * Local dependencies
 */
const SessionSchema = require('./session.schema');

/**
 * Declare model
 */
const SessionModel = mongoose.model('SessionModel', SessionSchema);

module.exports = SessionModel;