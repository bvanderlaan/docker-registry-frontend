import angular from 'angular';

import template from './tag-list-directive.html';

function tagList() {
  return {
    template,
    restrict: 'E',
    controller: 'TagController as tag',
  };
}

export default angular.module('directives.tagList', [])
  .directive('tagList', tagList)
  .name;
