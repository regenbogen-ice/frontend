FROM node:20-alpine as base
WORKDIR /app

COPY package.json yarn.lock ./

FROM base as dependencies

RUN yarn install --cache-folder ./ycache --immutable --immutable-cache --pure-lockfile; rm -rf ./ycache

FROM dependencies as build

ENV BUILD_ENV=development
ARG BUILD_ENV=development

COPY ./components ./components
COPY ./pages ./pages
COPY ./public ./public
COPY ./util ./util

COPY ./next.config.js .
COPY ./next-env.d.ts .
COPY ./tsconfig.json .

RUN yarn next build

FROM node:20-alpine
WORKDIR /app

COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules/ ./node_modules/
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.js .

EXPOSE 80
CMD ["yarn", "next", "start", "-p", "80"]
