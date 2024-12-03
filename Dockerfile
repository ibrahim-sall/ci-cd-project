FROM node:20-alpine3.19
COPY . /app
WORKDIR /app
RUN npm install && \
  npm run build

ENTRYPOINT ["caporal", "index.js"]