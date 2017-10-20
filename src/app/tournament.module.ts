/**
 * Global imports
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

/**
 * Local imports
 */
import { Layout } from './layout';
import { TournamentGuardsModule } from '@tournament/guards';
import { TournamentRoutingModule } from './tournament-routing.module';

/**
 * Module description
 * - This module contains the main entry point application
 */
@NgModule({
	declarations: [
		Layout
	],
	imports: [
		BrowserModule,
		TournamentGuardsModule,
		TournamentRoutingModule
	],
	providers: [{provide: LOCALE_ID, useValue: "en-US"}],
	bootstrap: [Layout]
})
export class TournamentModule { }
