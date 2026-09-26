import { registerResponse, loginResponse, getMeAnyResponse, logoutResponse } from "../../response/auth.response";
import { registerSchema, loginSchema } from "../../validators/auth.validator";
import { errorResponse } from "../../response/error.response";

export const authPaths = {
    "/auth/register": {
        post: {
            summary: "Register a new user",
            requestBody: {
                content: {
                    "application/json": { schema: registerSchema }
                }
            },
            responses: {
                "201": {
                    description: "User registered successfully",
                    content: { "application/json": { schema: registerResponse } }
                },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "409": { description: "Email already in use", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
    "/auth/login": {
        post: {
            summary: "Login a user",
            requestBody: {
                content: {
                    "application/json": { schema: loginSchema }
                }
            },
            responses: {
                "200": {
                    description: "Login successful",
                    content: { "application/json": { schema: loginResponse } }
                },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Invalid credentials or suspended account", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
    "/auth/me": {
        get: {
            summary: "Get current authenticated user",
            responses: {
                "200": {
                    description: "User returned successfully",
                    content: { "application/json": { schema: getMeAnyResponse } }
                },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "404": { description: "User not found", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
    "/auth/logout": {
        post: {
            summary: "Logout current user",
            responses: {
                "200": {
                    description: "Logged out successfully",
                    content: { "application/json": { schema: logoutResponse } }
                },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
}
