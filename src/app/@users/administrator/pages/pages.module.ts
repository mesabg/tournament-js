/**
 * Global imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Local imports
 */
import { MsComponentsModule } from '@ms/components';
import { TournamentComponentsModule } from '@tournament/components';
import { TournamentApiModule } from '@tournament/api';

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
		CommonModule,
		MsComponentsModule,
		TournamentComponentsModule,
		TournamentApiModule
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
