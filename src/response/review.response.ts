import { z } from "zod";

const reviewSchema = z.object({
    id: z.string(),
    product: z.object({
        id: z.string(),
        name: z.string()
    }).optional(),
    user: z.object({
        id: z.string(),
        name: z.string()
    }).optional(),
    rating: z.number(),
    comment: z.string().optional(),
    created_at: z.date(),
    updated_at: z.date()
});

const reviewListItemSchema = z.object({
    id: z.string(),
    user: z.object({
        id: z.string(),
        name: z.string()
    }).optional(),
    rating: z.number(),
    comment: z.string().optional(),
    created_at: z.date(),
    updated_at: z.date()
});

export const createReviewResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    data: reviewSchema
});

export const createReviewAnyResponse = createReviewResponse.or(
    z.object({
        success: z.boolean(),
        message: z.string()
    })
);

export const getReviewResponse = reviewSchema;

export const getAllReviewsResponse = z.object({
    data: z.array(reviewListItemSchema),
    meta: z.object({
        page: z.number(),
        limit: z.number(),
        total: z.number()
    })
});

export const updateReviewResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    data: reviewSchema
});

export const deleteReviewResponse = z.object({
    success: z.boolean(),
    message: z.string(),
});

export type CreateReviewResponse = z.infer<typeof createReviewAnyResponse>;
export type GetReviewResponse = z.infer<typeof getReviewResponse>;
export type GetAllReviewsResponse = z.infer<typeof getAllReviewsResponse>;
export type UpdateReviewResponse = z.infer<typeof updateReviewResponse>;
export type DeleteReviewResponse = z.infer<typeof deleteReviewResponse>;