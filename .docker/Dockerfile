FROM node:16-alpine

WORKDIR /usr/app

COPY ./app/package.json .
COPY ./app/.npmrc .
COPY ./app/babel.config.js .
RUN npm install

COPY ./app/src ./src
RUN npm run build

EXPOSE 3000

CMD ["npm","start"]