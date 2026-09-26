import { createProductImageResponse, getProductImageResponse, getProductImagesResponse, updateProductImageResponse, deleteProductImageResponse } from "../../response/product-image.response";
import { createProductImageSchema, getProductImageSchema, getProductImagesSchema, updateProductImageSchema } from "../../validators/product-image.validator";
import { errorResponse } from "../../response/error.response";

export const productImagePaths = {
    "/product-images": {
        post: {
            summary: "Upload a product image (multipart)",
            requestBody: {
                content: {
                    "multipart/form-data": { schema: createProductImageSchema }
                }
            },
            responses: {
                "200": { description: "Product image created", content: { "application/json": { schema: createProductImageResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        },
        get: {
            summary: "Get product images by product id",
            requestParams: { query: getProductImagesSchema },
            responses: {
                "200": { description: "Product images returned", content: { "application/json": { schema: getProductImagesResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
    "/product-images/{id}": {
        get: {
            summary: "Get one product image",
            requestParams: { path: getProductImageSchema },
            responses: {
                "200": { description: "Product image returned", content: { "application/json": { schema: getProductImageResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "404": { description: "Product image not found", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        },
        put: {
            summary: "Update a product image",
            requestParams: { path: getProductImageSchema },
            requestBody: {
                content: { "application/json": { schema: updateProductImageSchema } }
            },
            responses: {
                "200": { description: "Product image updated", content: { "application/json": { schema: updateProductImageResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "404": { description: "Product image not found", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        },
        delete: {
            summary: "Delete a product image",
            requestParams: { path: getProductImageSchema },
            responses: {
                "200": { description: "Product image deleted", content: { "application/json": { schema: deleteProductImageResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "404": { description: "Product image not found", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
}