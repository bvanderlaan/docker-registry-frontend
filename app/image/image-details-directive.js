import angular from 'angular';

import template from './image-details-directive.html';

function imageDetails() {
  return {
    template,
    restrict: 'E',
    controller: 'ImageController as image',
  };
}

export default angular.module('directives.imageDetails', [])
  .directive('imageDetails', imageDetails)
  .name;
