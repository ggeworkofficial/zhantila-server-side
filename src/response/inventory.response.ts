import { z } from "zod";

const productCreateSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable().optional(),
    price: z.number(),
    quality_label: z.enum(['high', 'medium', 'low']),
    quantity: z.number(),
    verified: z.boolean(),
    category_id: z.string(),
    seller_id: z.string(),
    location: z.string().nullable().optional(),
    created_at: z.date(),
    updated_at: z.date()
});

const productResultSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    price: z.number(),
    quality_label: z.enum(['high', 'medium', 'low']),
    quantity: z.number(),
    verified: z.boolean(),
    images: z.array(z.string()),
    category: z.object({
        id: z.string(),
        name: z.string()
    }),
    seller: z.object({
        id: z.string(),
        name: z.string().optional()
    }),
    location: z.string().optional(),
    rating: z.number(),
    reviewCount: z.number(),
    created_at: z.date(),
    updated_at: z.date()
});

export const createProductResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    data: productCreateSchema
});

export const getProductResponse = productResultSchema;

export const getInventoryResponse = z.object({
    data: z.array(productResultSchema),
    meta: z.object({
        page: z.number(),
        limit: z.number(),
        total: z.number()
    })
});

export const updateProductResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    data: productResultSchema
});

export const updateProductAnyResponse = updateProductResponse.or(
    z.object({
        message: z.string()
    })
);

export const removeProductResponse = z.object({
    success: z.boolean(),
    message: z.string(),
});

export const removeProductAnyResponse = removeProductResponse.or(
    z.object({
        message: z.string()
    })
);

export type CreateProductResponse = z.infer<typeof createProductResponse>;
export type GetProductResponse = z.infer<typeof getProductResponse>;
export type GetInventoryResponse = z.infer<typeof getInventoryResponse>;
export type UpdateProductResponse = z.infer<typeof updateProductAnyResponse>;
export type RemoveProductResponse = z.infer<typeof removeProductAnyResponse>;