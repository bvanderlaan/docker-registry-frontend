import angular from 'angular';
import ngResource from 'angular-resource';

import appModeService from './app-mode-services';
import appVersionService from './app-version-services';
import appHostService from './app-host.services';
import blobService from './blob.service';
import manifestService from './manifest.service';
import repositoryService from './registry-services';
import tagService from './tag.service';

export default angular.module('app.services', [ngResource])
  .service('AppMode', appModeService)
  .service('AppVersion', appVersionService)
  .service('RegistryHost', appHostService)
  .service('Blob', blobService)
  .service('Manifest', manifestService)
  .service('Repository', repositoryService)
  .service('Tag', tagService)
  .name;
