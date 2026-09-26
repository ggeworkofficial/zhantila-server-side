import { z } from "zod";

const rawReceiptSchema = z.object({
    id: z.string(),
    order_id: z.string().optional(),
    amount: z.number(),
    payment_method: z.enum(['full', 'advance', 'cod']),
    account: z.string().optional(),
    file_url: z.string(),
    status: z.enum(['pending_review', 'approved', 'rejected']),
    note: z.string().optional(),
    created_at: z.date(),
    updated_at: z.date()
});

const receiptSchema = z.object({
    id: z.string(),
    amount: z.number(),
    payment_method: z.enum(['full', 'advance', 'cod']),
    account: z.string().optional(),
    file_name: z.string(),
    file_url: z.string(),
    status: z.enum(['pending_review', 'approved', 'rejected']),
    note: z.string().optional(),
    created_at: z.date(),
    updated_at: z.date(),
    order: z.object({
        id: z.string(),
        user: z.object({
            id: z.string(),
            full_name: z.string()
        })
    })
});

export const createReceiptResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    data: rawReceiptSchema
});

export const getReceiptResponse = receiptSchema;

export const getReceiptAnyResponse = getReceiptResponse.or(rawReceiptSchema);

export const getReceiptsResponse = z.object({
    data: z.array(receiptSchema),
    meta: z.object({
        page: z.number(),
        limit: z.number(),
        total: z.number()
    })
});

export const updateReceiptResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    data: receiptSchema
});

export type CreateReceiptResponse = z.infer<typeof createReceiptResponse>;
export type GetReceiptResponse = z.infer<typeof getReceiptAnyResponse>;
export type GetReceiptsResponse = z.infer<typeof getReceiptsResponse>;
export type UpdateReceiptResponse = z.infer<typeof updateReceiptResponse>;