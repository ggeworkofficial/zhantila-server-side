import { createReviewAnyResponse, getReviewResponse, getAllReviewsResponse, updateReviewResponse, deleteReviewResponse } from "../../response/review.response";
import { createReviewSchema, getReviewSchema, getReviewsSchema, updateReviewSchema } from "../../validators/review.validator";
import { errorResponse } from "../../response/error.response";

export const reviewPaths = {
    "/reviews": {
        post: {
            summary: "Create a review",
            requestBody: {
                content: { "application/json": { schema: createReviewSchema } }
            },
            responses: {
                "201": { description: "Review created", content: { "application/json": { schema: createReviewAnyResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "409": { description: "Conflict", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        },
        get: {
            summary: "Get all reviews",
            requestParams: { query: getReviewsSchema },
            responses: {
                "200": { description: "Reviews returned", content: { "application/json": { schema: getAllReviewsResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
    "/reviews/{id}": {
        get: {
            summary: "Get one review",
            requestParams: { path: getReviewSchema },
            responses: {
                "200": { description: "Review returned", content: { "application/json": { schema: getReviewResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "404": { description: "Review not found", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        },
        put: {
            summary: "Update a review",
            requestParams: { path: getReviewSchema },
            requestBody: {
                content: { "application/json": { schema: updateReviewSchema } }
            },
            responses: {
                "200": { description: "Review updated", content: { "application/json": { schema: updateReviewResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "404": { description: "Review not found", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        },
        delete: {
            summary: "Delete a review",
            requestParams: { path: getReviewSchema },
            responses: {
                "200": { description: "Review deleted", content: { "application/json": { schema: deleteReviewResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "404": { description: "Review not found", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
}