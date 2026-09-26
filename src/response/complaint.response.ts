import { z } from "zod";

const rawComplaintSchema = z.object({
    id: z.string(),
    order_id: z.string().nullable().optional(),
    subject: z.string(),
    description: z.string(),
    status: z.enum(['open', 'investigating', 'resolved']),
    priority: z.enum(['low', 'medium', 'high']),
    created_at: z.date(),
    updated_at: z.date()
});

const complaintSchema = z.object({
    id: z.string(),
    user: z.object({
        id: z.string(),
        full_name: z.string()
    }),
    subject: z.string(),
    description: z.string(),
    status: z.enum(['open', 'investigating', 'resolved']),
    priority: z.enum(['low', 'medium', 'high']),
    created_at: z.date(),
    updated_at: z.date()
});

export const createComplaintResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    data: rawComplaintSchema
});

export const getComplaintResponse = complaintSchema;

export const getAllComplaintsResponse = z.object({
    data: z.array(complaintSchema),
    meta: z.object({
        page: z.number(),
        limit: z.number(),
        total: z.number()
    })
});

export const updateComplaintResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    data: complaintSchema
});

export type CreateComplaintResponse = z.infer<typeof createComplaintResponse>;
export type GetComplaintResponse = z.infer<typeof getComplaintResponse>;
export type GetAllComplaintsResponse = z.infer<typeof getAllComplaintsResponse>;
export type UpdateComplaintResponse = z.infer<typeof updateComplaintResponse>;