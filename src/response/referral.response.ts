import { z } from "zod";

const referralItemSchema = z.object({
    id: z.string(),
    listing_id: z.string(),
    listing_title: z.string().optional(),
    buyer_masked: z.string(),
    order_total: z.number(),
    commission_percent: z.number(),
    commission_amount: z.number(),
    status: z.string(),
    created_at: z.date()
});

export const getWalletResponse = z.object({
    data: z.object({
        ref_code: z.string().nullable().optional(),
        total_earnings: z.number(),
        pending: z.number(),
        available: z.number(),
        withdrawn: z.number()
    })
});

export const getMyReferralsResponse = z.object({
    data: z.array(referralItemSchema),
    meta: z.object({
        page: z.number(),
        limit: z.number(),
        total: z.number()
    })
});

export const trackClickResponse = z.object({
    success: z.boolean(),
});

export type GetWalletResponse = z.infer<typeof getWalletResponse>;
export type GetMyReferralsResponse = z.infer<typeof getMyReferralsResponse>;
export type TrackClickResponse = z.infer<typeof trackClickResponse>;