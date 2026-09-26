import { z } from "zod";

const productImageCreateSchema = z.object({
    id: z.string(),
    product_id: z.string(),
    image_url: z.string(),
    is_primary: z.boolean().optional(),
    created_at: z.date(),
    updated_at: z.date()
});

const productImageSchema = z.object({
    id: z.string(),
    product_id: z.string(),
    image_url: z.string(),
    image_name: z.string(),
    is_primary: z.boolean().optional(),
    created_at: z.date(),
    updated_at: z.date()
});

export const createProductImageResponse = z.object({
    sucess: z.boolean(),
    message: z.string(),
    data: z.array(productImageCreateSchema)
});

export const getProductImageResponse = productImageSchema;

export const getProductImagesResponse = z.array(productImageSchema);

export const updateProductImageResponse = z.object({
    success: z.boolean(),
    message: z.string(),
});

export const deleteProductImageResponse = z.object({
    success: z.boolean(),
    message: z.string(),
});

export type CreateProductImageResponse = z.infer<typeof createProductImageResponse>;
export type GetProductImageResponse = z.infer<typeof getProductImageResponse>;
export type GetProductImagesResponse = z.infer<typeof getProductImagesResponse>;
export type UpdateProductImageResponse = z.infer<typeof updateProductImageResponse>;
export type DeleteProductImageResponse = z.infer<typeof deleteProductImageResponse>;