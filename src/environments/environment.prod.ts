export const environment = {
	production: true,
	API:{
		protocol: 'http',
		baseURL: 'localhost',
		port: '3000',
		get: function():string{ return `${environment.API.protocol}://${environment.API.baseURL}:${environment.API.port}/`; }
	},
	SOCKET:{
		protocol: 'http',
		baseURL: 'localhost',
		port: '3000',
		get: function():string{ return `${environment.API.protocol}://${environment.API.baseURL}:${environment.API.port}/`; }
	}
};
