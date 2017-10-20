/**
 * Export component input interface
 * - ExtendedInput
 */
export interface ExtendedInput {
    brand?:string;
    links?:{
        title?:string,
        href?:string
    }[];
    tabs?:{
        title?:string;
        url?:string;
        active?:boolean;
        disabled?:boolean;
    }[];
    color?:string;
};