/**
 * Global imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Local imports
 */
import { MsComponentsModule } from '@ms/components';
import { TournamentServicesModule } from '@tournament/services';
import { AdministratorRoutingModule } from './administrator-routing.module';

/**
 * Layout import
 */
import { Layout } from './layout';

/**
 * Module description
 * - This module contains the administrator management
 */
@NgModule({
	imports: [
		CommonModule,
		MsComponentsModule,
		TournamentServicesModule,
		AdministratorRoutingModule
	],
	declarations: [
		Layout
	]
})
export class AdministratorModule { }
