import { z } from "zod";

export const errorResponse = z.object({
    status: z.boolean().default(false),
    message: z.string()
});