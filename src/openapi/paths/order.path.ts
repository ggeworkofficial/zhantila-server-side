import { createOrderResponse, getOrderResponse, getOrdersResponse, getMyOrdersResponse, updateOrderResponse } from "../../response/order.response";
import { createOrderSchema, getOrderSchema, getOrdersForAdminSchema, updateOrderSchema } from "../../validators/order.validator";
import { errorResponse } from "../../response/error.response";

export const orderPaths = {
    "/orders": {
        post: {
            summary: "Create an order",
            requestBody: {
                content: { "application/json": { schema: createOrderSchema } }
            },
            responses: {
                "201": { description: "Order created", content: { "application/json": { schema: createOrderResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "409": { description: "Conflict", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        },
        get: {
            summary: "Get all orders (admin)",
            requestParams: { query: getOrdersForAdminSchema },
            responses: {
                "200": { description: "Orders returned", content: { "application/json": { schema: getOrdersResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
    "/orders/my": {
        get: {
            summary: "Get my orders",
            requestParams: { query: getOrdersForAdminSchema },
            responses: {
                "200": { description: "My orders returned", content: { "application/json": { schema: getMyOrdersResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
    "/orders/{id}": {
        get: {
            summary: "Get one order",
            requestParams: { path: getOrderSchema },
            responses: {
                "200": { description: "Order returned", content: { "application/json": { schema: getOrderResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "404": { description: "Order not found", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        },
        put: {
            summary: "Update an order",
            requestParams: { path: getOrderSchema },
            requestBody: {
                content: { "application/json": { schema: updateOrderSchema } }
            },
            responses: {
                "200": { description: "Order updated", content: { "application/json": { schema: updateOrderResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "403": { description: "Forbidden", content: { "application/json": { schema: errorResponse } } },
                "404": { description: "Order not found", content: { "application/json": { schema: errorResponse } } },
                "409": { description: "Conflict", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
}