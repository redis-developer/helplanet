export interface PaginationDTO<T>{
    page:number;
    minLimit:number;
    maxLimit:number;
    result:T[];
}