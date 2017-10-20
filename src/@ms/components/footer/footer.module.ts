/**
 * Global imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Component imports
 */
import { ClassicComponent } from './classic';

/**
 * Module description
 * - This module contains 
 */
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ClassicComponent
    ],
    entryComponents:[
        ClassicComponent
    ],
    exports: [
        ClassicComponent
    ]
})
export class FooterModule { }
