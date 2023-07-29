# dilli-daaru

A web app to locate and view stock of government liquor stores in Delhi. Built using Next.js, Prisma, and Postgres. Uses the Next App Router & server-side rendering.



## Prerequisites

- Node.js 18
- pnpm
- Docker/equivalent runtime (to run the database locally)

## Environment variables

| Name                | Description                                                            |
|---------------------|------------------------------------------------------------------------|
| DATABASE_URL        | Postgres Database URL for normal database operations                   |
| DIRECT_URL          | Postgres Database URL for migrations                                   |
| GOOGLE_MAPS_API_KEY | API key for Google Maps API. Required for location-based functionality |


`DATABASE_URL` and `DIRECT_URL` can be the same for local development. In production `DATABASE_URL` is set to go through `pgbouncer` and `DIRECT_URL` is the normal postgres connection string

## Setup instructions

1. Clone the repo.
2. Run `pnpm install` to install dependencies.
3. Fill out the environment variables in `.env.local` and run `pnpm run db:seed` to seed the database.
4. Run `pnpm run dev` to start the dev server.

## Useful commands

`pnpm run db:migrate:dev` - Generate migrations after changes to `schema.prisma`
`pnpm run db:seed` - Seed the database with data from `prisma/seed.ts`
`pnpm run db:studio` - Open Prisma Studio to view the database
`pnpm run db:reset` - Reset the database (drops all tables and recreates them)