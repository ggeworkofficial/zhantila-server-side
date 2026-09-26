import { z } from "zod";

const paymentAccountSchema = z.object({
    id: z.string(),
    type: z.string(),
    label: z.string(),
    account_name: z.string(),
    account_number: z.string(),
    details: z.string().nullable().optional(),
    created_at: z.date(),
    updated_at: z.date()
});

export const createPaymentAccountResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    data: paymentAccountSchema
});

export const getPaymentAccountResponse = paymentAccountSchema;

export const getPaymentAccountsResponse = z.object({
    data: z.array(paymentAccountSchema),
    meta: z.object({
        page: z.number(),
        limit: z.number(),
        total: z.number()
    })
});

export const updatePaymentAccountResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    data: paymentAccountSchema
});

export const deletePaymentAccountResponse = z.object({
    success: z.boolean(),
    message: z.string(),
});

export type CreatePaymentAccountResponse = z.infer<typeof createPaymentAccountResponse>;
export type GetPaymentAccountResponse = z.infer<typeof getPaymentAccountResponse>;
export type GetPaymentAccountsResponse = z.infer<typeof getPaymentAccountsResponse>;
export type UpdatePaymentAccountResponse = z.infer<typeof updatePaymentAccountResponse>;
export type DeletePaymentAccountResponse = z.infer<typeof deletePaymentAccountResponse>;