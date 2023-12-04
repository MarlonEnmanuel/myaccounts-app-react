import { PaymentType } from "./PaymentType";

export interface CardAuthDto {
    id: number,
    name: string,
    personName: string,
    type: PaymentType,
    typeName: string,
};