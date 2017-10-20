/**
 * Global imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Local imports
 */
import { CreatorRoutingModule } from './creator-routing.module';

/**
 * Layout import
 */
import { Layout } from './layout';

/**
 * Module description
 * - This module contains the creator management
 */
@NgModule({
	imports: [
		CommonModule,
		CreatorRoutingModule
	],
	declarations: [
		Layout
	]
})
export class CreatorModule { }
