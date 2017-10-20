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

import { 
    SafeHtml, 
    DomSanitizer } from '@angular/platform-browser';

declare const $:any;

/**
 * Local imports
 */
import { ExtendedInput } from './extended.input';

/**
 * Component description
 * - This component renders an extended materialize-css navbar
 * - Ref :: http://materializecss.com/navbar.html
 */
@Component({
    selector: 'ms-navbar-extended',
    templateUrl: './extended.component.html',
    styleUrls: ['./extended.component.html']
})

export class ExtendedComponent implements OnInit, AfterViewInit {
    /**
     * Inputs
     */
    @Input() public data:ExtendedInput;

    /**
     * Outputs
     */
    @Output() public onBrandClick:EventEmitter<void> = new EventEmitter<void>();
    @Output() public onTabClick:EventEmitter<string> = new EventEmitter<string>();

    /**
     * Views
     */
    @ViewChild('componentNav') private componentNav:ElementRef;

    constructor(private sanitizer:DomSanitizer) { }

    /**
     * Events
     */
    ngOnInit() { }
    ngAfterViewInit() {
        this.changeColor(this.data.color);
    }
    tabCliked(event:any, url:string){
        $(this.componentNav.nativeElement).find('li').removeClass('active');
        $(event.path[1]).addClass('active');
        this.onTabClick.emit(url);
    }

    /**
     * Actions
     */
    private changeColor(color:string):void{
        if (color === undefined || color === null) return;
        $(this.componentNav.nativeElement).css('background-color', `${color}`);
    }

    public trustHTML(html:string):SafeHtml{
        return this.sanitizer.bypassSecurityTrustHtml(html === undefined || html === null ? '' : html);
    }
}