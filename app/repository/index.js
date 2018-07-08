import angular from 'angular';
import ngRoute from 'angular-route';
import ngSanitize from 'angular-sanitize';
import uiBootstrap from 'angular-ui-bootstrap';

import routing from './repository.routes';
import RepositoryListController from './repository-list-controller';
import RepositoryDetailController from './repository-detail-controller';

import services from '../services';

export default angular.module('app.features.repository', [ngRoute, ngSanitize, uiBootstrap, services])
  .config(routing)
  .controller('RepositoryListController', RepositoryListController)
  .controller('RepositoryDetailController', RepositoryDetailController)
  .name;
