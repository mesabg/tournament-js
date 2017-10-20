/**
 * Global Imports
 */
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/**
 * Local Imports
 */
import { PostModel } from '@tournament/model';
import { BackendResponse } from '@tournament/response';

/**
 * API Import
 */
import { 
	ApiService, 
	LazyParser, 
	ServerError,
	SocketIO } from '@ms/api';

/**
 * Service description
 * - This service manage the data retrive within the API to get "user" data.
 * - All the URL's are public (no login needed)
 */
@Injectable()
export class PostService {
	private socket:SocketIO;
	constructor(private apiService:ApiService) {}

	/**
	 * GET :: Retrieve all the posts
	 */
	public retrieve():Observable<BackendResponse>{
		return this.apiService
			.authGet(`post`)
			.map(response => response.json());
	}

	/**
	 * POST :: Create a post
	 * @param title
	 * @param content
	 */
	public create(title:string, content:string):Observable<BackendResponse>{
		return this.apiService
			.authPost(`post`, {
				title: title,
				content: content
			}).map(response => response.json());
	}

	/**
	 * PUT :: Update a post
	 * @param _id
	 * @param title
	 * @param number
	 */
	public update(_id:number, title:string, content:string):Observable<BackendResponse>{
		return this.apiService
			.authPut(`post`, {
				title: title,
				content: content
			}).map(response => response.json());
	}

	/**
	 * DELETE :: Delete a post
	 * @param _id
	 */
	public delete(_id:number):Observable<BackendResponse>{
		return this.apiService
			.authDelete(`post/${_id}`)
			.map(response => response.json());
	}

	/**
	 * CONNECT :: Socket connection
	 */
	public connect():void{
		this.socket = this.apiService.authConnect();
	}

	/**
	 * CONNECT :: 'create-post' event
	 */
	public eventCreate():EventEmitter<PostModel> {
		return this.socket.$event['create-post'] === undefined || 
			this.socket.$event['create-post'] === null ? 
			this.socket.registerEvent('create-post') :
			this.socket.$event['create-post'];
	}

	/**
	 * CONNECT :: 'delete-post' event
	 */
	public eventDelete():EventEmitter<PostModel> {
		return this.socket.$event['delete-post'] === undefined || 
			this.socket.$event['delete-post'] === null ? 
			this.socket.registerEvent('delete-post') :
			this.socket.$event['delete-post'];
	}

	/**
	 * CONNECT :: 'update-post' event
	 */
	public eventUpdate():EventEmitter<PostModel> {
		return this.socket.$event['update-post'] === undefined || 
			this.socket.$event['update-post'] === null ? 
			this.socket.registerEvent('update-post') :
			this.socket.$event['update-post'];
	}
}
