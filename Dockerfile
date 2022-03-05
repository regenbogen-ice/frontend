FROM node:16
WORKDIR /app

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock

RUN yarn install --pure-lockfile

COPY ./components ./components
COPY ./pages ./pages
COPY ./public ./public
COPY ./scripts ./scripts

COPY ./next.config.js .
COPY ./next-env.d.ts .
COPY ./tsconfig.json .

COPY ./.env.* ./

RUN yarn next build

EXPOSE 80
CMD ["yarn", "next", "start", "-p", "80"]