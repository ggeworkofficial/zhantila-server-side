import { z } from "zod";

const settingSchema = z.object({
    id: z.string(),
    key: z.string(),
    value: z.any(),
    description: z.string().nullable().optional(),
    is_public: z.boolean(),
    created_at: z.date(),
    updated_at: z.date()
});

export const createSettingsResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    data: settingSchema
});

export const getSettingResponse = z.object({
    success: z.boolean(),
    data: settingSchema
});

export const getSettingsResponse = z.object({
    data: z.array(settingSchema),
    meta: z.object({
        page: z.number(),
        limit: z.number(),
        total: z.number()
    })
});

export const updateSettingsResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    data: settingSchema
});

export type CreateSettingsResponse = z.infer<typeof createSettingsResponse>;
export type GetSettingResponse = z.infer<typeof getSettingResponse>;
export type GetSettingsResponse = z.infer<typeof getSettingsResponse>;
export type UpdateSettingsResponse = z.infer<typeof updateSettingsResponse>;