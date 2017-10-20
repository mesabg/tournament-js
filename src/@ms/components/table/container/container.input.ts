/**
 * Export component input interface
 * - ContainerInput
 */
export interface ContainerInput {
    columns:{
        id:string;
        class:string;
        title:string;
    }[];
    actions:{
        active:boolean;
        options:{
            title:string;
            class:string;
            event:string;
        }[];
    };
};