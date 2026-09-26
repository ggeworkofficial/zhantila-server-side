import { z } from "zod";

const authUserSchema = z.object({
    id: z.string(),
    full_name: z.string(),
    email: z.string(),
    role: z.string(),
    status: z.string(),
    created_at: z.date(),
    updated_at: z.date(),
    last_active: z.date().optional()
});

const userResultSchema = z.object({
    id: z.string(),
    full_name: z.string(),
    email: z.string(),
    role: z.string().optional(),
    status: z.string().optional()
});

export const registerResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    user: authUserSchema
});

export const loginResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    user: authUserSchema
});

export const getMeResponse = z.object({
    success: z.boolean(),
    user: userResultSchema
});

export const getMeAnyResponse = getMeResponse.or(
    z.object({
        success: z.boolean(),
        message: z.string()
    })
);

export const logoutResponse = z.object({
    success: z.boolean(),
    message: z.string()
});

export type RegisterResponse = z.infer<typeof registerResponse>;
export type LoginResponse = z.infer<typeof loginResponse>;
export type GetMeResponse = z.infer<typeof getMeAnyResponse>;
export type LogoutResponse = z.infer<typeof logoutResponse>;