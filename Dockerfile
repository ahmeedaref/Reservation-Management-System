FROM node:26.13.0
WORKDIR /reservation-management

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 8080

CMD [ "npm","run","start:dev" ]