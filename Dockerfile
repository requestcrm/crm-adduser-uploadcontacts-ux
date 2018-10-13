FROM node:9.6.1
LABEL maintainer="Prasad"

RUN mkdir /usr/uj2angularapp
WORKDIR /usr/uj2angularapp

RUN npm install -g @angular/cli@6.0.8

COPY . /usr/uj2angularapp

CMD ng serve --host 0.0.0.0 --port 4202
