import { PaymentType } from "./PaymentType";

export interface SavePaymentDto 
{
    id: number;
    date: string;
    type: PaymentType;
    cardId: number;
    detail: string;
    comment: string;
    creditFees?: number;
    creditAmount?: number;
    paymentSplits: SavePaymentSplitDto[];
}

export interface SavePaymentSplitDto
{
    personId: number;
    amount: number;
}