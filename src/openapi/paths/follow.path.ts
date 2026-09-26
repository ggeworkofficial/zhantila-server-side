import z from "zod";
import { getStateResponse, followResponse, unfollowResponse, getFollowingResponse, getFollowersResponse } from "../../response/follow.response";
import { errorResponse } from "../../response/error.response";

const sellerIdParamsSchema = z.object({
    sellerId: z.string().uuid()
});

const followBodySchema = z.object({
    seller_id: z.string().uuid()
});

const pageQuerySchema = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional()
});

export const followPaths = {
    "/follows/state/{sellerId}": {
        get: {
            summary: "Get follow state for a seller",
            requestParams: { path: sellerIdParamsSchema },
            responses: {
                "200": { description: "Follow state returned", content: { "application/json": { schema: getStateResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
    "/follows": {
        post: {
            summary: "Follow a seller",
            requestBody: {
                content: { "application/json": { schema: followBodySchema } }
            },
            responses: {
                "200": { description: "Seller followed", content: { "application/json": { schema: followResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "404": { description: "Seller not found", content: { "application/json": { schema: errorResponse } } },
                "409": { description: "Already following", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
    "/follows/following": {
        get: {
            summary: "Get sellers I follow",
            requestParams: { query: pageQuerySchema },
            responses: {
                "200": { description: "Following sellers returned", content: { "application/json": { schema: getFollowingResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
    "/follows/followers/{sellerId}": {
        get: {
            summary: "Get followers of a seller",
            requestParams: {
                path: sellerIdParamsSchema,
                query: pageQuerySchema
            },
            responses: {
                "200": { description: "Followers returned", content: { "application/json": { schema: getFollowersResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "404": { description: "Seller not found", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
    "/follows/{sellerId}": {
        delete: {
            summary: "Unfollow a seller",
            requestParams: { path: sellerIdParamsSchema },
            responses: {
                "200": { description: "Seller unfollowed", content: { "application/json": { schema: unfollowResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "404": { description: "Follow not found", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
}