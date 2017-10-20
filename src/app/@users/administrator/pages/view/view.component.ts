/**
 * Global imports
 */
import { 
	Component, 
	OnInit,
	ComponentFactory,
	ComponentFactoryResolver,
	ViewChild,
	ViewContainerRef } from '@angular/core';

/**
 * Local imports
 */
import { 
	ContainerTableInput,
	RowTableInput } from '@ms/components';
import { PostApi } from '@tournament/api';
import { PostModel } from '@tournament/model';
import { BackendResponse } from '@tournament/response';

/**
 * Entry point components
 */
import { ContainerTableComponent } from '@ms/components';

/**
 * Component description
 * - This component renders the view page of this module
 */
@Component({
	selector: 'tournament-view-administrator-page',
	templateUrl: './view.component.html',
	styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
	/**
	 * Views
	 */
	@ViewChild('tableViewRef', {read: ViewContainerRef}) private tableViewRef:ViewContainerRef;

	/**
	 * Variables
	 */
	private tableRef:ContainerTableComponent;
	private tableData:ContainerTableInput = {
		columns: [
			{
				id:'id',
				class:'col s1',
				title: 'ID'
			},{
				id:'title',
				class: 'col s7',
				title: 'Title'
			}
		],
		actions:{
			active: true,
			options:[
				{
					title: 'Edit',
					class: 'col s6 btn orange',
					event: 'edit'
				},{
					title: 'Delete',
					class: 'col s6 btn red',
					event: 'delete'
				}
			]
		}
	};

	constructor(
		private resolver:ComponentFactoryResolver,
		private api:PostApi) { }

	/**
	 * Events
	 */
	ngOnInit() {
		this.createTable();
	}

	/**
	 * Actions
	 */
	private createTable():void{
		let factory = this.resolver.resolveComponentFactory(ContainerTableComponent);
		let viewref = this.tableViewRef.createComponent(factory);
		let component:ContainerTableComponent = (<ContainerTableComponent>viewref.instance);

		//-- Set variables
		component.data = this.tableData;

		//-- Events
		component.afterViewInit.subscribe(() => {
			this.addPosts();
		});

		component.onActionClick.subscribe((data:{id:string|number, event:string}) => {
			console.log(data);
		});

		//-- Store ref
		this.tableRef = component;
	}

	private addPosts():void {
		this.api.retrieve().subscribe((response:BackendResponse) => {
			if (response.status === 200){
				response.data.forEach((post:PostModel, index:number) => {
					let row:RowTableInput = {
						id: post._id,
						innerContent: `
						<tr>
							<div class="row">
								<div class="col s12">
									<span><strong>Post Content</strong></span>
								</div>
								<br>
								<div class="col s12">
									<p>${post.content}</p>
									<p><i>Created By: ${post.username}</i></p>
								</div>
								<div class="col s6">
									<p><i>Created At: ${new Date(post.createdAt)}</i></p>
								</div>
							</div>
						</tr>
						`,
						columns: [
							{
								id: 'id',
								content: index.toString()
							},{
								id: 'title',
								content: post.title
							}
						]
					};
					this.tableRef.pushRow(row);
				});
			}
		});
	}
}