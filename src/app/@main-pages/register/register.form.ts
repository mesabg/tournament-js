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
export const REGISTER_FORM:Field[] = [
	new Field({
		key: 'name',
		label: 'Name',
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
		key: 'lastname',
		label: 'Lastname',
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
		key: 'email',
		label: 'E-mail',
		type: 'email',
		sizeClass: 's12',
		validators:[
            Validators.required,
            Validators.email
		],
		validAssets: [
			{name: 'required', errorMsg: 'Requerido'},
			{name: 'email', errorMsg: 'Debe ser un e-mail válido'},
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
    }),
    new Field({
		key: 'type',
		label: 'Type',
		type: 'select',
		options:[
			{value:'reader', label:'Reader', selected:true},
			{value:'creator', label:'Creator'},
			{value:'administrator', label:'Administrator'}
		],
		sizeClass: 's12'
	}),
];