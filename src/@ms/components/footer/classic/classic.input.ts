/**
 * Export component input interface
 * - ClassicInput
 */
export interface ClassicInput {
    title?:string;
    description?:string;
    linkTitle?:string;
    copyright?:string;
    links?:{
        title:string;
        href:string;
    }[];
    color?:string;
};