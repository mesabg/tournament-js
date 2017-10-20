/**
 * Global imports
 */
import { 
	Component, 
	OnInit } from '@angular/core';

/**
 * Local imports
 */
import { FormService } from '@tournament/components';
import { UserApi } from '@tournament/api';
import { UserModel } from '@tournament/model';
import { BackendResponse } from '@tournament/response';
import { 
	AuthenticationService, 
	CTAService } from '@tournament/services';
import { REGISTER_FORM } from './register.form';

@Component({
	selector: 'tournament-register-page',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
	providers: [FormService]
})
export class RegisterComponent implements OnInit {
	constructor(
		private formService:FormService,
		private api:UserApi,
		private authentication:AuthenticationService,
		public cta:CTAService) { }

	/**
	 * Events
	 */
	ngOnInit(){
		if (this.authentication.isLoggedIn())
			this.authentication.redirect();
		
		this.formService.initForm(REGISTER_FORM);
		this.formService.submit$.subscribe((form) => {
			this.upload(<UserModel>form);
		});
	}

	/**
	 * Actions
	 */
	private upload(user:UserModel):void{
		this.authentication.register(user);
		this.formService.unlockSubmit();
	}
}
