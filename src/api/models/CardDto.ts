import { PaymentType } from "./PaymentType";

export interface CardDto {
    id: number,
    name: string,
    personId: number,
    type: PaymentType,
    cutDay?: number,
    paymentDay?: number,
    isDebit: boolean,
    isCredit: boolean,
};