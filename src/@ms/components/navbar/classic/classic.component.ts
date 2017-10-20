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

/**
 * Local imports
 */
import { ClassicInput } from './classic.input';

/**
 * Component description
 * - This component renders the "classic" materialize-css navbar
 * - Ref :: http://materializecss.com/navbar.html
 */
@Component({
    selector: 'ms-navbar-classic',
    templateUrl: './classic.component.html',
    styleUrls: ['./classic.component.html']
})
export class ClassicComponent implements OnInit, AfterViewInit {
    /**
     * Inputs
     */
    @Input() public data:ClassicInput;

    /**
     * Outputs
     */
    @Output() public onBrandClick:EventEmitter<void> = new EventEmitter<void>();

    /**
     * Views
     */
    @ViewChild('componentNav') private componentNav:ElementRef;

    constructor() { }

    /**
     * Events
     */
    ngOnInit() { }
    ngAfterViewInit() {
        this.changeColor(this.data.color);
    }

    /**
     * Actions
     */
    private changeColor(color:string):void{
        if (color === undefined || color === null) return;
        this.componentNav.nativeElement.style['background-color'] = `${color} !important`;
    }
}