# E-Commerce Monorepo

> Work-in-progress multi-channel commerce platform built with Next.js frontends, TypeScript microservices, and a shared tooling stack powered by Turborepo.

## Overview

This repository houses everything needed to experiment with a modern commerce experience:

- A consumer-facing storefront and an operations dashboard built with Next.js 15, Tailwind CSS 4, and Clerk authentication.
- Independent product, order, and payment services written in TypeScript (Express, Fastify, and Hono) that expose clean HTTP APIs.
- Shared packages for database access, auth contracts, ESLint, and TypeScript configs to keep behavior consistent across the monorepo.

The project is under active development. New endpoints, admin workflows, and integrations (inventory, fulfillment, notifications, etc.) are added iteratively as the microservice architecture solidifies.

## Architecture at a glance

```
┌───────────────────┐      ┌───────────────────────┐
│ Client (Next 15)  │──┐   │ Admin (Next 15)       │
│ Port 3002         │  │   │ Port 3003            │
└────────┬──────────┘  │   └────────┬────────────┘
         │ Clerk auth  │            │ Clerk auth
         ▼              ▼            ▼
┌───────────────────────────────────────────────────┐
│ Next API routes / admin actions                   │
└────────┬──────────────┬───────────────┬──────────┘
         │              │               │
         │              │               │
┌────────▼────────┐ ┌───▼──────────┐ ┌──▼───────────┐
│ Product service │ │ Order service│ │ Payment svc  │
│ Express + Prisma│ │ Fastify +    │ │ Hono + Stripe│
│ Port 8000       │ │ MongoDB      │ │ Port 8002    │
└────────┬────────┘ └────┬─────────┘ └────┬────────┘
         │               │                │
   PostgreSQL + Prisma   │         Stripe API
         │         MongoDB Atlas
```

Authentication and authorization are centralized via Clerk JWTs. The Next.js apps pass Clerk-issued bearer tokens to the services, which validate user roles through shared `@repo/types` contracts.

## Apps & Services

| Name | Path | Default Port | Description |
| --- | --- | --- | --- |
| `client` | `apps/client` | 3002 | Customer storefront featuring product discovery, cart state (Zustand), checkout stub, and server actions that proxy to the services. |
| `admin` | `apps/admin` | 3003 | Internal dashboard with analytics, CRUD forms, and headless UI primitives (Radix, shadcn-inspired components) for managing catalog, orders, and users. |
| `product-service` | `apps/product-service` | 8000 | Express service backed by Prisma/PostgreSQL. Handles product & category CRUD with role-based guards. |
| `order-service` | `apps/order-service` | 8001 | Fastify service backed by MongoDB. Stores normalized order documents and exposes endpoints for user-specific and global order queries. |
| `payment-service` | `apps/payment-service` | 8002 | Lightweight Hono service that wraps Stripe operations (product provisioning, price lookup) and enforces Clerk authentication. |

## Shared Packages

| Package | Purpose |
| --- | --- |
| `@repo/order-db` | Mongoose connection + Order model (`orders` collection) reused by the order-service. |
| `@repo/product-db` | Prisma client factory configured for PostgreSQL + emitted types. Provides `prisma` helper for services. |
| `@repo/types` | Cross-service TypeScript contracts (e.g., `CustomJwtSessionClaims`) consumed by Express/Fastify/Hono middlewares. |
| `@repo/eslint-config` | Centralized ESLint presets for React/Next and Node targets. |
| `@repo/typescript-config` | Base `tsconfig` variants (app, library, Next.js) imported by every workspace. |

## Tech Stack

- **Frameworks**: Next.js 15 (with Turobpack), Express 4, Fastify 5, Hono 4.
- **Styling & UI**: Tailwind CSS 4, Radix UI, shadcn-inspired primitives, Recharts for analytics.
- **State/Auth**: Clerk (Next.js, Fastify, Express, Hono bindings), Zustand.
- **Data**: PostgreSQL (Prisma ORM) for catalog data, MongoDB (Mongoose) for orders, Stripe for payments.
- **Tooling**: Turborepo, TypeScript 5.9, ESLint 9, Prettier, TSX for hot-reloading Node services.

## Project Structure

```
apps/
  client/           # Storefront Next.js app
  admin/            # Ops dashboard Next.js app
  product-service/  # Express microservice
  order-service/    # Fastify microservice
  payment-service/  # Hono microservice
packages/
  order-db/
  product-db/
  types/
  eslint-config/
  typescript-config/
requestly/          # API collections for manual testing
```

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Create environment files**
   - Every app/service expects its own `.env` (see _Environment variables_ below).
   - Copy values from your secret manager; no sample files are committed yet.
