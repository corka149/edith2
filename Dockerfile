# Stage 1
FROM node:12.10.0-alpine as node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


# Stage 2
FROM nginx:1.17.6-alpine

COPY --from=node /usr/src/app/dist/edith2 /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
