import { z } from "zod";

const listingMediaSchema = z.object({
    id: z.string(),
    listing_id: z.string(),
    url: z.string(),
    file_name: z.string().optional(),
    kind: z.enum(['image', 'portfolio']),
    is_primary: z.boolean(),
    position: z.number(),
    created_at: z.date(),
    updated_at: z.date()
});

const listingPriceTierSchema = z.object({
    id: z.string(),
    listing_id: z.string(),
    min_qty: z.number(),
    unit_price: z.number(),
    created_at: z.date(),
    updated_at: z.date()
});

const listingBaseSchema = z.object({
    id: z.string(),
    user_id: z.string(),
    kind: z.enum(['product', 'service', 'skill']),
    title: z.string(),
    description: z.string(),
    price: z.number(),
    price_model: z.enum(['fixed', 'hourly', 'daily', 'project']),
    quantity: z.number(),
    category_id: z.string().nullable().optional(),
    location: z.string().nullable().optional(),
    tags: z.array(z.string()).nullable().optional(),
    status: z.enum(['under_review', 'published', 'flagged', 'banned']),
    moderation_note: z.string().nullable().optional(),
    reviewed_by: z.string().nullable().optional(),
    reviewed_at: z.date().nullable().optional(),
    product_id: z.string().nullable().optional(),
    bulk_enabled: z.boolean(),
    bulk_only: z.boolean(),
    moq: z.number(),
    commission_enabled: z.boolean(),
    commission_percent: z.number(),
    created_at: z.date(),
    updated_at: z.date()
});

const listingDetailSchema = listingBaseSchema.extend({
    media: z.array(listingMediaSchema).optional(),
    tiers: z.array(listingPriceTierSchema).optional(),
    owner: z.object({
        id: z.string(),
        full_name: z.string()
    }).optional()
});

const listingMyItemSchema = listingBaseSchema.extend({
    media: z.array(listingMediaSchema).optional(),
    tiers: z.array(listingPriceTierSchema).optional()
});

const listingByProductSchema = listingBaseSchema.extend({
    tiers: z.array(listingPriceTierSchema).optional()
});

export const createListingResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    data: listingDetailSchema.nullable()
});

export const getListingsResponse = z.object({
    data: z.array(listingDetailSchema),
    meta: z.object({
        page: z.number(),
        limit: z.number(),
        total: z.number()
    })
});

export const getMyListingsResponse = z.object({
    data: z.array(listingMyItemSchema),
    meta: z.object({
        page: z.number(),
        limit: z.number(),
        total: z.number()
    })
});

export const getListingResponse = z.object({
    data: listingDetailSchema
});

export const getListingByProductResponse = z.object({
    data: listingByProductSchema.nullable()
});

export const updateListingResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    data: listingDetailSchema.nullable()
});

export const deleteListingResponse = z.object({
    success: z.boolean(),
    message: z.string(),
});

export const moderateListingResponse = z.object({
    success: z.boolean(),
    message: z.string(),
});

export type CreateListingResponse = z.infer<typeof createListingResponse>;
export type GetListingsResponse = z.infer<typeof getListingsResponse>;
export type GetMyListingsResponse = z.infer<typeof getMyListingsResponse>;
export type GetListingResponse = z.infer<typeof getListingResponse>;
export type GetListingByProductResponse = z.infer<typeof getListingByProductResponse>;
export type UpdateListingResponse = z.infer<typeof updateListingResponse>;
export type DeleteListingResponse = z.infer<typeof deleteListingResponse>;
export type ModerateListingResponse = z.infer<typeof moderateListingResponse>;