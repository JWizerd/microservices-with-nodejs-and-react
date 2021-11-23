FROM node:alpine as debug

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install
COPY . .

ENTRYPOINT [ "npm", "run", "debug" ]

# PRODUCTION

FROM node:alpine as prod

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install
COPY . .

CMD [ "npm", "run", "start" ]