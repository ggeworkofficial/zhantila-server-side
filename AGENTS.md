# AGENTS.md

Early-stage scaffold for the Zhantila server-side API (Express 5 + TypeScript, CommonJS). The target architecture lives in `docs/arc42/`; it is **aspirational and partial** (no runtime view, level-2 only for the listing domain). The code is the source of truth for what actually exists. The previous large marketplace codebase was deleted in commit `ab20d52`; do **not** trust `AGENTS.md`/`progress.md` from commits before that commit.

## Current implementation (verified)

- `src/App.ts` creates the Express app with `express.json()` and `express.urlencoded()`. Its only route is `GET /api/v1/public/health`, returning `{ success, message, data }`.
- `src/Server.ts` loads `dotenv/config`, listens on `PORT` (default 5000), and exits on a listen error.
- No domain is implemented. `src/domains/users/openapi/` contains only empty placeholder files; there are no routes, controllers, services, repositories, request/response schemas, or models for users, shops, listings, orders, or any other domain.
- These tracked files are **empty placeholders (0 bytes)**: everything under `src/Infrastructure/openapi/`, `src/Infrastructure/postgres-sequelize/Connection.ts`, `src/Infrastructure/redis-client/Connection.ts`, and `src/domains/users/openapi/` (including `paths/`).
- The app does not connect to PostgreSQL or Redis. `src/Infrastructure/postgres-sequelize/models/index.js` is untracked and broken (it requires a nonexistent `../config/config.json`); no Sequelize models exist.
- Not wired up despite being installed or documented: Keycloak authentication, RBAC enforcement, Zod request validation, OpenAPI generation/serving, centralized error middleware, pino logging, audit logging, settings service, Redis caching, Recombee recommendations, Resend email, and Cloudflare Images.
- No tests or Jest config exist. `npm test` is a stub; `npm run build` is the only lint/typecheck/test gate.

## Persistence (implemented)

- Migrations live in `src/Infrastructure/postgres-sequelize/migrations/`. All three migrations are applied in the dev database (`SequelizeMeta`).
- `20261105000000-create-initial-schema.js` creates 13 tables: `locations`, `users`, `location_requests`, `platform_roles`, `platform_permissions`, `platform_user_roles`, `platform_role_permissions`, `shops`, `shop_follows`, `shop_locations`, `platform_settings`, `user_settings`, and `audit_logs`.
- `20261105010000-correct-shops-user-settings-audit-logs.js` changes `shops.owner_id` to `ON DELETE CASCADE`, adds `user_settings_key_unique` on `user_settings.key`, and changes `audit_logs.actor_user_id` to `ON UPDATE CASCADE / ON DELETE SET NULL`.
- `20261105020000-soft-delete-users-and-user-settings-key.js` adds `users.deleted_at` (nullable `TIMESTAMPTZ`, default `NULL`) as a soft-deletion timestamp and removes the standalone `user_settings_key_unique` constraint on `user_settings.key`; the composite uniqueness constraint is preserved.
- Schema highlights: PostgreSQL `gen_random_uuid()` defaults; `UNIQUE NULLS NOT DISTINCT` on `locations(name, type, parent_location_id)`; `LOWER(email)` index; partial index on active shops; check constraints for shop status (`unverified|verified|partner`), location type, location-request type/status; unique join constraints for platform RBAC, shop follows, and shop locations.
- **User settings uniqueness:** `user_settings.key` is **not** independently unique. Uniqueness is enforced by the composite `UNIQUE (key, user_id)` constraint `user_settings_key_user_id_key` (equivalent to one row per `(user_id, key)` pair), so different users may store the same preference key.
- No tables exist yet for categories, listings, listing comments/reviews, orders, receipts, logistics, reports, feedbacks, notifications, help center, or resellers — even though seeded permissions reference those domains.
- RBAC seeds live in `src/Infrastructure/postgres-sequelize/seeding/` (`data/rbac.js` plus three idempotent seeders). Current data: 4 platform roles (`customer`, `moderator`, `admin`, `superadmin`), 106 permissions, 343 role-permission links. `user.create` and `listing_review.delete_self_shop` are intentionally seeded but unassigned.
- RBAC is **platform-scope only**; there are no shop-role tables. `_self_shop` permissions express ownership scoping, not shop-level RBAC. Arc42 §7.1 mentions platform **and shop** scope; the agreed design is platform-scope only, so treat that sentence as stale/contradictory.
- Migrations and seeders run `up`/`down` inside transactions. Seeders use `ON CONFLICT DO NOTHING` (`ignoreDuplicates: true`), but Sequelize CLI seeder storage is the default `none`, so reruns re-execute every seeder.

## Arc42 target vs current gaps

