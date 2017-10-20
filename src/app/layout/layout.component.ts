/**
 * Global imports
 */
import { Component } from '@angular/core';

/**
 * Component description
 * - This component renders the main layout of the application
 */
@Component({
	selector: 'tournament-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
	onActivate($event, outlet){ window.scrollTo(0, 0); }
}
