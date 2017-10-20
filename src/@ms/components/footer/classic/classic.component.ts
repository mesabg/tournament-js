/**
 * Global imports
 */
import { 
    Component, 
    OnInit,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    ElementRef,
    AfterViewInit } from '@angular/core';

declare const $:any;

/**
 * Local imports
 */
import { ClassicInput } from './classic.input';

/**
 * Component description
 * - This component renders a classic materialize-css footer
 */
@Component({
    selector: 'ms-footer-classic',
    templateUrl: './classic.component.html',
    styleUrls: ['./classic.component.scss']
})
export class ClassicComponent implements OnInit, AfterViewInit {
    /**
     * Input
     */
    @Input() public data:ClassicInput;

    /**
     * Views
     */
    @ViewChild('componentFooter') public componentFooter:ElementRef;

    constructor(){ }

    /**
     * Events
     */
    ngOnInit(){ }
    ngAfterViewInit() {
        this.changeColor(this.data.color);
    }

    /**
     * Actions
     */
    private changeColor(color:string):void{
        if (color === undefined || color === null) return;
        $(this.componentFooter.nativeElement).css('background-color', `${color}`);
    }
}