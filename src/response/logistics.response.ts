import { z } from "zod";

const rawLogisticsSchema = z.object({
    id: z.string(),
    order_id: z.string(),
    carrier: z.string(),
    tracking_number: z.string(),
    status: z.enum(['processing', 'in_transit', 'out_for_delivery', 'delivered']),
    origin: z.string(),
    destination: z.string(),
    estimated_eta: z.date().nullable().optional(),
    created_at: z.date(),
    updated_at: z.date()
});

const logisticsSchema = z.object({
    id: z.string(),
    order_id: z.string(),
    carrier: z.string(),
    tracking_number: z.string(),
    status: z.enum(['processing', 'in_transit', 'out_for_delivery', 'delivered']),
    origin: z.string(),
    destination: z.string(),
    estimated_eta: z.date().optional(),
    created_at: z.date(),
    updated_at: z.date(),
    order: z.object({
        id: z.string(),
        user: z.object({
            id: z.string(),
            full_name: z.string()
        })
    })
});

export const createLogisticsResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    data: rawLogisticsSchema
});

export const getLogisticsResponse = logisticsSchema;

export const getLogisticsListResponse = z.object({
    data: z.array(logisticsSchema),
    meta: z.object({
        page: z.number(),
        limit: z.number(),
        total: z.number()
    })
});

export const updateLogisticsResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    data: logisticsSchema
});

export type CreateLogisticsResponse = z.infer<typeof createLogisticsResponse>;
export type GetLogisticsResponse = z.infer<typeof getLogisticsResponse>;
export type GetLogisticsListResponse = z.infer<typeof getLogisticsListResponse>;
export type UpdateLogisticsResponse = z.infer<typeof updateLogisticsResponse>;