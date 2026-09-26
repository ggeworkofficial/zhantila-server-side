import { z } from "zod";

const rawOrderSchema = z.object({
    id: z.string(),
    user_id: z.string().optional(),
    status: z.enum(['pending', 'confirmed', 'out_for_delivery', 'delivered', 'cancelled', 'rejected']),
    payment_status: z.enum(['paid', 'unpaid', 'pending_review', 'rejected']),
    payment_method: z.enum(['full', 'advance', 'cod']),
    total_amount: z.number(),
    address: z.string(),
    referral_code: z.string().nullable().optional(),
    estimated_delivery: z.date().nullable().optional(),
    created_at: z.date(),
    updated_at: z.date()
});

const rawOrderItemSchema = z.object({
    id: z.string(),
    order_id: z.string().optional(),
    product_id: z.string().optional(),
    listing_id: z.string().nullable().optional(),
    quantity: z.number(),
    price: z.number(),
    unit_price: z.number(),
    created_at: z.date(),
    updated_at: z.date()
});

const orderResultSchema = z.object({
    id: z.string(),
    user: z.object({
        id: z.string(),
        full_name: z.string()
    }),
    status: z.enum(['pending', 'confirmed', 'out_for_delivery', 'delivered', 'cancelled', 'rejected']),
    payment_status: z.enum(['paid', 'unpaid', 'pending_review', 'rejected']),
    payment_method: z.enum(['full', 'advance', 'cod']),
    total_amount: z.number(),
    address: z.string(),
    products: z.array(z.object({
        id: z.string(),
        quantity: z.number(),
        price: z.number()
    })),
    estimated_delivery: z.date().optional(),
    created_at: z.date(),
    updated_at: z.date()
});

export const createOrderResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.object({
        order: rawOrderSchema,
        order_items: z.array(rawOrderItemSchema)
    })
});

export const getOrderResponse = orderResultSchema;

export const getOrdersResponse = z.object({
    data: z.array(orderResultSchema),
    meta: z.object({
        page: z.number(),
        limit: z.number(),
        total: z.number()
    })
});

export const getMyOrdersResponse = getOrdersResponse;

export const updateOrderResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    data: orderResultSchema
});

export type CreateOrderResponse = z.infer<typeof createOrderResponse>;
export type GetOrderResponse = z.infer<typeof getOrderResponse>;
export type GetOrdersResponse = z.infer<typeof getOrdersResponse>;
export type GetMyOrdersResponse = z.infer<typeof getMyOrdersResponse>;
export type UpdateOrderResponse = z.infer<typeof updateOrderResponse>;