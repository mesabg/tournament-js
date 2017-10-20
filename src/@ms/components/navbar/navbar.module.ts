/**
 * Global imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Local component imports
 */
import { ClassicComponent } from './classic';
import { ExtendedComponent } from './extended';

/**
 * Module description
 * - This module contains the main "materialize-css" navbars
 */
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ClassicComponent,
        ExtendedComponent
    ],
    entryComponents: [
        ClassicComponent,
        ExtendedComponent
    ],
    exports: [
        ClassicComponent,
        ExtendedComponent
    ]
})
export class NavbarModule { }
