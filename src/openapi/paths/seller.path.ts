import { createSellerResponse, getOneSellerResponse, getAllSellersResponse, updateSellerResponse, deleteSellerResponse } from "../../response/seller.response";
import { createSellerScehma, getOneSellerSchema, getAllSellersSchema, updateSellerSchema } from "../../validators/seller.validator";
import { errorResponse } from "../../response/error.response";

export const sellerPaths = {
    "/sellers": {
        post: {
            summary: "Create a seller",
            requestBody: {
                content: { "application/json": { schema: createSellerScehma } }
            },
            responses: {
                "201": { description: "Seller created", content: { "application/json": { schema: createSellerResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        },
        get: {
            summary: "Get all sellers",
            requestParams: { query: getAllSellersSchema },
            responses: {
                "200": { description: "Sellers returned", content: { "application/json": { schema: getAllSellersResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
    "/sellers/{id}": {
        get: {
            summary: "Get one seller",
            requestParams: { path: getOneSellerSchema },
            responses: {
                "200": { description: "Seller returned", content: { "application/json": { schema: getOneSellerResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "404": { description: "Seller not found", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        },
        put: {
            summary: "Update a seller",
            requestParams: { path: getOneSellerSchema },
            requestBody: {
                content: { "application/json": { schema: updateSellerSchema } }
            },
            responses: {
                "200": { description: "Seller updated", content: { "application/json": { schema: updateSellerResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "404": { description: "Seller not found", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        },
        delete: {
            summary: "Delete a seller",
            requestParams: { path: getOneSellerSchema },
            responses: {
                "200": { description: "Seller removed", content: { "application/json": { schema: deleteSellerResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "404": { description: "Seller not found", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
}