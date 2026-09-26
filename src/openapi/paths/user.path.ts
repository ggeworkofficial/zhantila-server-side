import { createUserResponse, getOneUserResponse, getAllUsersResponse, updateUserResponse, deleteUserResponse } from "../../response/user.response";
import { createUserSchema, getOneUserSchema, getUserSchema, updateSchema, deleteUserSchema } from "../../validators/user.validator";
import { errorResponse } from "../../response/error.response";

export const userPaths = {
    "/users": {
        post: {
            summary: "Create a user",
            requestBody: {
                content: { "application/json": { schema: createUserSchema } }
            },
            responses: {
                "201": { description: "User created", content: { "application/json": { schema: createUserResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "409": { description: "Email already registered", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        },
        get: {
            summary: "Get all users",
            requestParams: { query: getUserSchema },
            responses: {
                "200": { description: "Users returned", content: { "application/json": { schema: getAllUsersResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
    "/users/admin/{id}": {
        put: {
            summary: "Update a user (admin)",
            requestParams: { path: getOneUserSchema },
            requestBody: {
                content: { "application/json": { schema: updateSchema } }
            },
            responses: {
                "200": { description: "User updated", content: { "application/json": { schema: updateUserResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "404": { description: "User not found", content: { "application/json": { schema: errorResponse } } },
                "409": { description: "Email already registered", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
    "/users/{id}": {
        get: {
            summary: "Get one user",
            requestParams: { path: getOneUserSchema },
            responses: {
                "200": { description: "User returned", content: { "application/json": { schema: getOneUserResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "404": { description: "User not found", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        },
        put: {
            summary: "Update a user",
            requestParams: { path: getOneUserSchema },
            requestBody: {
                content: { "application/json": { schema: updateSchema } }
            },
            responses: {
                "200": { description: "User updated", content: { "application/json": { schema: updateUserResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "404": { description: "User not found", content: { "application/json": { schema: errorResponse } } },
                "409": { description: "Email already registered", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        },
        delete: {
            summary: "Delete a user",
            requestParams: { path: deleteUserSchema },
            responses: {
                "200": { description: "User deleted", content: { "application/json": { schema: deleteUserResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "404": { description: "User not found", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
}
