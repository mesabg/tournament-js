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
import { 
	AuthenticationService, 
	CTAService } from '@tournament/services';
import { BackendResponse } from '@tournament/response';
import { LOGIN_FORM, LoginSchema } from './login.form';

/**
 * Component description
 */
@Component({
	selector: 'tournament-login-page',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	providers: [FormService]
})
export class LoginComponent implements OnInit {
	constructor(
		private formService:FormService,
		private api:UserApi,
		private authentication:AuthenticationService,
		public cta:CTAService) { }

	/**
	 * Events
	 */
	ngOnInit() {
		if (this.authentication.isLoggedIn())
			this.authentication.redirect();
		
		this.formService.initForm(LOGIN_FORM);
		this.formService.submit$.subscribe((form:LoginSchema) => {
			this.upload(form);
		});
	}

	/**
	 * Actions
	 */
	private upload(form:LoginSchema){
		this.authentication.login(form.username, form.password);
		this.formService.unlockSubmit();
	}
}
