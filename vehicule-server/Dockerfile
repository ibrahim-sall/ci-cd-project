FROM node:20-alpine3.19 AS build1
COPY . /app
WORKDIR /app
RUN npm install && \
  npm run build

FROM node:20-alpine3.19 AS runtime2
RUN mkdir -p /app
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm install --production
COPY --from=build1 /app/dist /app/dist

ENTRYPOINT ["node", "/app/dist/index.js"]