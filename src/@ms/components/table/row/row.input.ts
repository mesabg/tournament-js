/**
 * Export component input interface
 * - RowInput
 */
export interface RowInput {
    id:string | number;
    innerContent:string;    //-- RAW HTML
    columns:{
        id:string;
        content:string;     //-- RAW HTML
    }[];
};