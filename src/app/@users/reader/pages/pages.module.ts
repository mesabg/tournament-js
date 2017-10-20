/**
 * Global imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Pages imports
 */
import { ViewPage } from './view';

/**
 * Module description
 * - This module contains the pages of the administrator module
 */
@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		ViewPage
	],
	exports: [
		ViewPage
	]
})
export class PagesModule { }
