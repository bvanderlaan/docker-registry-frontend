import angular from 'angular';
import ngRoute from 'angular-route';

import routing from './image.routes';
import ImageController from './image-controller';
import imageDetails from './image-details-directive';

export default angular.module('app.features.image', [ngRoute, imageDetails])
  .config(routing)
  .controller('ImageController', ImageController)
  .name;
