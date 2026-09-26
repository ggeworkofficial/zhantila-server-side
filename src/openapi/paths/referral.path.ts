import z from "zod";
import { getWalletResponse, getMyReferralsResponse, trackClickResponse } from "../../response/referral.response";
import { errorResponse } from "../../response/error.response";

const pageQuerySchema = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional()
});

const trackClickBodySchema = z.object({
    ref_code: z.string(),
    listing_id: z.string().uuid()
});

export const referralPaths = {
    "/wallet": {
        get: {
            summary: "Get my referral wallet",
            responses: {
                "200": { description: "Wallet returned", content: { "application/json": { schema: getWalletResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
    "/referrals/my": {
        get: {
            summary: "Get my referrals",
            requestParams: { query: pageQuerySchema },
            responses: {
                "200": { description: "Referrals returned", content: { "application/json": { schema: getMyReferralsResponse } } },
                "401": { description: "Unauthorized", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
    "/referrals/track": {
        post: {
            summary: "Track a referral click",
            requestBody: {
                content: { "application/json": { schema: trackClickBodySchema } }
            },
            responses: {
                "200": { description: "Referral click tracked", content: { "application/json": { schema: trackClickResponse } } },
                "400": { description: "Invalid request", content: { "application/json": { schema: errorResponse } } },
                "404": { description: "Referral code or listing not found", content: { "application/json": { schema: errorResponse } } },
                "500": { description: "Internal server error", content: { "application/json": { schema: errorResponse } } }
            }
        }
    },
}