- Target domains: Users, Shops, Listings, Orders, Receipts, Logistics, Recommendation, Reports, Feedbacks, Notifications, Help Center, Resellers. Implemented: none (only empty users OpenAPI placeholders).
- Target per-domain layers: API (routes, request schemas, controllers, response schemas) → service → data access (repositories, models, migrations), plus authentication middleware. Current code has only `App.ts`, `Server.ts`, migrations, and seeders.
- Target cross-cutting concerns: Keycloak authentication, platform RBAC plus resource-ownership checks in the service layer, Zod validation middleware, centralized error handling, structured logging/audit logging, and platform/user settings. Current implementation has schema/seed data for RBAC, settings, and audit logs only; no runtime behavior.
- Target external systems: PostgreSQL, Redis, Keycloak, Recombee, Resend, Cloudflare Images. Current repo defines only Postgres and Redis containers; there are no app clients or env configuration for Keycloak, Recombee, Resend, or Cloudflare.
- Target business behavior not implemented: registration and default unverified-shop creation, shop verification, listing/category management, engagement, checkout, reseller commissions, moderation, notifications, help center, and dynamic settings.
- Data model notes: shop statuses match arc42; `users.keycloak_subject` and `users.ref_code` exist for Keycloak identity and reseller attribution. Soft-deletion columns exist for `shops` (`deleted_at`, `is_closed`) and `users` (`deleted_at`, a nullable soft-deletion timestamp); no soft-deletion runtime behavior is implemented.
- Arc42 documentation is incomplete: no runtime view, level-2 view only for the listing domain, two ADRs, and a short risks list.

## Commands

- `npm run dev` — `ts-node-dev --respawn --transpile-only src/Server.ts`.
- `npm run build` — `tsc`; **this is the only lint/typecheck/test gate** (no lint script; `npm test` is a stub; no tests exist).
- `npm start` — `node dist/Server.js`; run `npm run build` first.
- `docker compose up -d` — starts Postgres 17 + Redis 7 from `docker-compose.yml` (reads env vars from `.env`).
- `npm run db:migrate` / `db:migrate:undo` / `db:migrate:undo:all` / `db:migrate:status` / `db:migrate:create` — Sequelize CLI wrappers; config comes from `.sequelizerc` + `config/config.js`. Requires Postgres running.
- `npm run seed` / `seed:undo` / `seed:undo:all` / `seed:generate` — seed wrappers. The `npx sequelize-cli db:seed:all` / `db:seed:undo:all` equivalents work too; see the rerun caveat above.

## Setup / environment

- `.env` and `config/` are gitignored but required. `.env` must define `PORT`, `BASE_URL`, `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_TEST_NAME`, and `REDIS_URL`; `config/config.js` uses `DB_*` for development/production and `DB_TEST_NAME` for test.
- `.sequelizerc` points config/migrations/seeders/models at `config/config.js` and `src/Infrastructure/postgres-sequelize/{migrations,seeding,models}`. `seeding/data/` is a shared data module, not a seeder.
- The initial migration uses PostgreSQL-specific DDL (`gen_random_uuid()`, `UNIQUE NULLS NOT DISTINCT`, expression/partial indexes), so it targets PostgreSQL 15+ (dev uses 17).
- Docker Compose maps Postgres/Redis to `127.0.0.1:5432`/`6379` and persists data in named volumes `postgres_data`, `redis_data`. A local Mailpit container may exist outside this compose file; it is not defined in the repo.

## Conventions

- Root files are PascalCase (`App.ts`, `Server.ts`); infrastructure directories are camelCase/kebab-ish (`postgres-sequelize`, `redis-client`).
- Domain code is intended to live under `src/domains/<domain>/`, with shared infrastructure under `src/Infrastructure/`.
- `tsconfig.json` is strict, `rootDir: src`, `outDir: dist`, `module: node16`, decorators enabled. `dist/` is gitignored build output; do not edit it.
- Success response shape already in use: `{ success, message, data }`. Arc42 also defines an error shape `{ success, message, detail }`, but no centralized error handler exists yet.
- Authorization belongs in the service layer; authentication belongs in route middleware. Neither is implemented. Keep RBAC platform-scope only.
- Do not add dependencies or architectural layers speculatively; this repo is still being scaffolded.

## Agent workflow

- Read the actual files before editing; many are placeholders and the arc42 docs describe future work.
- Do not treat arc42 content as implemented, and do not implement the entire target architecture in one change.
- Run `npm run build` before declaring work complete.
- Do not run destructive database commands (`db:migrate:undo*`, `seed:undo*`, table drops) without explicit instruction; the dev database is already migrated and seeded.
- Update this file when the implemented architecture changes.
