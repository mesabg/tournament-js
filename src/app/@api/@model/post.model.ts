/**
 * Export post model interface
 * @param _id => DB post identifier
 * @param title => Post title
 * @param content => Post content
 * @param username => User who post
 * @param createdAt => Post date
 */
export interface Post{
    _id?:number;
    title:string;
    content:string;
    username?:string;
    createdAt?:Date;
    updatedAt?:Date;
};