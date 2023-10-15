import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import PaymentList from "./PaymentList";
import { API, PaymentDto } from "../../api";
import { useCallback, useEffect, useState } from "react";
import { Button, Dialog, DialogContent, Divider, Typography } from "@mui/material";
import PaymentForm from "./edit/PaymentForm";
import { useRequestControl } from "../../shared/useRequestControl";

const PaymentMain = () => {

    const [data, setData] = useState<PaymentDto[]>([]);
    const [openForm, setOpenForm] = useState(false);
    const { request, isLoading } = useRequestControl();

    const fetchData = useCallback(async (signal:AbortSignal) => {
        debugger;
        var resp = await API.payments.getList(signal);
        setData(resp);
    }, [setData]);

    const handleNewPayment = useCallback(() => {
        setOpenForm(true);
    }, [setOpenForm]);

    const handleSavePayment = useCallback((newPayment:PaymentDto) => {
        setData(prevData => {
            const index = prevData?.findIndex(dto => dto.id === newPayment.id);
            if (index >= 0) {
                return prevData.map((el, i) => i === index ? newPayment : el);
            } else {
                return [newPayment, ...prevData];
            }
        });
    }, [setData]);

    useEffect(() => {
        request(fetchData);
    }, [request, fetchData]);

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Box>
                <Button
                    variant="outlined"
                    onClick={handleNewPayment}
                >
                    NUEVO
                </Button>
            </Box>
            <PaymentList data={data} />
            <Dialog open={openForm} onClose={() => setOpenForm(false)}>
                <DialogContent>
                    <Typography variant="h5">
                        Registro de Pagos
                    </Typography>
                    <Divider sx={{mt: 2, mb: 4}}/>
                    <PaymentForm onSuccess={handleSavePayment} />
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default PaymentMain;