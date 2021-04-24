FROM node:14-alpine
WORKDIR /usr/src/jokes-catalogue/server
COPY ./server/package*.json ./
RUN npm i
WORKDIR /usr/src/jokes-catalogue/client
COPY ./client/package*.json ./
RUN npm i
WORKDIR /usr/src/jokes-catalogue
COPY . .
WORKDIR /usr/src/jokes-catalogue/client
RUN npm run build
WORKDIR /usr/src/jokes-catalogue/server
EXPOSE 3000
CMD ["npm", "start"]