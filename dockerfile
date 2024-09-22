# syntax=docker/dockerfile:1
FROM node:22-alpine3.20 AS base
WORKDIR /app
COPY package.json package-lock.json ./

FROM base AS test
RUN --mount=type=cache,target=./.npm npm ci --cache .npm
COPY . .
RUN npm run test

FROM base AS build
RUN --mount=type=cache,target=./.npm npm ci --only=production --cache .npm
COPY . .
CMD ["npm", "run", "prod"]
EXPOSE 3000