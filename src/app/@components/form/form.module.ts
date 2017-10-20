/**
 * Global Imports
 */
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * Import Components
 */
import { FormComponent } from './form';
import { FieldComponent } from './field';

/**
 * Import Services
 */
import { FormService } from './form.service';

/**
 * [Module description]
 */
@NgModule({
	imports: [
		FormsModule,
		ReactiveFormsModule,
		CommonModule
	],
	declarations: [
		FieldComponent,
		FormComponent
	],
	exports: [
		FieldComponent,
		FormComponent,
		ReactiveFormsModule,
		CommonModule
	]
})
export class FormModule { }
