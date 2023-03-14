import { PaymentType } from "./PaymentType";

export interface PaymentDto
{
    id: number;
    cardId: number;
    type: PaymentType;
    date: string;
    detail: string;
    comment: string;
    creditFees?: number;
    creditAmount?: number;
    amount: number;
    paymentSplits: PaymentSplitDto[];
    createdBy: number;
    updatedBy: number;
    createdDate: string;
    updatedDate: string;
}

export interface PaymentSplitDto
{
    personId: number;
    amount: number;
}