FROM node:24-alpine AS base
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable
RUN corepack install

FROM base AS build

RUN pnpm i

COPY ./src ./src
COPY ./public ./public
COPY ./next.config.ts .
COPY ./next-env.d.ts .
COPY ./tsconfig.json .

RUN pnpm build

FROM base AS image
WORKDIR /app

COPY --from=build /app/node_modules/ ./node_modules/
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.ts .

EXPOSE 80
CMD ["pnpm", "exec", "next", "start", "-p", "80"]
