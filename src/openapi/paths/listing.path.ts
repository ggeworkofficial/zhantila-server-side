import z from "zod";
import { createListingResponse, getListingsResponse, getMyListingsResponse, getListingResponse, getListingByProductResponse, updateListingResponse, deleteListingResponse, moderateListingResponse } from "../../response/listing.response";
import { errorResponse } from "../../response/error.response";

const listingKindEnum = z.enum(['product', 'service', 'skill']);

const listingBaseSchema = z.object({
    kind: listingKindEnum,
    title: z.string(),
    description: z.string(),
    price: z.coerce.number().min(0),
    price_model: z.enum(['fixed', 'negotiable', 'auction', 'one_time', 'hourly', 'flat', 'subscription']).optional(),
    quantity: z.coerce.number().optional(),
    category_id: z.string().uuid().nullable().optional(),
    location: z.string().nullable().optional(),
    tags: z.union([z.string(), z.array(z.string())]).nullable().optional(),
    bulk_enabled: z.union([z.boolean(), z.string()]).optional(),
    bulk_only: z.union([z.boolean(), z.string()]).optional(),
    moq: z.coerce.number().optional(),
    tiers: z.union([z.string(), z.array(z.any())]).optional(),
    commission_enabled: z.union([z.boolean(), z.string()]).optional(),
    commission_percent: z.coerce.number().optional()
});

export const createListingSchema = listingBaseSchema;
export const updateListingSchema = listingBaseSchema.partial();

export const listListingsQuerySchema = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    kind: listingKindEnum.optional(),
    status: z.enum(['pending', 'published', 'flagged', 'banned', 'rejected']).optional(),
    search: z.string().optional(),
    category_id: z.string().uuid().optional(),
    user_id: z.string().uuid().optional(),
    seller_id: z.string().uuid().optional(),
    bulk: z.string().optional(),
    commission: z.string().optional(),
    sort: z.string().optional(),
    order: z.enum(['asc', 'desc']).optional()
});

export const getListingParamsSchema = z.object({
    id: z.string().uuid()
});

export const getListingByProductParamsSchema = z.object({
    productId: z.string().uuid()
});

export const moderateListingSchema = z.object({
    action: z.enum(['approve', 'flag', 'ban']),
    note: z.string().optional()
});

export const listingPaths = {
    "/listings": {
        post: {
            summary: "Create a listing (multipart with images)",
            requestBody: {
                content: { "multipart/form-data": { schema: createListingSchema } }
            },
            responses: {
                "201": { description: "Listing submitted for review", content: { "application/json": { schema: createListingResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        },
        get: {
            summary: "Get all listings",
            requestParams: { query: listListingsQuerySchema },
            responses: {
                "200": { description: "Listings returned", content: { "application/json": { schema: getListingsResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
    "/listings/my": {
        get: {
            summary: "Get my listings",
            requestParams: {
                query: z.object({
                    page: z.coerce.number().min(1).optional(),
                    limit: z.coerce.number().min(1).max(100).optional()
                })
            },
            responses: {
                "200": { description: "My listings returned", content: { "application/json": { schema: getMyListingsResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
    "/listings/by-product/{productId}": {
        get: {
            summary: "Get listing by product id",
            requestParams: { path: getListingByProductParamsSchema },
            responses: {
                "200": { description: "Listing returned", content: { "application/json": { schema: getListingByProductResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "404": { description: "Listing not found", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
    "/listings/{id}": {
        get: {
            summary: "Get one listing",
            requestParams: { path: getListingParamsSchema },
            responses: {
                "200": { description: "Listing returned", content: { "application/json": { schema: getListingResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "404": { description: "Listing not found", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        },
        put: {
            summary: "Update a listing (multipart with images)",
            requestParams: { path: getListingParamsSchema },
            requestBody: {
                content: { "multipart/form-data": { schema: updateListingSchema } }
            },
            responses: {
                "200": { description: "Listing updated and under review", content: { "application/json": { schema: updateListingResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "404": { description: "Listing not found", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        },
        delete: {
            summary: "Delete a listing",
            requestParams: { path: getListingParamsSchema },
            responses: {
                "200": { description: "Listing deleted", content: { "application/json": { schema: deleteListingResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "404": { description: "Listing not found", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
    "/listings/{id}/moderate": {
        put: {
            summary: "Moderate a listing (admin)",
            requestParams: { path: getListingParamsSchema },
            requestBody: {
                content: { "application/json": { schema: moderateListingSchema } }
            },
            responses: {
                "200": { description: "Listing moderated", content: { "application/json": { schema: moderateListingResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "404": { description: "Listing not found", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
}