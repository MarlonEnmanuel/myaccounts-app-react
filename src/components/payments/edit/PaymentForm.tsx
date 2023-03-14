import { Box, FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { PaymentType } from "../../../api/models/PaymentType";
import { useInitialDataContext } from "../../../context/InitialDataContext";
import { MoneyNumberConfig, NaturalNumberConfig } from "../../../shared/InputConfigs";
import usePaymentForm from "./usePaymentForm";

const PaymentForm = () => {

    const { initialData } = useInitialDataContext();
    const { inputs } = usePaymentForm();

    const cardOptions = initialData.cards.filter(c => c.type === inputs.type.value);

    return (
        <Box component="form" autoComplete="off">
            <DatePicker label="Fecha de compra" {...inputs.date} />
            <br/><br/>
            <FormControl>
                <RadioGroup row {...inputs.type} >
                    <FormControlLabel value={PaymentType.debit} control={<Radio />} label="Débito" />
                    <FormControlLabel value={PaymentType.credit} control={<Radio />} label="Crédito" />
                </RadioGroup>
            </FormControl>
            <br/><br/>
            <FormControl fullWidth>
                <InputLabel>Tarjeta</InputLabel>
                <Select<number> label="Tarjeta" {...inputs.cardId} >
                    <MenuItem value={0} disabled>Seleccione</MenuItem>
                    {cardOptions.map(card => 
                        <MenuItem value={card.id} key={card.id}>{card.name}</MenuItem>
                    )}
                </Select>
            </FormControl>
            <br/><br/>
            <TextField label="Detalle" fullWidth {...inputs.detail} />
            <br/><br/>
            <TextField label="Comentario" fullWidth {...inputs.comment} />
            <br/><br/>
            {inputs.type.value === PaymentType.credit &&
            <>
                <TextField label="Monto" {...inputs.creditAmount} {...NaturalNumberConfig} />
                <TextField label="Cuotas" {...inputs.creditFees} {...MoneyNumberConfig} />
            </>
            }
        </Box>
    );
};

export default PaymentForm;