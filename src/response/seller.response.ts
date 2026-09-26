import { z } from "zod";

const sellerCreateSchema = z.object({
    id: z.string(),
    user_id: z.string().nullable().optional(),
    name: z.string().nullable().optional(),
    location: z.string().nullable().optional(),
    contact: z.string().nullable().optional(),
    verified: z.boolean(),
    created_at: z.date(),
    updated_at: z.date()
});

const sellerSchema = z.object({
    id: z.string(),
    name: z.string().optional(),
    location: z.string().optional(),
    contact: z.string().optional(),
    products: z.number().optional(),
    verified: z.boolean(),
    created_at: z.date(),
    updated_at: z.date(),
    user: z.object({
        id: z.string().optional(),
        name: z.string().optional()
    }).nullable()
});

export const createSellerResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    data: sellerCreateSchema
});

export const getOneSellerResponse = sellerSchema;

export const getAllSellersResponse = z.object({
    data: z.array(sellerSchema),
    meta: z.object({
        page: z.number(),
        limit: z.number(),
        total: z.number()
    })
});

export const updateSellerResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    data: sellerCreateSchema
});

export const deleteSellerResponse = z.object({
    success: z.boolean(),
    message: z.string(),
});

export type CreateSellerResponse = z.infer<typeof createSellerResponse>;
export type GetOneSellerResponse = z.infer<typeof getOneSellerResponse>;
export type GetAllSellersResponse = z.infer<typeof getAllSellersResponse>;
export type UpdateSellerResponse = z.infer<typeof updateSellerResponse>;
export type DeleteSellerResponse = z.infer<typeof deleteSellerResponse>;