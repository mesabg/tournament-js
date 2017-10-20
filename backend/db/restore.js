/**
 * Global dependencies
 */
require('./connect');

/**
 * Models
 */
const Session = require('./session').model;
const User = require('./user').model;

/**
 * Restore models to the first state
 */
Session.collection.drop()
    .then((value) => {
        console.log("Session collection restored");
    })
    .catch((error) => {
        console.log("Session collection restore error :: ", error);
    });

User.collection.drop()
    .then((value) => {
        console.log("User collection restored");
    })
    .catch((error) => {
        console.log("User collection restore error :: ", error);
    });