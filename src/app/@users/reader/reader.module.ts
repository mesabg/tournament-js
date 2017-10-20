/**
 * Global imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Local imports
 */
import { ReaderRoutingModule } from './reader-routing.module';

/**
 * Layout import
 */
import { Layout } from './layout';

/**
 * Module description
 * - This module contains the reader management
 */
@NgModule({
	imports: [
		CommonModule,
		ReaderRoutingModule
	],
	declarations: [
		Layout
	]
})
export class ReaderModule { }
