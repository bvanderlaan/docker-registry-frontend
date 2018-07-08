import angular from 'angular';
import ngRoute from 'angular-route';
import uiBootstrap from 'angular-ui-bootstrap';

import routing from './tag.routes';
import TagController from './tag-controller';
import CreateTagController from './create-tag-controller';
import DeleteTagController from './delete-tags-controller';
import tagListDirective from './tag-list-directive';

import services from '../services';

export default angular.module('app.features.tag', [ngRoute, uiBootstrap, tagListDirective, services])
  .config(routing)
  .controller('TagController', TagController)
  .controller('CreateTagController', CreateTagController)
  .controller('DeleteTagController', DeleteTagController)
  .name;
