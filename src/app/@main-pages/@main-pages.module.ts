/**
 * Global imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Local imports
 */
import { TournamentComponentsModule } from '@tournament/components';
import { TournamentApiModule } from '@tournament/api';
import { TournamentServicesModule } from '@tournament/services';

/**
 * Pages import
 */
import { LoginPage } from './login';
import { RegisterPage } from './register';

/**
 * Module description
 * - This module contains main pages of the application, like:
 * - Login, Register
 */
@NgModule({
	imports: [
		CommonModule,
		TournamentApiModule,
		TournamentComponentsModule,
		TournamentServicesModule
	],
	declarations: [
		LoginPage,
		RegisterPage
	],
	exports: [
		LoginPage,
		RegisterPage
	]
})
export class MainPagesModule { }
