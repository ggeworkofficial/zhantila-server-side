import { createComplaintResponse, getComplaintResponse, getAllComplaintsResponse, updateComplaintResponse } from "../../response/complaint.response";
import { createComplaintSchema, getComplaintSchema, getComplaintsSchema, updateComplaintSchema } from "../../validators/complaint.validator";
import { errorResponse } from "../../response/error.response";

export const complaintPaths = {
    "/complaints": {
        post: {
            summary: "Create a complaint",
            requestBody: {
                content: { "application/json": { schema: createComplaintSchema } }
            },
            responses: {
                "201": { description: "Complaint created", content: { "application/json": { schema: createComplaintResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        },
        get: {
            summary: "Get all complaints",
            requestParams: { query: getComplaintsSchema },
            responses: {
                "200": { description: "Complaints returned", content: { "application/json": { schema: getAllComplaintsResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
    "/complaints/{id}": {
        get: {
            summary: "Get one complaint",
            requestParams: { path: getComplaintSchema },
            responses: {
                "200": { description: "Complaint returned", content: { "application/json": { schema: getComplaintResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "404": { description: "Complaint not found", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        },
        put: {
            summary: "Update a complaint",
            requestParams: { path: getComplaintSchema },
            requestBody: {
                content: { "application/json": { schema: updateComplaintSchema } }
            },
            responses: {
                "200": { description: "Complaint updated", content: { "application/json": { schema: updateComplaintResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "404": { description: "Complaint not found", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
}