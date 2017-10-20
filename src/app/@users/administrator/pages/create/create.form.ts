/**
 * Global imports
 */
import { Validators } from '@angular/forms';

/**
 * Local Imports
 */
import { Valid, Field } from '@tournament/components';

export interface CreateSchema{
    title:string;
    content:string;
};

/**
 * Form description
 */
export const CREATE_FORM:Field[] = [
	new Field({
		key: 'title',
        label: 'Title',
        placeholder: 'Post title',
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
		key: 'content',
        label: 'Content',
        placeholder: 'Write here some content',
		type: 'textarea',
		sizeClass: 's12',
		validators:[
			Validators.required
		],
		validAssets: [
			{name: 'required', errorMsg: 'Requerido'}
		]
    })
];