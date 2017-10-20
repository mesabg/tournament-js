/**
 * Global imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Pages imports
 */
import { ViewPage } from './view';
import { CreatePage } from './create';
import { UpdatePage } from './update';

/**
 * Module description
 * - This module contains the pages of the administrator module
 */
@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		ViewPage, 
		CreatePage, 
		UpdatePage
	],
	exports: [
		ViewPage, 
		CreatePage, 
		UpdatePage
	]
})
export class PagesModule { }
