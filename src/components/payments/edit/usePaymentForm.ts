import { useEffect } from "react";
import { API, SavePaymentDto, PaymentType } from "../../../api";
import { useGlobalDataContext } from "../../../context";
import { PaymentFormProps } from "./PaymentForm";
import { useApiSubmit } from "../../../shared/useApiRequest";
import { useForm } from "../../../shared/inputs";

export const usePaymentForm = (props:PaymentFormProps) => {

    const { initialDto, onSave, onFinish } = props;

    const submitCtrl = useApiSubmit(API.payments.createOrUpdate);
    const globalData = useGlobalDataContext();

    const { inputs, setInputs, setErrors, isValid, inputHandler } = useForm<SavePaymentDto>({
        id: initialDto?.id ?? 0,
        cardId: initialDto?.cardId ?? 0,
        type: initialDto?.type ?? PaymentType.debit,
        date: initialDto?.date ?? "",
        detail: initialDto?.detail ?? "",
        comment: initialDto?.comment ?? "",
        creditFees: initialDto?.creditFees ?? 0,
        creditAmount: initialDto?.creditAmount ?? 0,
        paymentSplits: initialDto?.paymentSplits ?? [{ personId: globalData.user.personId, amount: 0 }],
    });

    const totalAmount = inputs.paymentSplits.map(s => s.amount).reduce((pv, cv) => pv + cv, 0);

    const catalogs = {
        cards: globalData.cards.filter(c => c.type === inputs.type)
                                .map(c => ({ id: c.id, name: c.name })),

        types: [{ id: PaymentType.debit, name: 'Débito' },
                { id: PaymentType.credit, name: 'Crédito' }],

        persons: globalData.persons.map(p => ({ id: p.id, name: p.name})),
    };

    const addSplit = () => {
        setInputs(old => {
            var newsplits = [...old.paymentSplits, {personId: 0, amount: 0}];
            return { ...old, paymentSplits: newsplits };
        });
    };

    const removeSplit = (index:number) => {
        setInputs(old => {
            var newsplits = old.paymentSplits.filter((v, i) => i !== index);
            return { ...old, paymentSplits: newsplits };
        });
    };

    const handleSubmit = async () => {
        if (!isValid()) return;
        const data = getInputPaymentDto(inputs);
        submitCtrl.submit(data);
    };

    // execute callbacks before save
    useEffect(() => {
        if (!submitCtrl.result) return;
        if (onSave) onSave(submitCtrl.result);
        if (onFinish) onFinish();
    }, [submitCtrl.result, onSave, onFinish]);

    // set cardId on change type
    useEffect(() => {
        setInputs(old => {
            return {...old, cardId: 0};
        });
    }, [setInputs, inputs.type]);

    // set form errors on submit error
    const responseInputErrors = submitCtrl?.error?.fields;
    useEffect(() => {
        if (responseInputErrors) {
            setErrors(responseInputErrors);
        }
    }, [responseInputErrors, setErrors]);

    return {
        inputHandler,
        totalAmount,
        catalogs,
        error: submitCtrl.error,
        isLoading: submitCtrl.isLoading,
        addSplit,
        removeSplit,
        handleSubmit,
    };
};

const getInputPaymentDto = (inputs:SavePaymentDto):SavePaymentDto => {
    return {
        id: inputs.id,
        cardId: inputs.cardId,
        type: inputs.type,
        date: inputs.date,
        detail: inputs.detail,
        comment: '',
        paymentSplits: inputs.paymentSplits,
        ...(
            inputs.type === PaymentType.credit ? {
                creditAmount: inputs.creditAmount,
                creditFees: inputs.creditFees,
            } : {}
        ),
    };
};