import { PaymentType } from "./PaymentType";

export interface InputPaymentDto 
{
    id: number;
    cardId: number;
    type: PaymentType;
    date: string;
    detail: string;
    comment: string;
    creditFees: number|null;
    creditAmount: number|null;
    caymentSplits: InputPaymentSplitDto[];
}

export interface InputPaymentSplitDto
{
    personId: number;
    amount: number;
}