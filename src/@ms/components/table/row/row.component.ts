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
    AfterViewInit,
    HostListener } from '@angular/core';

import { 
    SafeHtml,
    DomSanitizer } from '@angular/platform-browser';

declare const $:any;

/**
 * Local imports
 */
import { RowInput } from './row.input';

/**
 * Component description
 * - This component renders the row of a materialize-css table body 
 */
@Component({
    selector: 'tr[ms-table-row]',
    templateUrl: './row.component.html',
    styleUrls: ['./row.component.scss']
})
export class RowComponent implements OnInit, AfterViewInit {
    /**
     * Inputs
     */
    @Input() public data:RowInput;

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

    /**
     * Views
     */
    @ViewChild('rowHeader') public rowHeader:ElementRef;
    @ViewChild('rowBody') public rowBody:ElementRef;

    /**
     * Host
     */
    @HostListener('click', ['$event.target']) onClick(target) {
        //-- Listen onClickEvent
        if ($(target).is('button') || $(target).is('a')){
            let event:string = $(target).attr('event');
            this.onActionClick.emit({
                id: this.data.id,
                event: event
            });
        }else{
            let html = $(this.data.innerContent);
            console.log(html);
            $(this.elementRef.nativeElement)
                .after(html);
        }
    }

    @HostListener('mouseenter', ['$event.target']) onMouseEnter(target) {
        //-- Listen onClickEvent
        if (!$(target).is('button') && !$(target).is('a')){
            $(target).css('cursor', 'pointer');
        }
    }
    @HostListener('mouseleave', ['$event.target']) onMouseLeave(target) {
        //-- Listen onClickEvent
        if (!$(target).is('button') && !$(target).is('a')){
            $(target).css('cursor', 'initial');
        }
    }

    constructor(
        private sanitizer:DomSanitizer,
        private elementRef:ElementRef) { }

    /**
     * Events
     */
    ngOnInit(){ }
    ngAfterViewInit(){ }

    /**
     * Actions
     */
    public trustHTML(html:string):SafeHtml{
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }
}