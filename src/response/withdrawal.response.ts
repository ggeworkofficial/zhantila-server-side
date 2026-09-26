import { z } from "zod";

const withdrawalSchema = z.object({
    id: z.string(),
    user_id: z.string(),
    amount: z.number(),
    method: z.enum(['bank', 'telebirr', 'cbe_birr']),
    account_name: z.string(),
    account_number: z.string(),
    note: z.string().nullable().optional(),
    status: z.enum(['pending', 'approved', 'rejected', 'paid']),
    processed_by: z.string().nullable().optional(),
    processed_at: z.date().nullable().optional(),
    created_at: z.date(),
    updated_at: z.date()
});

const withdrawalWithUserSchema = withdrawalSchema.extend({
    user: z.object({
        id: z.string(),
        full_name: z.string(),
        email: z.string()
    }).optional()
});

export const requestWithdrawalResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    data: withdrawalSchema
});

export const getMyWithdrawalsResponse = z.object({
    data: z.array(withdrawalSchema),
    meta: z.object({
        page: z.number(),
        limit: z.number(),
        total: z.number()
    })
});

export const getWithdrawalsResponse = z.object({
    data: z.array(withdrawalWithUserSchema),
    meta: z.object({
        page: z.number(),
        limit: z.number(),
        total: z.number()
    })
});

export const processWithdrawalResponse = z.object({
    success: z.boolean(),
    message: z.string(),
});

export type RequestWithdrawalResponse = z.infer<typeof requestWithdrawalResponse>;
export type GetMyWithdrawalsResponse = z.infer<typeof getMyWithdrawalsResponse>;
export type GetWithdrawalsResponse = z.infer<typeof getWithdrawalsResponse>;
export type ProcessWithdrawalResponse = z.infer<typeof processWithdrawalResponse>;