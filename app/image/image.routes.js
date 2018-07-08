import template from './image-detail.html';

/* @ngInject */
export default ($routeProvider) => {
  $routeProvider
    .when('/image/:imageId', {
      template,
      controller: 'ImageController as image',
    });
};

