# progress.md

Concise development log. Update after substantial implementation work. Not a duplicate of AGENTS.md (stable conventions live there).

## Current state (2026-09-09)

- Branch: `NewFeatures`, HEAD `bef5a51` (2026-08-26). Unified-marketplace endpoints have been refactored into the layered architecture (controllers → services → repositories); `npm run build` passes.
- RBAC groundwork landed: `roles`, `permissions`, `user_roles`, `role_permissions` tables + models + seed data (migration `20260810000000-create-rbac-tables.js`, commit `7b03bf9`). System roles seeded: `admin`, `buyer`, `contributor`, `reseller`.
- **Still not wired into runtime**: `checkRole` middleware still uses hardcoded roles (`admin | buyer | contributor`); `req.user.role` still comes from the Redis session captured at login. `hasPermission` in `src/repositories/rbac.repository.ts` exists but is not consumed anywhere in `src/`. Next planned step: make authorization read from the new RBAC tables.
- Local dev infrastructure via `compose.yml` (currently untracked in git): `postgres:17` (`zhantila-postgres`, port 5432), `redis:7` (`zhantila-redis`, port 6379), volume `postgres_data`. Application connects via `.env`.
- **Remaining layering violations**: `src/service/cron.service.ts`, parts of `src/service/order.service.ts`, and `src/service/logistics.service.ts` still query Sequelize models directly; `updateProductImage` in `src/repositories/product-image.repository.ts` manages its own transaction (see Known issues).
- `npm run build` (tsc) passes (re-verified 2026-09-09).
- No tests exist (`npm test` is a stub, `src/test/` empty).

## Completed

- **OpenAPI 3.2 spec integration (2026-09-11)**: added a response-schema layer and wired a modular OpenAPI document into the already-running Swagger UI (`/api-docs`) — zero behavior changes to routes/controllers/validation/logic:
  - New `src/response/*.response.ts` (17 files, one per domain) defining zod schemas + `z.infer` types mirroring each controller's actual JSON payload (optionals/nullables aligned to real TS return types). Union `...Any` schemas/types added where a single controller emits multiple payload shapes (e.g. `getMeAnyResponse`, `createReviewAnyResponse`, `getReceiptAnyResponse`, `updateProductAnyResponse`).
  - Controllers across all 17 domains typed with `Response<InferredType>` (`src/controllers/*.controller.ts`); runtime payloads unchanged. In-flight RBAC controller edits were preserved.
  - New `src/openapi/` layer: `paths/*.path.ts` (18 modules, ~50 path entries) following the existing `category.path.ts` pattern — request bodies/query/path params from validators, error responses via `errorResponse`. Category PUT/DELETE added (were missing). Marketplace domains (`listing`, `follow`, `referral`, `withdrawal`) have no zod validators, so their path files inline local zod schemas that mirror the routes' actual bodies/query (listing create/update documented as `multipart/form-data`). `settings` request schemas are inlined too because its validator uses `z.custom()`, which `zod-openapi` cannot represent.
  - `document.ts` registers all path modules; `openapi.json` regenerated at repo root (run `node dist/openapi/generate.js` after `npm run build`). No npm script was added for generation.
  - `npm run build` (tsc) passes; `openapi.json` reports `openapi: 3.2.0` with 50 paths.
