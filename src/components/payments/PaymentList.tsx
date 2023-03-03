import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { PaymentDto } from "../../api/models/PaymentDto";
import { GridColsObj, GridRowsObj } from "../../shared/types";

type PaymentListProps = {
    data?: PaymentDto[],
};

const PaymentList: React.FCWC<PaymentListProps> = (props) => {

    const rows: GridRowsObj<PaymentDto> = props.data ?? [];
    
    const columns: GridColsObj<PaymentDto>[] = [
        { field: 'id', headerName: 'ID', headerAlign: 'center', flex: 0.2 },
        { field: 'date', headerName: 'Fecha', flex: 1 },
        { field: 'detail', headerName: 'Detalle', flex: 1 },
        { field: 'comment', headerName: 'Comentario', flex: 1 },
        { field: 'updatedDate', headerName: 'Editado el', flex: 1 },
    ];

    return (
        <Box>
            {props.data ?
                <DataGrid rows={rows} columns={columns} autoHeight />
            :
                <DataGrid rows={[]} columns={columns} autoHeight />
            }
        </Box>
    );
};

export default PaymentList;