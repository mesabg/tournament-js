/**
 * Global Imports
 */
import { Injectable, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

/**
 * Local Imports
 */
import { Field } from './field/field';

/**
 * [Service description]
 */
@Injectable()
export class FormService {
	/**
	 * Event Submission
	 */
	public submit$ = new EventEmitter<any>();
	public submitLock: boolean = false;

	/**
	 * Build Form
	 */
	public formGroup: FormGroup;
	public fields: Field[];

	/**
	 * Event form builded
	 */
	public builded$ = new EventEmitter<any>();

	constructor(public formBuilder:FormBuilder) { }

	public initForm(fields: Field[]) {
		this.fields = fields;
		this.createFormGroup();
	}

	public submit() {
		this.submitLock = true;
		this.submit$.emit(this.formGroup.value);
	}

	public unlockSubmit() {
		this.formGroup.reset();
		this.submitLock = false;
	}

	private createFormGroup() {
		let group: any = {};
		this.fields.forEach(field => {
			group[field.key] = new FormControl(null, field.validators);
		});
		this.formGroup = new FormGroup(group);
		this.builded$.emit(this.formGroup);
	}

	syncValues(values:EventEmitter<any>):void{
		values.subscribe((data) => this.formGroup.patchValue(data));
	}
}
