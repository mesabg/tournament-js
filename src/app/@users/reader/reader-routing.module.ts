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
import { PagesModule } from './pages';

/**
 * Pages import
 */
import { ViewPage } from './pages';

/**
 * Local imports
 */
import { Layout } from './layout';

const routes: Routes = [{
    path: 'reader',
    component: Layout,
	children: [
		{ path: '', redirectTo: 'view', pathMatch:'full' },
		{ path: 'view', component: ViewPage }
	]
}];

@NgModule({
	imports: [
		PagesModule,
		RouterModule.forChild(routes)
	],
	exports: [ RouterModule ]
})
export class ReaderRoutingModule { }
