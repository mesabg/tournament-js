/**
 * Export module
 */
export { ComponentsModule as MsComponentsModule } from './components.module';

/**
 * Export entry point components
 */
export { 
    ClassicComponent as ClassicNavbarComponent,
    ExtendedComponent as ExtendedNavbarComponent } from './navbar';

export { ClassicComponent as ClassicFooterComponent } from './footer';

export { 
    ContainerComponent as ContainerTableComponent,
    RowComponent as RowContainerComponent } from './table';

/**
 * Export input interfaces
 */
export { 
    ClassicInput as ClassicNavbarInput,
    ExtendedInput as ExtendedNavbarInput } from './navbar';

export { ClassicInput as ClassicFooterInput } from './footer';

export { 
    ContainerInput as ContainerTableInput,
    RowInput as RowTableInput } from './table';