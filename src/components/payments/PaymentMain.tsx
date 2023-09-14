import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import PaymentEdit from "./PaymentEdit";
import PaymentList from "./PaymentList";
import { API } from "../../api";
import { useApiFetch } from "../../shared/useApiRequest";

const PaymentMain = () => {

    const { data, isLoading } = useApiFetch(API.payments.getList, {});

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <PaymentList data={data}></PaymentList>
            <br/>
            <PaymentEdit />
        </Box>
    );
};

export default PaymentMain;