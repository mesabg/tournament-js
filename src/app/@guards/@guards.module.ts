/**
 * Global imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Local imports
 */
import { TournamentServicesModule } from '@tournament/services';

/**
 * Import guards
 */
import { AdministratorGuard } from './administrator.guard';
import { CreatorGuard } from './creator.guard';
import { ReaderGuard } from './reader.guard';

/**
 * Module description
 * - This module contains all the guards that will be used in the application
 */
@NgModule({
	imports: [
		CommonModule,
		TournamentServicesModule
	],
	providers: [
		AdministratorGuard,
		CreatorGuard,
		ReaderGuard
	]
})
export class GuardsModule { }
