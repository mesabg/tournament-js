/**
 * Global imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Local import
 */
import { ApiModule as MsApiModule } from '@ms/api';

/**
 * Local services
 */
import { UserApi } from './@services';
import { PostApi } from './@services';

/**
 * Module description
 * - This module manage the API connection
 * NOTE:
 * - This module provides
 */
@NgModule({
	imports: [
		CommonModule,
		MsApiModule
	],
	providers: [
		UserApi,
		PostApi
	]
})
export class ApiModule { }
