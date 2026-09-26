import { z } from "zod";

const sellerItemSchema = z.object({
    id: z.string(),
    user_id: z.string().nullable().optional(),
    name: z.string().nullable().optional(),
    location: z.string().nullable().optional(),
    contact: z.string().nullable().optional(),
    verified: z.boolean(),
    created_at: z.date(),
    updated_at: z.date(),
    user: z.object({
        id: z.string(),
        full_name: z.string(),
        email: z.string()
    }).optional()
});

const followerSchema = z.object({
    id: z.string(),
    full_name: z.string()
});

export const getStateResponse = z.object({
    data: z.object({
        followers: z.number(),
        following: z.number(),
        is_following: z.boolean()
    })
});

export const followResponse = z.object({
    success: z.boolean(),
    message: z.string(),
});

export const unfollowResponse = z.object({
    success: z.boolean(),
    message: z.string(),
});

export const getFollowingResponse = z.object({
    data: z.array(sellerItemSchema),
    meta: z.object({
        page: z.number(),
        limit: z.number(),
        total: z.number()
    })
});

export const getFollowersResponse = z.object({
    data: z.array(followerSchema),
    meta: z.object({
        page: z.number(),
        limit: z.number(),
        total: z.number()
    })
});

export type GetStateResponse = z.infer<typeof getStateResponse>;
export type FollowResponse = z.infer<typeof followResponse>;
export type UnfollowResponse = z.infer<typeof unfollowResponse>;
export type GetFollowingResponse = z.infer<typeof getFollowingResponse>;
export type GetFollowersResponse = z.infer<typeof getFollowersResponse>;