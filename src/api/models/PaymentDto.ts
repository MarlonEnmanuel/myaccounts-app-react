import { PaymentType } from "./PaymentType";

export interface PaymentDto
{
    Id: number;
    CardId: number;
    Type: PaymentType;
    Date: string;
    Detail: string;
    Comment: string;
    CreditFees: number|null;
    CreditAmount: number|null;
    Amount: number;
    PaymentSplits: PaymentSplitDto[];
    CreatedBy: number;
    UpdatedBy: number;
    CreatedDate: string;
    UpdatedDate: string;
}

export interface PaymentSplitDto
{
    PersonId: number;
    Amount: number;
}