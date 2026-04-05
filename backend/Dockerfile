# syntax=docker/dockerfile:1

ARG NODE_VERSION=22

FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /usr/src/app

# Install all deps (including dev) but skip postinstall hook since
# prisma migrate deploy needs a live DB and shouldn't run at build time
FROM base AS deps
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --ignore-scripts

# Generate the Prisma client (no DB connection needed)
FROM deps AS build
COPY . .
RUN npx prisma generate

# Final image
FROM base AS final
ENV NODE_ENV=production

# Copy source first, then overwrite with build-stage artifacts so
# the generated Prisma client (built inside Docker) always wins
COPY . .
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/generated ./generated

USER node

EXPOSE 3000

# Run migrations against the live DB before starting the server
CMD ["sh", "-c", "npx prisma migrate deploy && node app.js"]
