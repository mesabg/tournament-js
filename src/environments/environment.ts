// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
	production: false,
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
