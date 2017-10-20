/**
 * Global imports
 */
import { NgModule } from '@angular/core';
import { 
	Routes, 
	RouterModule } from '@angular/router';

/**
 * Modules imports
 */
import { TournamentMainPagesModule } from '@tournament/main-pages';

/**
 * Guards import
 */
import { 
	AdministratorGuard,
	CreatorGuard,
	ReaderGuard } from '@tournament/guards';

/**
 * Pages import
 */
import { 
	LoginPage,
	RegisterPage } from '@tournament/main-pages';

/**
 * Local imports
 */
import { Layout } from './layout';

const routes: Routes = [{
	path: '',
	children: [
		{ path: '', redirectTo: 'login', pathMatch:'full' },
		{ path: 'login', component: LoginPage },
		{ path: 'register', component: RegisterPage },

		//-- Lazy load modules
		{ path: 'reader', loadChildren: './@users/reader/reader.module#ReaderModule', canActivate:[ReaderGuard] },
		{ path: 'creator', loadChildren: './@users/creator/creator.module#CreatorModule', canActivate:[CreatorGuard] },
		{ path: 'administrator', loadChildren: './@users/administrator/administrator.module#AdministratorModule', canActivate:[AdministratorGuard] }
	]
}];

@NgModule({
	imports: [
		TournamentMainPagesModule,
		RouterModule.forRoot(routes, {useHash: true}) 
	],
	exports: [ RouterModule ]
})
export class TournamentRoutingModule { }
