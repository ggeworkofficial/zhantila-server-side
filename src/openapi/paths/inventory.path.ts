import { createProductResponse, getProductResponse, getInventoryResponse, updateProductResponse, removeProductResponse } from "../../response/inventory.response";
import { createProductSchema, getProductSchema, getInventorySchema, updateProductSchema } from "../../validators/inventory.validator";
import { errorResponse } from "../../response/error.response";

export const inventoryPaths = {
    "/inventory": {
        post: {
            summary: "Create a product (multipart with images)",
            requestBody: {
                content: {
                    "multipart/form-data": { schema: createProductSchema }
                }
            },
            responses: {
                "201": { description: "Product created", content: { "application/json": { schema: createProductResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        },
        get: {
            summary: "Get all products",
            requestParams: { query: getInventorySchema },
            responses: {
                "200": { description: "Products returned", content: { "application/json": { schema: getInventoryResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
    "/inventory/{id}": {
        get: {
            summary: "Get one product",
            requestParams: { path: getProductSchema },
            responses: {
                "200": { description: "Product returned", content: { "application/json": { schema: getProductResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "404": { description: "Product not found", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        },
        put: {
            summary: "Update a product",
            requestParams: { path: getProductSchema },
            requestBody: {
                content: { "application/json": { schema: updateProductSchema } }
            },
            responses: {
                "200": { description: "Product updated", content: { "application/json": { schema: updateProductResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "404": { description: "Product not found", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        },
        delete: {
            summary: "Delete a product",
            requestParams: { path: getProductSchema },
            responses: {
                "200": { description: "Product removed", content: { "application/json": { schema: removeProductResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "404": { description: "Product not found", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
}