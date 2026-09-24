FROM node:lts-alpine

WORKDIR /app

COPY package.json /app
RUN npm i --omit=dev

COPY server.ts /app

EXPOSE 3333

ENTRYPOINT ["node", "server.ts"]