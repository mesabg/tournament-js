/**
 * Global Imports
 */
import { Validators, ValidatorFn } from '@angular/forms';

/**
 * Valid interface
 */
export interface Valid{
	name:string;
	errorMsg?:string;
}

/**
 * Field Class
 */
export class Field{
	value:string;
	key:string;
	label:string;
	placeholder:string;
	type:string;
	disable:boolean;
	options?:{
		value:string, 
		label:string,
		selected?:boolean
	}[]; //-- Just Apply if type is select
	icon:string;
	sizeClass:string; //-- s - m - l - xl | 1-12 
	successMsg:string;
	validators:any[];
	validAssets:Valid[]; 

	constructor(options: {
		value?:string,
		key?:string,
		label?:string,
		placeholder?:string,
		type?:string,
		disable?:boolean,
		options?:{
			value:string, 
			label:string,
			selected?:boolean
		}[];
		icon?:string,
		sizeClass?:string,
		successMsg?:string,
		validators?:any[],
		validAssets?:Valid[]
	} = {}) {
		this.value = options.value;
		this.key = options.key || '';
		this.label = options.label || '';
		this.placeholder = options.placeholder || undefined;
		this.type = options.type || '';
		this.disable = options.disable || false;
		this.options = options.options === undefined ? [] : options.options;
		this.icon = options.icon || '';
		this.sizeClass = options.sizeClass || 's12';
		this.successMsg = options.successMsg || '';
		this.validators = options.validators === undefined ? [] : options.validators;
		this.validAssets = options.validAssets === undefined ? [] : options.validAssets;
	}
}
