import detailTemplate from './tag-detail.html';
import createTemplate from './create-tag.html';

/* @ngInject */
export default ($routeProvider) => {
  $routeProvider
    .when('/tag/:repositoryUser?/:repositoryName/:tagName/', {
      template: detailTemplate,
      controller: 'TagController as tag',
    })
    .when('/image/:imageId/tag/:repositoryUser?/:repositoryName?', {
      template: createTemplate,
      controller: 'CreateTagController as tag',
    });
};

