import angular from 'angular';
import ngRoute from 'angular-route';
import cfpLoadingBarProvider from 'angular-loading-bar';
import ngFilter from 'angular-filter';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';

import routing from './app.config';
import services from './services';
import home from './home';
import image from './image';
import main from './main';
import repository from './repository';
import tag from './tag';

export default angular.module('docker-registry-frontend', [
  cfpLoadingBarProvider,
  ngFilter,
  ngRoute,
  services,
  home,
  image,
  main,
  repository,
  tag,
])
  .config(routing)
  .name;
