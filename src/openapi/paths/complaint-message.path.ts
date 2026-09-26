import { createComplaintMessageResponse, getComplaintMessageResponse, getComplaintMessagesResponse } from "../../response/complaint-message.response";
import { createComplaintMessageSchema, getComplaintMessageSchema, getComplaintMessagesSchema } from "../../validators/complaint-message.validator";
import { errorResponse } from "../../response/error.response";

export const complaintMessagePaths = {
    "/complaints/messages": {
        post: {
            summary: "Create a complaint message",
            requestBody: {
                content: { "application/json": { schema: createComplaintMessageSchema } }
            },
            responses: {
                "201": { description: "Complaint message created", content: { "application/json": { schema: createComplaintMessageResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        },
        get: {
            summary: "Get all complaint messages",
            requestParams: { query: getComplaintMessagesSchema },
            responses: {
                "200": { description: "Complaint messages returned", content: { "application/json": { schema: getComplaintMessagesResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
    "/complaints/messages/{id}": {
        get: {
            summary: "Get one complaint message",
            requestParams: { path: getComplaintMessageSchema },
            responses: {
                "200": { description: "Complaint message returned", content: { "application/json": { schema: getComplaintMessageResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "404": { description: "Complaint message not found", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
}