/**
 * Global imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Local imports
 */
import { FormModule } from './form';

/**
 * Module description
 * - This module contains global components
 */
@NgModule({
	imports: [
		CommonModule,
		FormModule
	],
	exports: [
		FormModule
	]
})
export class ComponentsModule { }