- **Docker Compose dev infrastructure**: added `compose.yml` (untracked) providing Postgres 17 + Redis 7 containers for local development; `uploads/` added to `.gitignore` (both part of commit `7727016`).
- **Dependency/vulnerability pass (2026-08-26, commit `bef5a51`)**: `package-lock.json` only (restaged dependencies); no source changes.
- **Unified-marketplace layering refactor**: moved `listing`, `follow`, `referral`, `withdrawal` endpoints into the canonical layered pattern with zero route/schema/response-shape changes. Work done on/around 2026-08-22 and committed as `9b1c30b` (2026-08-26):
  - New repositories (only layer touching Sequelize models): `listing.repository.ts`, `follow.repository.ts`, `referral.repository.ts`, `withdrawal.repository.ts` — all queries/includes/pagination/order moved verbatim from the old controllers; transactions passed into repository methods where writes occur.
  - New services: `listing.service.ts` (visibility rules, ownership/banned checks, admin status filter, moderation action→status map, inventory sync decision, tags/tiers parsing), `follow.service.ts` (self-follow rule, seller existence), `referral.service.ts` (wallet math, buyer masking, click-tracking stub log), `withdrawal.service.ts` (amount validation, one-pending rule, balance computation, pending-only processing).
  - Controllers rewritten as thin HTTP glue (class API and method names unchanged, so route files are untouched). Business-rule failures now throw `createError(message, status)` with the exact same status/message as before → `errorHandler` emits the same `{ success: false, message }` body. Transaction create/commit/rollback orchestrated in controllers for `createListing`/`updateListing`/`moderateListing`/`requestWithdrawal` (same pattern as receipt/order/inventory controllers).
  - Behavior deltas (intentional, documented): unexpected exceptions now flow through `next(error)` → `errorHandler`, so 500 bodies use the project-wide `{ success: false, message }` shape instead of the ad-hoc per-endpoint message + `errors` array. Also fixed incidentally: the old code leaked open transactions on early-return business failures in `updateListing`/`moderateListing`; the refactored controllers always roll back.
- RBAC permission repository: `hasPermission(userId, permission)` in `src/repositories/rbac.repository.ts` (ORM-association lookup, returns real boolean).
- RBAC schema/models/seed migration (`7b03bf9`).
- Reseller domain (services/repositories/models/validators for applications, shares, clicks, payouts) — **no routes/controllers yet** (`adcdd53`).
- Fixed the `WhenOptions` mis-import from `joi` in `reseller.repository.ts` → proper `WhereOptions` from `sequelize` (`98cc94f`). `joi` is no longer imported anywhere in `src/`.
- Unified marketplace feature set (merged from another developer, migration `20260812000001-add-unified-marketplace-tables.js`):
  - `users.ref_code` (unique, generated at signup in `auth.repository.ts`) and `orders.referral_code`.
  - `listings` + `listing_media` + `listing_price_tiers`: unified marketplace listings of kind `product | service | skill`, price models (`fixed | hourly | daily | project`), moderation status (`under_review | published | flagged | banned`), bulk flags (`bulk_enabled`, `bulk_only`, `moq`) and per-listing commission settings.
  - Listing CRUD + admin moderation endpoints (`/api/listings`, moderation via `PUT /:id/moderate` with `checkRole('admin')`); public browsing uses the new `optionalAuthenticate` soft-auth middleware.
  - Bulk pricing: order creation resolves quantity-based tier prices from `listing_price_tiers` and enforces MOQ for `bulk_only` listings; `order_items` now store `unit_price` and optional `listing_id`.
  - Referral commissions: checkout with a valid `referral_code` on commission-enabled listings creates pending `referrals` rows (self-referral blocked) in `order.service.ts`.
  - Wallet/referral endpoints mounted at `/api` (`GET /api/wallet`, `GET /api/referrals/my`, public `POST /api/referrals/track` — click tracking is currently a stub that only logs).
  - Withdrawals: request (balance-checked, one pending at a time), own history, admin list + process (`approved | rejected | paid`) under `/api/withdrawals`.
  - Seller follows: follow/unfollow, follow state (public with optional auth), followers/following lists under `/api/follows`.
- Daily cron job via `node-cron` (`initCronJobs()` in `src/app.ts` → `src/service/cron.service.ts`): clears pending referrals to `cleared` once the order has been delivered for 7+ days (return window).
- CORS updated to allow multiple origins (`localhost:5173`, `localhost:8080`, `127.0.0.1:8080`) (`2c26c38`).

## Known issues

