import template from './home.html';

/* @ngInject */
export default ($routeProvider) => {
  $routeProvider
    .when('/home', {
      template,
      controller: 'HomeController as home',
    });
};
