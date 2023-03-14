import { InputPaymentDto } from "../../../api/models/InputPaymentDto";
import { useInputDate } from "../../../shared/form/useInputDate";
import { useInputNumber } from "../../../shared/form/useInputNumber";
import { useInputString } from "../../../shared/form/useInputString";

const usePaymentForm = () => {
    
    const cardId = useInputNumber<InputPaymentDto>('cardId');
    const type = useInputNumber<InputPaymentDto>('type');
    const date = useInputDate<InputPaymentDto>('date');
    const detail = useInputString<InputPaymentDto>('detail');
    const comment = useInputString<InputPaymentDto>('comment');
    const creditFees = useInputNumber<InputPaymentDto>('creditFees');
    const creditAmount = useInputString<InputPaymentDto>('creditAmount', {isNumeric: true});
    
    return {
        inputs: {
            cardId,
            type,
            date,
            detail,
            comment,
            creditFees,
            creditAmount,
        },
    };
};

export default usePaymentForm;