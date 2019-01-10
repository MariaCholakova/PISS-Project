FROM node:8
WORKDIR /var/www/html
COPY package*.json ./
RUN npm install \
    && npm install mysql \
    && npm install cors \
    && npm install body-parser \
    && npm install --save socket.io

