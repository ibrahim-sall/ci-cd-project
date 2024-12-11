
FROM node:20-alpine3.19 as vehicule-server
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build
EXPOSE 3000 
# a changer car pas en dur
ENTRYPOINT ["node", "vehicule-server/src/index.js"]

FROM node:20-alpine3.19 as client-server
WORKDIR /app
RUN ?

