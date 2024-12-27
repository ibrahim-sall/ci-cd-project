FROM node:20-alpine3.19 as vehicule-server
COPY . /app
WORKDIR /app
RUN npm install && \
    npm run build
COPY ./package.json ./package-lock.json .
EXPOSE 3000
ENTRYPOINT ["node", "vehicle-server/index.js"]

FROM node:20-alpine3.19 as client-server
WORKDIR /app
COPY . /app
RUN npm install && \
    npm run build
ENTRYPOINT ["caporal", "src/index.js"]