import { Dayjs } from 'dayjs';
import { z } from 'zod';

const PaymentSplitFormSchema = z.object({
    personId: z.number(),
    amount: z.coerce.number().positive(),
});

export const PaymentFormSchema = z.object({
    date: z.custom<Dayjs>(),
    cardId: z.number(),
    detail: z.string(),
    comment: z.string(),
    creditFees: z.coerce.number().int().positive().optional(),
    creditAmount: z.coerce.number().positive().optional(),
    paymentSplits: z.array(PaymentSplitFormSchema).min(1),
});

export type PaymentFormSchemaType = z.TypeOf<typeof PaymentFormSchema>;