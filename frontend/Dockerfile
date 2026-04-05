# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.20.0

FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /usr/src/app

FROM base AS deps
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

FROM deps AS build
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci
COPY . .
RUN npm run build

FROM nginx:alpine AS final

# Copy built assets into the path that matches the /blog-api/ base
COPY --from=build /usr/src/app/dist /usr/share/nginx/html/blog-api

# nginx config: serve SPA under /blog-api/
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
