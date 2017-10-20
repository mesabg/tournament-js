/**
 * Global imports
 */
import { 
	Component, 
	OnInit } from '@angular/core';

/**
 * Local imports
 */
import { 
	CREATE_FORM,
	CreateSchema } from './create.form';
import { CTAService } from '@tournament/services';
import { FormService } from '@tournament/components';
import { PostApi } from '@tournament/api';
import { BackendResponse } from '@tournament/response';

/**
 * Component description
 * - This component renders the create page of this module
 */
@Component({
	selector: 'tournament-create-administrator-page',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.scss'],
	providers: [FormService]
})
export class CreateComponent implements OnInit {
	constructor(
		private formService:FormService,
		private postApi:PostApi,
		private cta:CTAService) { }

	/**
	 * Events
	 */
	ngOnInit(){
		this.formService.initForm(CREATE_FORM);
		this.formService.submit$.subscribe((form:CreateSchema) => {
			this.upload(form);
		});
	}

	/**
	 * Actions
	 */
	private upload(data:CreateSchema):void{
		this.postApi.create(data.title, data.content).subscribe((response:BackendResponse) => {
			if (response.status === 201) {
				alert("Post created successfully =D");
				this.cta.administratorView();
			}else{
				alert("Post create error =(, try again");
			}
		});
		this.formService.unlockSubmit();
	}
}
