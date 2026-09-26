import { z } from "zod";

const complaintMessageSchema = z.object({
    id: z.string(),
    sender: z.object({
        id: z.string(),
        full_name: z.string(),
        role: z.string()
    }),
    message: z.string(),
    created_at: z.date()
});

export const createComplaintMessageResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    data: complaintMessageSchema
});

export const getComplaintMessageResponse = complaintMessageSchema;

export const getComplaintMessagesResponse = z.object({
    data: z.array(complaintMessageSchema),
    meta: z.object({
        page: z.number(),
        limit: z.number(),
        total: z.number()
    })
});

export type CreateComplaintMessageResponse = z.infer<typeof createComplaintMessageResponse>;
export type GetComplaintMessageResponse = z.infer<typeof getComplaintMessageResponse>;
export type GetComplaintMessagesResponse = z.infer<typeof getComplaintMessagesResponse>;