import { Button, Checkbox, FormControlLabel, FormGroup, Grid, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { InputRadio, InputSelect, InputText, InputTextNumber } from "../../../shared/inputs";
import { SavePaymentSplitDto, PaymentDto, PaymentType } from "../../../api";
import { usePaymentForm } from "./usePaymentForm";
import React, { Fragment } from "react";
import { Bookmark as BookmarkIcon, Delete as DeleteIcon, PersonAdd as PersonAddIcon } from "@mui/icons-material";

export interface PaymentFormProps {
    initialDto?: PaymentDto,
    onSave?: (response:PaymentDto) => void,
    onFinish?: () => void,
};

const PaymentForm:React.FC<PaymentFormProps> = (props) => {

    const { inputHandler, catalogs, ...ctrl } = usePaymentForm(props);

    const inputs = {
        cardId: inputHandler.getNumber("cardId"),
        type: inputHandler.getNumber("type"),
        date: inputHandler.getString("date"),
        detail: inputHandler.getString("detail"),
        comment: inputHandler.getString("comment"),
        creditFees: inputHandler.getNumber("creditFees"),
        creditAmount: inputHandler.getNumber("creditAmount"),
    };

    const splitForms = inputHandler.getArrayHandler<SavePaymentSplitDto>("paymentSplits")
                                    .map(handler => ({
                                        personId: handler.getNumber("personId"),
                                        amount: handler.getNumber("amount"),
                                    }))

    return (
        <Grid container columnSpacing={2} rowSpacing={3} component="form" autoComplete="off">
            <Grid item xs={6}>
                <InputRadio state={inputs.type} options={catalogs.types} label="Tipo" required />
            </Grid>
            <Grid item xs={6}>
                <DatePicker label="Fecha de compra" sx={{width: '100%'}} />
            </Grid>
            <Grid item xs={12}>
                <InputSelect state={inputs.cardId} options={catalogs.cards} label="Tarjeta" required />
            </Grid>
            <Grid item xs={12}>
                <InputText state={inputs.detail} label="Detalle" required />
            </Grid>
            {inputs.type.value === PaymentType.credit &&
                <>
                    <Grid item xs={6}>
                        <InputTextNumber state={inputs.creditAmount} label="Monto" required min={0} />
                    </Grid>
                    <Grid item xs={6}>
                        <InputTextNumber state={inputs.creditFees} label="Cuotas" isDecimal required min={0} />
                    </Grid>
                </>
            }
            <Grid item xs={10}>
                <Typography>
                    <BookmarkIcon sx={{verticalAlign: 'sub'}}/> DISTRIBUCIÓN DE MONTOS
                </Typography>
            </Grid>
            <Grid item xs={2} textAlign="right">
                <Button fullWidth variant="outlined" onClick={ctrl.addSplit}>
                    <PersonAddIcon />
                </Button>
            </Grid>
            {splitForms.map((split, index) =>
                <Fragment key={index}>
                    <Grid item xs={5}>
                        <InputSelect state={split.personId} options={catalogs.persons} label="Corresponde a" required />
                    </Grid>
                    <Grid item xs={5}>
                        <InputTextNumber state={split.amount} label="Monto" isDecimal required min={0} />
                    </Grid>
                    <Grid item xs={2}>
                        <Button fullWidth variant="outlined" sx={{height: '4em'}} onClick={ctrl.removeSplit.bind(null, index)}>
                            <DeleteIcon/>
                        </Button>
                    </Grid>
                </Fragment>
            )}
            <Grid item xs={6}>
                <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="Seguir registrando" />
                </FormGroup>
            </Grid>
            <Grid item xs={6} alignSelf={"center"}>
                <Typography>
                    Total: S/. {ctrl.totalAmount}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Button fullWidth variant="outlined" size="large" onClick={props.onFinish}>REGRESAR</Button>
            </Grid>
            <Grid item xs={6}>
                <Button fullWidth variant="contained" color="primary" size="large" onClick={ctrl.handleSubmit}>GUARDAR</Button>
            </Grid>
        </Grid>
    );
};

export default PaymentForm;