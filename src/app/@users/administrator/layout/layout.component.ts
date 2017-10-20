/**
 * Global imports
 */
import { 
	Component, 
	OnInit } from '@angular/core';

/**
 * Local imports
 */
import { CTAService } from '@tournament/services';
import { 
	ExtendedNavbarInput,
	ClassicFooterInput } from '@ms/components';

/**
 * Component description
 * - This component renders the layout of this module
 */
@Component({
	selector: 'tournament-layout-administrator',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
	public navbarData:ExtendedNavbarInput = {
		brand: `
			<span>&nbsp;PostIT</span>
		`,
		tabs:[
			{
				title: 'View',
				url: '/view',
				active: true,
				disabled: false
			},{
				title: 'Create',
				url: '/create',
				active: false,
				disabled: false
			}
		],
		color: '#1f6d9f'
	};

	public footerData:ClassicFooterInput = {
		title: 'PostIT',
		description: 'Here you can interact using posts published by different users around the world. Have fun !!',
		linkTitle: '',
		copyright: '© PostIT all rights reserved',
		color: '#1f6d9f'
	};

	constructor(private cta:CTAService) { }

	/**
	 * Events
	 */
	ngOnInit() { }

	/**
	 * Actions
	 */
	public changeRoute(url:string):void{
		if (url === '/create') this.cta.administratorCreate();
		else if (url === '/view') this.cta.administratorView();
	}
}
