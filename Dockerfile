FROM node:20-alpine3.19 AS build
WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine3.19 AS runtime
WORKDIR /app
COPY --from=build /app /app
RUN npm install
ENTRYPOINT ["node", "/app/dist/index.js"]