- `npm start` is broken (`node/dist/app.js`, missing space in package.json).
- Docs (`vendor-bridge-apis.md`, `docs/vendorbridge_api.yaml`) drift from code.
- `Role` type (`roleChecker.ts`) omits `seller`, `reseller`, `service_provider`, `bulk_buyer` that `user.model.ts` accepts.
- **Remaining layering violations** (legacy debt, do not replicate):
  - `src/service/cron.service.ts` (referral clearing job) queries `Referral`/`Order` directly with `findAll()`/`save()` and no transaction.
  - parts of `src/service/order.service.ts` (bulk pricing/referral creation in `create()`) query `Listing`, `ListingPriceTier`, `User`, and `Referral` directly via `findAll()`/`findOne()`/`create()`.
  - `src/service/logistics.service.ts` queries `Order.findOne()` (create) and `Logistics.findOne()` (duplicate tracking-number check) directly. Previously undocumented; added 2026-09-09.
  - The four marketplace controllers were refactored (2026-08-22); these three services remain. Marketplace routes (`listing`, `follow`, `referral`, `withdrawal`) still have no zod validators (adding them would change validation responses; left out to preserve behavior).
- **Transaction-convention violation**: `updateProductImage` in `src/repositories/product-image.repository.ts` creates/commits/rolls back its own transaction via `Postgres.getInstance().transaction()` instead of receiving one from the controller (the convention is controller-owned). The controller's `updateProductImage` does not open a transaction at all, so this path is outside the standard flow.
- **`createProductImage` response/commit bug** (`src/controllers/product-image.controller.ts`): responds with `res.status(200).json(...)` *before* `transaction.commit()`, and the multi-file path (>1 image) responds 200 then throws "Only one image allowed" after headers are sent. Should commit before responding and branch before sending.
- Referral click tracking (`POST /api/referrals/track`) is a stub — it only logs (now via `ReferralService.trackClick`) and persists nothing (the `reseller_clicks` table/model from the reseller domain is unused by it).
- Minor layering concerns: `order.controller.ts` opens a transaction even for read-only GET handlers (`getOrder`/`getOrders`/`getMyOrders`); `review.controller.ts` imports `UniqueConstraintError` from `sequelize` (ORM concern in the controller layer); `user.controller.ts` imports type definitions from repositories.
- `src/types/pageination.ts` is a typo. Kept intentionally. (The former `WhenOptions` mis-import from `joi` was fixed in `98cc94f`.)

## Remaining / next

- Wire RBAC into runtime authorization (permission checks, role from `user_roles`, session refresh on role change; consume `hasPermission`).
- Add reseller routes/controllers.
- Move remaining direct model queries into repositories: `cron.service.ts`, `order.service.ts`, and `logistics.service.ts`.
- Bring `updateProductImage` in `product-image.repository.ts` under the controller-owned transaction convention; fix `createProductImage` in `product-image.controller.ts` (commit before respond, multi-file branch).
- Consider dropping transactions on read-only order GET handlers.
- Move `UniqueConstraintError` handling out of `review.controller.ts` into the service layer.
- Implement real referral click tracking (persist clicks instead of logging).
- Add tests (none exist).

## Verification

- `npm run build` passes after changes; run it before declaring work complete.
- `npm run build` re-verified 2026-09-09 — tsc clean.
- `npm run build` re-verified 2026-08-22 after the marketplace layering refactor — tsc clean.
- Layering verified by inspection: the four refactored controllers import only `express`, their service, and (where transactions apply) `connection/postgres`; no Sequelize model imports or query calls remain in them.
- `hasPermission` runtime checks against dev DB (2026-08-10, all PASS, temp rows cleaned up):
  - buyer user with `product.get_all` → `true`
  - same user with `user.delete` (admin-only) → `false`
  - same user with unknown permission `does.not.exist` → `false`
  - user with no `user_roles` rows → `false`
  - Generated SQL confirmed the `user_roles → roles → role_permissions → permissions` INNER JOIN chain with the permission-name filter.
