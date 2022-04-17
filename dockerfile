# FROM node:16.14.2
# WORKDIR /dockerDist
# COPY package*.json ./
# RUN npm install
# EXPOSE 8080

FROM nginx:alpine
COPY dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/
