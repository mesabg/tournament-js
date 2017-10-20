/**
 * Global imports
 */
import { Injectable, EventEmitter } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

/**
 * Service description
 * - This service manage ALL the CTA's in the site 
 */
@Injectable()
export class CTAService {
	/**
	 * Events
	 */
	public routeChange:EventEmitter<string> = new EventEmitter<string>();
	public actualRoute:string;

	constructor(private router:Router) {
		this.actualRoute = this.router.url;
		this.router.events
			.subscribe((navigation) =>{
				if ((navigation instanceof NavigationStart))
					this.routeChange.emit(navigation.url);
			});
	}

	public login():void { this.router.navigateByUrl('/login'); }
	public register():void { this.router.navigateByUrl('/register'); }

	/**
	 * Reader
	 */
	public readerView():void { this.router.navigateByUrl('/reader/view'); }

	/**
	 * Creator
	 */
	public creatorView():void { this.router.navigateByUrl('/creator/view'); }
	public creatorCreate():void { this.router.navigateByUrl('/creator/create'); }
	public creatorUpdate(_id:number):void { this.router.navigateByUrl(`/creator/update/${_id}`); }

	/**
	 * Administrator
	 */
	public administratorView():void { this.router.navigateByUrl('/administrator/view'); }
	public administratorCreate():void { this.router.navigateByUrl('/administrator/create'); }
	public administratorUpdate(_id:number):void { this.router.navigateByUrl(`/administrator/update/${_id}`); }
}
