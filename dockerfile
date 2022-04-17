FROM node:16.14.2
WORKDIR /dockerDist
COPY package*.json ./
RUN npm install
EXPOSE 8080
