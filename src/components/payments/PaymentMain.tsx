import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import API from "../../api/API";
import { PaymentDto } from "../../api/models/PaymentDto";
import { useSignalEffect } from "../../shared/useSignalEffect";
import PaymentEdit from "./PaymentEdit";
import PaymentList from "./PaymentList";

const PaymentMain = () => {

    const [list, setList] = useState<PaymentDto[]|null>(null);

    const getList = async (signal:AbortSignal) => {
        try {
            var data = await API.payments.getList(signal);
            setList(data);
        } catch (ex) {
        }
    };

    useSignalEffect(signal => {
        getList(signal);
    }, []);

    if (list === null) return (
        <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>
    );

    return (
        <Box>
            <PaymentList data={list}></PaymentList>
            <br/>
            <PaymentEdit />
        </Box>
    );
};

export default PaymentMain;