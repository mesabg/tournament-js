/**
 * Global Imports
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/**
 * Local Imports
 */
import { UserModel } from '@tournament/model';
import { BackendResponse } from '@tournament/response';

/**
 * API Import
 */
import { ApiService, LazyParser, ServerError } from '@ms/api';

/**
 * Service description
 * - This service manage the data retrive within the API to get "user" data.
 * - All the URL's are public (no login needed)
 */
@Injectable()
export class UserService {
	constructor(private apiService:ApiService) {}

	/**
	 * Login
	 * @param username
	 * @param password
	 */
	public login(username:string, password:string):Observable<BackendResponse>{
		return this.apiService
			.post(`user/login`, {
				username: username,
				password: password
			}).map(response => response.json());
	}

	/**
	 * Logout
	 */
	public logout():Observable<BackendResponse>{
		return this.apiService
			.delete(`user/logout`)
			.map(response => response.json());
	}

	/**
	 * Register
	 */
	public register(user:UserModel):Observable<BackendResponse>{
		return this.apiService
			.post(`user/register`, user)
			.map(response => response.json());
	}
}
