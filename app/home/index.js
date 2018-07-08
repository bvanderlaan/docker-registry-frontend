import angular from 'angular';
import ngRoute from 'angular-route';

import routing from './home.routes';
import HomeController from './home-controller';

import services from '../services';

export default angular.module('app.features.home', [ngRoute, services])
  .config(routing)
  .controller('HomeController', HomeController)
  .name;
