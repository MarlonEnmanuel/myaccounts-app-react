import { GridColDef, GridRowsProp, GridValidRowModel } from "@mui/x-data-grid";

export type GridRowsObj<R extends GridValidRowModel> = GridRowsProp<R>;
    
export interface GridColsObj<R extends GridValidRowModel, V = any, F = V> extends Omit<GridColDef<R, V, F>, 'field'> {
    field: keyof R,
};