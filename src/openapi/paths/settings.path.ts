import z from "zod";
import { createSettingsResponse, getSettingResponse, getSettingsResponse, updateSettingsResponse } from "../../response/settings.response";
import { errorResponse } from "../../response/error.response";

const settingsValueSchema = z.record(z.string(), z.any());

const createSettingsSchema = z.object({
    key: z.string(),
    value: settingsValueSchema,
    description: z.string().optional(),
    is_public: z.boolean().optional()
});

const updateSettingsSchema = z.object({
    key: z.string().optional(),
    value: settingsValueSchema.optional(),
    description: z.string().optional(),
    is_public: z.boolean().optional()
});

const getSettingsKeyParamsSchema = z.object({
    key: z.string()
});

const getSettingsQuerySchema = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
    order: z.enum(['asc', 'desc']).optional()
});

export const settingsPaths = {
    "/settings": {
        post: {
            summary: "Create a setting",
            requestBody: {
                content: { "application/json": { schema: createSettingsSchema } }
            },
            responses: {
                "201": { description: "Setting created", content: { "application/json": { schema: createSettingsResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "409": { description: "Conflict", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
    "/settings/public": {
        get: {
            summary: "Get all settings",
            requestParams: { query: getSettingsQuerySchema },
            responses: {
                "200": { description: "Settings returned", content: { "application/json": { schema: getSettingsResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
    "/settings/public/{key}": {
        get: {
            summary: "Get one setting by key",
            requestParams: { path: getSettingsKeyParamsSchema },
            responses: {
                "200": { description: "Setting returned", content: { "application/json": { schema: getSettingResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "404": { description: "Setting not found", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
    "/settings/{key}": {
        put: {
            summary: "Update a setting",
            requestParams: { path: getSettingsKeyParamsSchema },
            requestBody: {
                content: { "application/json": { schema: updateSettingsSchema } }
            },
            responses: {
                "200": { description: "Setting updated", content: { "application/json": { schema: updateSettingsResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "404": { description: "Setting not found", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
}