3. **Run the project**
   - Start everything: `npm run dev` (Turbo will spawn each workspace’s `dev` script).
   - Or focus on a target: `npx turbo run dev --filter=order-service`.

> Node.js 18+ is required (see `package.json#engines`). Docker is recommended for local Postgres/Mongo instances, but not enforced.

## Environment Variables

| Workspace | Required variables |
| --- | --- |
| `apps/client` | `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `ORDER_SERVICE_URL` (defaults to `http://localhost:8001`). |
| `apps/admin` | `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, plus API URLs if you override the default localhost ports. |
| `apps/product-service` | `CLERK_PUBLISHABLE_KEY`/`CLERK_SECRET_KEY` (for server-side validation), `DATABASE_URL` (PostgreSQL). |
| `apps/order-service` | `CLERK_ISSUER` & related Clerk secrets (via `@clerk/fastify`), `MONGO_URL` (MongoDB connection string). |
| `apps/payment-service` | `CLERK_PUBLISHABLE_KEY`/`CLERK_SECRET_KEY`, `STRIPE_API_KEY`. |
| `packages/product-db` | Reads `DATABASE_URL` when Prisma CLI commands run. |

All secrets are consumed via `tsx --env-file=.env` for the Node services and through Next.js runtime for the web apps.

## Local Development Playbook

| Task | Command |
| --- | --- |
| Lint all workspaces | `npm run lint` |
| Type-check everything | `npm run check-types` |
| Format Markdown/TS | `npm run format` |
| Run a specific service | `npx turbo run dev --filter=order-service` (swap the filter as needed) |
| Build for production | `npm run build` |

Each service can also be started directly from its directory (e.g., `cd apps/order-service && npm run dev`) if you prefer isolated logs.

## Databases & Migrations

- **PostgreSQL (products & categories)**
  - Connection string: `DATABASE_URL=postgresql://user:password@localhost:5432/ecommerce`.
  - Manage schema via Prisma:
    ```bash
    cd packages/product-db
    npm run db:generate   # emit client/types
    npm run db:migrate    # dev migrations
    npm run db:deploy     # deploy migrations
    ```
- **MongoDB (orders)**
  - Connection string: `MONGO_URL=mongodb+srv://.../orders`.
  - Collection naming is handled via the shared Mongoose model in `@repo/order-db`.
- **Stripe**
  - Provide a test secret key in `apps/payment-service/.env`.
  - Use the provided `/create-stripe-product` endpoint to generate mock catalog data.

## API Surface (current snapshot)

| Service | Endpoint | Notes |
| --- | --- | --- |
| Product | `GET /products`, `GET /products/:id` | Public catalog listing & detail. Supports `sort`, `category`, `search`, `limit`. |
| Product | `POST/PUT/DELETE /products` | Admin-only operations enforced by Clerk role metadata. |
| Category | `GET /categories`, `POST /categories`, etc. | Simple CRUD to organize the catalog. |
| Order | `GET /user-order` | Returns the authenticated user’s Mongo-backed orders. |
| Order | `GET /orders` | Global list (currently unauthenticated — tighten once admin UI hooks in). |
| Payment | `POST /create-stripe-product`, `GET /stripe-product-price` | Proof-of-concept Stripe helpers for the checkout flow. |
| All services | `GET /health` | Standard uptime endpoints for monitoring. |

Request collections under `requestly/` bundle ready-to-import definitions for rapid manual testing (auth tokens, environments, etc.).

## Frontend Highlights

- **Client storefront**: category filters, product detail pages, cart state in `stores/cartStore.tsx`, and `/app/api/orders/*` routes that securely proxy to the order-service using Clerk session tokens.
- **Admin dashboard**: modular widgets (`AppAreaChart`, `CardList`, etc.), CRUD dialogs (`AddProduct`, `AddOrder`) built with `react-hook-form` + Zod, and theme-aware UI primitives under `components/ui`.

Both apps share UI/UX decisions (typography, spacing scales) via Tailwind CSS 4 configuration and reuse the same ESLint/TypeScript presets to avoid drift.

## Testing & Quality Gates

- Run `npm run lint` for ESLint (Next + Node presets).
- Run `npm run check-types` for TypeScript diagnostics.
- Add service-specific tests (Jest, Vitest, etc.) as the microservices mature. For now, manual testing relies on Requestly collections and the Next.js API proxies.

## Roadmap / Next Steps

- Wire the admin dashboard forms to the live microservices.
- Implement order creation and payment capture from the storefront.
- Harden authentication between services (Clerk Webhooks, service-to-service tokens).
- Expand logging/observability (pino, OpenTelemetry) and add CI workflows.

---

Questions or ideas? Open an issue or start a discussion — collaboration is welcome while the microservices are still taking shape.
