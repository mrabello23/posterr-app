FROM node:16-alpine

WORKDIR /usr/app

COPY ./package.json .
COPY ./babel.config.js .

ENV NODE_ENV production
RUN npm install --production

COPY ./src ./src
RUN npm run build

EXPOSE 3000

CMD ["npm","start"]