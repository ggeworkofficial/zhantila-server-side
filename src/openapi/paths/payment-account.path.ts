import { createPaymentAccountResponse, getPaymentAccountResponse, getPaymentAccountsResponse, updatePaymentAccountResponse, deletePaymentAccountResponse } from "../../response/payment-account.response";
import { createPaymentAccountSchema, getPaymentAccountSchema, getPaymentAccountsSchema, updatePaymentAccountSchema } from "../../validators/payment-account.validator";
import { errorResponse } from "../../response/error.response";

export const paymentAccountPaths = {
    "/payment-accounts": {
        post: {
            summary: "Create a payment account",
            requestBody: {
                content: { "application/json": { schema: createPaymentAccountSchema } }
            },
            responses: {
                "201": { description: "Payment account created", content: { "application/json": { schema: createPaymentAccountResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        },
        get: {
            summary: "Get all payment accounts",
            requestParams: { query: getPaymentAccountsSchema },
            responses: {
                "200": { description: "Payment accounts returned", content: { "application/json": { schema: getPaymentAccountsResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
    "/payment-accounts/{id}": {
        get: {
            summary: "Get one payment account",
            requestParams: { path: getPaymentAccountSchema },
            responses: {
                "200": { description: "Payment account returned", content: { "application/json": { schema: getPaymentAccountResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "404": { description: "Payment account not found", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        },
        put: {
            summary: "Update a payment account",
            requestParams: { path: getPaymentAccountSchema },
            requestBody: {
                content: { "application/json": { schema: updatePaymentAccountSchema } }
            },
            responses: {
                "200": { description: "Payment account updated", content: { "application/json": { schema: updatePaymentAccountResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "404": { description: "Payment account not found", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        },
        delete: {
            summary: "Delete a payment account",
            requestParams: { path: getPaymentAccountSchema },
            responses: {
                "200": { description: "Payment account deleted", content: { "application/json": { schema: deletePaymentAccountResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "404": { description: "Payment account not found", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
}