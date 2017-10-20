/**
 * User model interface
 * @param _id => DB Identifier
 * @param name => Name of the user
 * @param lastname => Lastname of the user 
 * @param username => An alias or nickname
 * @param email => User's email
 * @param password => User's password encrypted
 * @param type => User type ['creator', 'reader', 'administrator']
 */
export interface User {
    _id?:number;
    name:string;
    lastname:string;
    username:string;
    email:string;
    password:string;
    type:string;
};