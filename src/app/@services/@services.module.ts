/**
 * Global imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Local imports
 */
import { TournamentApiModule } from '@tournament/api';

/**
 * Services import
 */
import { CTAService } from './cta.service';
import { AuthenticationService } from './authentication.service';

/**
 * Module description
 * - This module contains the general services in the application
 */
@NgModule({
	imports: [
		CommonModule,
		TournamentApiModule
	],
	providers: [
		CTAService,
		AuthenticationService
	]
})
export class ServicesModule { }
