/**
 * Global imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Component imports
 */
import { ContainerComponent } from './container';
import { RowComponent } from './row';

/**
 * Module description
 * - This module contains the table in materialize css model
 */
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ContainerComponent,
        RowComponent
    ],
    entryComponents: [
        ContainerComponent,
        RowComponent
    ],
    exports: [
        ContainerComponent,
        RowComponent
    ]
})
export class TableModule { }
