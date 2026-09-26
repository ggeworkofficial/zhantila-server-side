import z from "zod";
import { requestWithdrawalResponse, getMyWithdrawalsResponse, getWithdrawalsResponse, processWithdrawalResponse } from "../../response/withdrawal.response";
import { errorResponse } from "../../response/error.response";

const requestWithdrawalBodySchema = z.object({
    amount: z.coerce.number().positive(),
    method: z.string(),
    account_name: z.string(),
    account_number: z.string(),
    note: z.string().optional()
});

const processWithdrawalBodySchema = z.object({
    status: z.enum(['approved', 'rejected']),
    note: z.string().optional()
});

const pageQuerySchema = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    status: z.enum(['pending', 'approved', 'rejected']).optional()
});

const withdrawalIdParamsSchema = z.object({
    id: z.string().uuid()
});

export const withdrawalPaths = {
    "/withdrawals": {
        post: {
            summary: "Request a withdrawal",
            requestBody: {
                content: { "application/json": { schema: requestWithdrawalBodySchema } }
            },
            responses: {
                "201": { description: "Withdrawal requested", content: { "application/json": { schema: requestWithdrawalResponse } } },
                "400": { description: "Invalid request or insufficient balance", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "409": { description: "Pending withdrawal exists", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        },
        get: {
            summary: "Get all withdrawals (admin)",
            requestParams: { query: pageQuerySchema },
            responses: {
                "200": { description: "Withdrawals returned", content: { "application/json": { schema: getWithdrawalsResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
    "/withdrawals/my": {
        get: {
            summary: "Get my withdrawals",
            requestParams: {
                query: z.object({
                    page: z.coerce.number().min(1).optional(),
                    limit: z.coerce.number().min(1).max(100).optional()
                })
            },
            responses: {
                "200": { description: "My withdrawals returned", content: { "application/json": { schema: getMyWithdrawalsResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
    "/withdrawals/{id}": {
        put: {
            summary: "Process a withdrawal (admin)",
            requestParams: { path: withdrawalIdParamsSchema },
            requestBody: {
                content: { "application/json": { schema: processWithdrawalBodySchema } }
            },
            responses: {
                "200": { description: "Withdrawal processed", content: { "application/json": { schema: processWithdrawalResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "404": { description: "Withdrawal not found", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
}