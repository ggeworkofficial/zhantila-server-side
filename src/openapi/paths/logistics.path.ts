import { createLogisticsResponse, getLogisticsResponse, getLogisticsListResponse, updateLogisticsResponse } from "../../response/logistics.response";
import { createLogisticsSchema, getLogisticsSchema, getLogisticsQuerySchema, updateLogisticsSchema } from "../../validators/logistics.validator";
import { errorResponse } from "../../response/error.response";

export const logisticsPaths = {
    "/logistics": {
        post: {
            summary: "Create logistics record",
            requestBody: {
                content: { "application/json": { schema: createLogisticsSchema } }
            },
            responses: {
                "201": { description: "Logistics created", content: { "application/json": { schema: createLogisticsResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "409": { description: "Conflict", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        },
        get: {
            summary: "Get all logistics records",
            requestParams: { query: getLogisticsQuerySchema },
            responses: {
                "200": { description: "Logistics records returned", content: { "application/json": { schema: getLogisticsListResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
    "/logistics/{id}": {
        get: {
            summary: "Get one logistics record",
            requestParams: { path: getLogisticsSchema },
            responses: {
                "200": { description: "Logistics returned", content: { "application/json": { schema: getLogisticsResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "404": { description: "Logistics not found", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        },
        put: {
            summary: "Update a logistics record",
            requestParams: { path: getLogisticsSchema },
            requestBody: {
                content: { "application/json": { schema: updateLogisticsSchema } }
            },
            responses: {
                "200": { description: "Logistics updated", content: { "application/json": { schema: updateLogisticsResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "404": { description: "Logistics not found", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
}