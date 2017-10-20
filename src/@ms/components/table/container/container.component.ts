/**
 * Global imports
 */
import { 
    Component, 
    OnInit,
    Input,
    Output,
    EventEmitter,
    AfterViewInit,
    ViewChild,
    ViewContainerRef,
    ComponentFactory,
    ComponentFactoryResolver,
    ChangeDetectorRef } from '@angular/core';

/**
 * Local imports
 */
import { ContainerInput } from './container.input';
import { RowInput } from '../row';

/**
 * Entry points
 */
import { RowComponent } from '../row';

/**
 * Component description
 * - This component renders a materialize table container
 * - Ref :: http://materializecss.com/table.html
 */
@Component({
    selector: 'ms-table-container',
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit, AfterViewInit {
    /**
     * Inputs
     */
    @Input() public data:ContainerInput;

    /**
     * Outputs
     */
    @Output() public onActionClick:EventEmitter<{
        id:string|number; 
        event:string;
    }> = new EventEmitter<{
        id:string|number; 
        event:string;
    }>();
    @Output() public afterViewInit:EventEmitter<void> = new EventEmitter<void>();

    /**
     * Views
     */
    @ViewChild('tableBody', {read:ViewContainerRef}) private tableBody:ViewContainerRef;

    /**
     * Variables
     */
    private columnKeys:string[] = [];

    constructor(
        private resolver:ComponentFactoryResolver,
        private changeDetector:ChangeDetectorRef) { }

    /**
     * Events
     */
    ngOnInit() { 
        this.data.columns.forEach((column:{id:string, title:string}, index:number) => {
            this.columnKeys.push(column.id);
        });
    }
    ngAfterViewInit(){
        this.afterViewInit.emit();
    }

    /**
     * Actions
     */
    public pushRow(row:RowInput):void{
        //-- Order columns
        let renderRow:RowInput = {
            id: '',
            innerContent: '',
            columns: []
        };

        renderRow.id = row.id;
        renderRow.innerContent = row.innerContent;
        renderRow.columns = [];

        this.columnKeys.forEach((columnKey:string) => {
            row.columns.forEach((column:{id:string, content:string, class:string}) => {
                if (column.id === columnKey){
                    renderRow.columns.push({
                        id: column.id,
                        content: column.content
                    });
                    return;
                }
            });
        });

        //-- Check length
        if (renderRow.columns.length != this.columnKeys.length){
            console.log("Row cannot be rendered, settings are wrong");
            return;
        }

        //-- Everything is OK, Check if has actions
        if (this.data.actions.active){
            let len:number = Math.floor(this.data.actions.options.length / 12);
            let buttons:string = '';

            this.data.actions.options.forEach((value:{title:string, class:string, event:string}) => {
                buttons += `<button event="${value.event}" class="${value.class}">${value.title}</button>`;
            });

            renderRow.columns.push({
                id: 'actions',
                content: buttons
            });
        }

        //-- Render the row
        let factory = this.resolver.resolveComponentFactory(RowComponent);
        let viewref = this.tableBody.createComponent(factory);
        let component:RowComponent = (<RowComponent>viewref.instance);

        //-- Set variables
        component.data = renderRow;

        //-- Suscribe to events
        component.onActionClick.subscribe((data:{id:string|number, event:string}) => {
            this.onActionClick.emit(data);
        });

        //-- Detect changes
        this.changeDetector.detectChanges();
    }

    public removeRow(id:string|number):void{
        for (let i:number = 0; i<this.tableBody.length; i++){
            let component = this.tableBody;
            console.log(component);
        }
    }
}