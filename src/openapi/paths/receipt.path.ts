import { createReceiptResponse, getReceiptAnyResponse, getReceiptsResponse, updateReceiptResponse } from "../../response/receipt.response";
import { createReceiptSchema, getReceiptSchema, getReceiptsSchema, updateReceiptSchema } from "../../validators/receipt.validator";
import { errorResponse } from "../../response/error.response";

export const receiptPaths = {
    "/receipts": {
        post: {
            summary: "Create a receipt (multipart with proof image)",
            requestBody: {
                content: { "multipart/form-data": { schema: createReceiptSchema } }
            },
            responses: {
                "201": { description: "Receipt created", content: { "application/json": { schema: createReceiptResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "409": { description: "Conflict", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        },
        get: {
            summary: "Get all receipts",
            requestParams: { query: getReceiptsSchema },
            responses: {
                "200": { description: "Receipts returned", content: { "application/json": { schema: getReceiptsResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
    "/receipts/{id}": {
        get: {
            summary: "Get one receipt",
            requestParams: { path: getReceiptSchema },
            responses: {
                "200": { description: "Receipt returned", content: { "application/json": { schema: getReceiptAnyResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "404": { description: "Receipt not found", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        },
        put: {
            summary: "Update a receipt",
            requestParams: { path: getReceiptSchema },
            requestBody: {
                content: { "application/json": { schema: updateReceiptSchema } }
            },
            responses: {
                "200": { description: "Receipt updated", content: { "application/json": { schema: updateReceiptResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "404": { description: "Receipt not found", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
}