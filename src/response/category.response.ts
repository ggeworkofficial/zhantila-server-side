import { z } from "zod";


const categorySchema = z.object({
    id: z.string(),
    name: z.string(),
    created_at: z.date(),
    updated_at: z.date()
})
export const createCategoryResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    data: categorySchema
});

export const getOneCategoryResponse = categorySchema;
export const getAllCategoryResponse = z.object({
    data: z.array(categorySchema),
    meta: z.object({
        page: z.number(),
        limit: z.number(),
        total: z.number()
    })
});

export const updateCategoryResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    data: categorySchema
});

export const deleteCategoryResponse = z.object({
    success: z.boolean(),
    message: z.string(),
});

export type CreateCategoryResponse = z.infer<typeof createCategoryResponse>;
export type GetOneCategoryResponse = z.infer<typeof getOneCategoryResponse>;
export type GetAllCategoryResponse = z.infer<typeof getAllCategoryResponse>;
export type UpdateCategoryResponse = z.infer<typeof updateCategoryResponse>;
export type DeleteCategoryResponse = z.infer<typeof deleteCategoryResponse>;