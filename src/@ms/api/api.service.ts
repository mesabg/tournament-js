/**
 * Global Imports
 */
import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, RequestMethod, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuthHttp } from 'angular2-jwt';

/**
 * Environment Import
 */
import { environment } from "@environment";
import { SocketIO } from './socket.class';

/**
 * [API Rest Service definition]
 */
@Injectable()
export class ApiService {
	protected headers:Headers;
	protected baseUrl:string = environment.API.get();
	protected socket:SocketIO;
	protected baseConnection:string = environment.SOCKET.get();

	constructor(protected http:Http, protected authHttp:AuthHttp) {
		this.headers = new Headers();
		this.headers.append('Content-Type', 'application/json');
	}

	/**
	 * Common http calls
	 */
	public get(method:string):Observable<any>{
		return this.http.get(this.baseUrl + method, {headers: this.headers});
	}

	public post(method:string, body:any):Observable<any>{
		return this.http.post(this.baseUrl + method, body, {headers: this.headers});
	}

	public put(method:string, body:any):Observable<any>{
		return this.http.put(this.baseUrl + method, body, {headers: this.headers});
	}

	public delete(method:string):Observable<any>{
		return this.http.delete(this.baseUrl + method, {headers: this.headers});
	}

	public connect():SocketIO{
		try {
			this.socket = new SocketIO(this.baseConnection);
			return this.socket;
		}catch (error){
			console.log("Socket error :: ", error);
		}
	}

	/**
	 * Auth http calls
	 */
	public authGet(method:string):Observable<any>{
		return this.authHttp.get(this.baseUrl + method);
	};

	public authPost(method:string, body:any):Observable<any>{
		return this.authHttp.post(this.baseUrl + method, body);
	}

	public authPut(method:string, body:any):Observable<any>{
		return this.authHttp.put(this.baseUrl + method, body);
	}

	public authDelete(method: string):Observable<any>{
		return this.authHttp.delete(this.baseUrl + method);
	}

	public authConnect():SocketIO{
		try {
			this.socket = new SocketIO(this.baseConnection, {
				query: {token: sessionStorage.getItem('token')}
			});
			return this.socket;
		}catch (error){
			console.log("Socket error :: ", error);
		}
	}
}
