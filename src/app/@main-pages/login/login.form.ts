/**
 * Global imports
 */
import { Validators } from '@angular/forms';

/**
 * Local Imports
 */
import { Valid, Field } from '@tournament/components';

/**
 * Form description
 */

export interface LoginSchema{
	username:string;
	password:string;
}

export const LOGIN_FORM:Field[] = [
	new Field({
		key: 'username',
		label: 'Username',
		type: 'text',
		sizeClass: 's12',
		validators:[
			Validators.required
		],
		validAssets: [
			{name: 'required', errorMsg: 'Requerido'}
		]
	}),
	new Field({
		key: 'password',
		label: 'Password',
		type: 'password',
		sizeClass: 's12',
		validators:[
			Validators.required
		],
		validAssets: [
			{name: 'required', errorMsg: 'Requerido'}
		]
	})
];