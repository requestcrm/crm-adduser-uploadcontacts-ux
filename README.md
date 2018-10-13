# CRMPOC

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Docker stuff


sudo docker build -t crm-uploadusers-ux .

sudo docker run -d -it -v ${PWD}:/usr/uj2angularapp -p 4202:4202 crm-uploadusers-ux (background)

sudo docker run -it -v ${PWD}:/usr/uj2angularapp -p 4202:4202 crm-uploadusers-ux  (foreground)


sudo docker login -u `dockerhub-username` -p `dockerhub-password`

sudo docker tag crm-uploadusers-ux `dockerhub-username`/crm-uploadusers-ux

sudo docker push `dockerhub-username`/crm-uploadusers-ux


---trouble shooting error(docker build): npm install from docker step
https://stackoverflow.com/questions/39592908/error-getaddrinfo-enotfound-registry-npmjs-org-registry-npmjs-org443

First, edit NetworkManager.conf file:

vim /etc/NetworkManager/NetworkManager.conf

Comment this line:

  #dns=dnsmasq

Finally

sudo service network-manager restart
sudo service docker restart

