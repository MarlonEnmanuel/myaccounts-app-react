import { Dayjs } from "dayjs";
import { PaymentType } from "./PaymentType";

export interface SavePaymentDto 
{
    id: number;
    date: string|Dayjs;
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