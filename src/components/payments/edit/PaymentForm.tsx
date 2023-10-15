import { Button, Chip, FormControl, FormHelperText, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Controller, SubmitErrorHandler, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { PaymentFormSchema, PaymentFormSchemaType } from "./validationSheme";
import { zodResolver } from '@hookform/resolvers/zod';
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { API, PaymentDto, PaymentType } from "../../../api";
import { Fragment, useCallback } from "react";
import { Bookmark, Delete, PersonAdd } from "@mui/icons-material";
import { useGlobalDataContext } from "../../../context";
import { useRequestControl } from "../../../shared/useRequestControl";

interface PaymentFormProps {
    onSuccess: (dto:PaymentDto) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSuccess }) => {

    const { loguedUser, cards, persons } = useGlobalDataContext();
    const { request, isLoading } = useRequestControl();

    const { control, handleSubmit, register, watch, formState: { errors, isSubmitting } } = useForm<PaymentFormSchemaType>({
        resolver: zodResolver(PaymentFormSchema),
        defaultValues: {
            date: dayjs(),
            paymentSplits: [{ personId: loguedUser?.personId, amount: 0 }],
        },
    });

    const paymentSplits = useFieldArray({ control, name: 'paymentSplits' });

    const currentType = cards.find(c => c.id === watch('cardId'))?.type;
    const currentTotal = watch('paymentSplits')
                            .map(s => parseFloat(s.amount.toString()))
                            .filter(s => !isNaN(s))
                            .reduce((a, b) => a + b, 0);

    const submitHandler: SubmitHandler<PaymentFormSchemaType> = useCallback((data) => {
        const submit = async (signal:AbortSignal) => {
            const dto = {
                id: 0,
                ...data,
                type: currentType ?? PaymentType.debit,
                date: data.date.format('YYYY-MM-DD'),
            };
            const resp = await API.payments.createOrUpdate(dto, signal);
            onSuccess(resp);
        };
        request(submit);
    }, [currentType, onSuccess, request]);

    const submitErrorHandler: SubmitErrorHandler<PaymentFormSchemaType> = useCallback((errors) => {
        console.log("Error de formulario", errors);
    }, []);

    const formDisabled = isSubmitting || isLoading;

    return (
        <div className="PaymentForm">
            <Grid
                container
                columnSpacing={2}
                rowSpacing={3}
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(submitHandler, submitErrorHandler)}
            >
                <Grid item xs={12}>
                    <Controller
                        control={control}
                        name="date"
                        render={({ field }) => 
                            <DatePicker {...field} label="Fecha de compra" sx={{width: '100%'}} disabled={formDisabled}/>
                        }
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        control={control}
                        name="cardId"
                        render={({field, fieldState}) =>
                            <FormControl fullWidth error={fieldState.invalid}>
                                <InputLabel required>Tarjeta usada</InputLabel>
                                <Select<number> 
                                    {...field}
                                    value={field.value ?? 0}
                                    label="Tarjeta usada"
                                    disabled={formDisabled}
                                >
                                    <MenuItem value={0} disabled>Seleccione</MenuItem>
                                    {cards.map(c => 
                                        <MenuItem key={c.id} value={c.id}>
                                            <Chip label={c.isDebit ? 'Débito' : 'Crédito'} size="small"/>
                                            &nbsp;{c.name}
                                        </MenuItem>
                                    )}
                                </Select>
                                <FormHelperText>{fieldState.error?.message}</FormHelperText>
                            </FormControl>
                        }
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Detalle de la compra"
                        required
                        fullWidth
                        error={!!errors['detail']}
                        helperText={errors['detail']?.message}
                        disabled={formDisabled}
                        {...register('detail')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Comentarios"
                        required
                        fullWidth
                        error={!!errors['comment']}
                        helperText={errors['comment']?.message}
                        disabled={formDisabled}
                        {...register('comment')}
                    />
                </Grid>
                {currentType === PaymentType.credit &&
                <>
                    <Grid item xs={12}>
                        <TextField
                            label="Número de cuotas"
                            required
                            fullWidth
                            error={!!errors['creditFees']}
                            helperText={errors['creditFees']?.message}
                            disabled={formDisabled}
                            {...register('creditFees')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Monto de la cuota"
                            required
                            fullWidth
                            error={!!errors['creditAmount']}
                            helperText={errors['creditAmount']?.message}
                            disabled={formDisabled}
                            InputProps={{
                                startAdornment: (<InputAdornment position="start">S/.</InputAdornment>),
                                inputMode: 'decimal',
                            }}
                            {...register('creditAmount')}
                        />
                    </Grid>
                </>
                }
                <Grid item xs={10}>
                    <Typography>
                        <Bookmark sx={{verticalAlign: 'sub'}}/> DISTRIBUCIÓN DEL PAGO
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => paymentSplits.append({personId: undefined!, amount: 0})}
                        disabled={formDisabled || paymentSplits.fields.length >= persons.length}
                    >
                        <PersonAdd />
                    </Button>
                </Grid>
                {paymentSplits.fields.map((split, index) =>
                    <Fragment key={split.id}>
                        <Grid item xs={5}>
                            <Controller
                                control={control}
                                name={`paymentSplits.${index}.personId`}
                                render={({field, fieldState}) =>
                                    <FormControl fullWidth error={fieldState.invalid}>
                                        <InputLabel required>Persona</InputLabel>
                                        <Select<number>
                                            {...field}
                                            value={field.value ?? 0}
                                            label="Persona"
                                            disabled={formDisabled}
                                        >
                                            <MenuItem value={0} disabled>Seleccione</MenuItem>
                                            {persons.map(p => 
                                                <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
                                            )}
                                        </Select>
                                        <FormHelperText>{fieldState.error?.message}</FormHelperText>
                                    </FormControl>
                                }
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                label="Monto"
                                required
                                fullWidth
                                error={!!errors['paymentSplits']}
                                helperText={errors['paymentSplits'] && errors['paymentSplits'][index]?.amount?.message}
                                InputProps={{
                                    startAdornment: (<InputAdornment position="start">S/.</InputAdornment>),
                                }}
                                disabled={formDisabled}
                                {...register(`paymentSplits.${index}.amount`)}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Button
                                fullWidth
                                variant="text"
                                sx={{height: '4em'}}
                                onClick={() => paymentSplits.remove(index)}
                                disabled={formDisabled || index === 0}
                            >
                                <Delete />
                            </Button>
                        </Grid>
                    </Fragment>
                )}
                <Grid item xs={5}>

                </Grid>
                <Grid item xs={5}>
                    <Typography><b>Total S/. { currentTotal }</b></Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        GUARDAR
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default PaymentForm;