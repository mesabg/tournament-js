/**
 * Global Imports
 */
import { Component, OnInit } from '@angular/core';

/**
 * Services Imports
 */
import { FormService } from '../form.service';

/**
 * [Component description]
 */
@Component({
	selector: 'tournament-custom-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
	constructor(public formService:FormService) { }
	ngOnInit() { }
}
