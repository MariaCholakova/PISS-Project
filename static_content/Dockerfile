FROM httpd:latest
WORKDIR /usr/local/apache2/htdocs
COPY fashionDays/json/package*.json ./
RUN apt-get update && apt-get install -y curl gnupg\
    && curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs \
    && npm install --save socket.io-client

