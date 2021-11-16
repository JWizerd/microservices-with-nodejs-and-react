FROM node:alpine as dev

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install
COPY . .

ENTRYPOINT [ "yarn", "dev" ]

# PRODUCTION

FROM node:alpine as prod

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn && yarn build
COPY . .

CMD [ "yarn", "start" ]