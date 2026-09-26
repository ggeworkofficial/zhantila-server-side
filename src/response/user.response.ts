import { z } from "zod";

const userSchema = z.object({
    id: z.string(),
    full_name: z.string(),
    email: z.string(),
    role: z.string().optional(),
    status: z.string().optional()
});

export const createUserResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    data: userSchema
});

export const getOneUserResponse = userSchema;

export const getAllUsersResponse = z.object({
    data: z.array(userSchema),
    meta: z.object({
        page: z.number(),
        limit: z.number(),
        total: z.number()
    })
});

export const updateUserResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    data: userSchema
});

export const deleteUserResponse = z.object({
    success: z.boolean(),
    message: z.string(),
});

export type CreateUserResponse = z.infer<typeof createUserResponse>;
export type GetOneUserResponse = z.infer<typeof getOneUserResponse>;
export type GetAllUsersResponse = z.infer<typeof getAllUsersResponse>;
export type UpdateUserResponse = z.infer<typeof updateUserResponse>;
export type DeleteUserResponse = z.infer<typeof deleteUserResponse>;