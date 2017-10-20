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
import { 
    CreatePage,
    UpdatePage,
    ViewPage } from './pages';

/**
 * Local imports
 */
import { Layout } from './layout';

const routes: Routes = [{
    path: 'creator',
    component: Layout,
	children: [
		{ path: '', redirectTo: 'view', pathMatch:'full' },
		{ path: 'view', component: ViewPage },
		{ path: 'create', component: CreatePage },
		{ path: 'update', component: UpdatePage }
	]
}];

@NgModule({
	imports: [
		PagesModule,
		RouterModule.forChild(routes)
	],
	exports: [ RouterModule ]
})
export class CreatorRoutingModule { }
