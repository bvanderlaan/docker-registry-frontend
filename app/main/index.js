import angular from 'angular';
import ngRoute from 'angular-route';

import MainController from './main-controller';

import services from '../services';

export default angular.module('app.features.main', [ngRoute, services])
  .controller('MainController', MainController)
  .name;
