/**
 * Component imports
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

/**
 * Import inner modules
 */
import { NavbarModule } from './navbar';
import { FooterModule } from './footer';
import { TableModule } from './table';

/**
 * Module description
 * - This module contains all the global components that can be used in the site
 */
@NgModule({
    imports: [
        CommonModule,
        
        //-- Inner modules
        NavbarModule,
        FooterModule,
        TableModule
    ],
    exports: [
        //-- Inner modules
        NavbarModule,
        FooterModule,
        TableModule
    ]
})
export class ComponentsModule { }
