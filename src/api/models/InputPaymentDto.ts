import { PaymentType } from "./PaymentType";

export interface InputPaymentDto 
{
    Id: number;
    CardId: number;
    Type: PaymentType;
    Date: string;
    Detail: string;
    Comment: string;
    CreditFees: number|null;
    CreditAmount: number|null;
    PaymentSplits: InputPaymentSplitDto[];
}

export interface InputPaymentSplitDto
{
    PersonId: number;
    Amount: number;
}