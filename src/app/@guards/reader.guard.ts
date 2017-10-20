/**
 * Global imports
 */
import { Injectable } from '@angular/core';
import { 
	CanActivate, 
	ActivatedRouteSnapshot, 
	RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

/**
 * Local imports
 */
import { AuthenticationService } from '@tournament/services';

/**
 * Guard description
 * - This guard manages the authentication of a 'reader' user type
 */
@Injectable()
export class ReaderGuard implements CanActivate {
	constructor(private authentication:AuthenticationService){}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		if (this.authentication.isLoggedIn() && this.authentication.isReader())
			return true;
		else {
			this.authentication.redirect();
			return false;
		}
	}
}
