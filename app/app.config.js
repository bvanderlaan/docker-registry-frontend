import template from './about.html';

/* @ngInject */
export default ($locationProvider, $routeProvider, $resourceProvider, cfpLoadingBarProvider) => {
  $locationProvider.html5Mode(true);

  // Don't show the spinner when making XHR requests.
  // Also, show the bar only if an XHR request takes longer than 50ms.
  cfpLoadingBarProvider.includeSpinner = false;
  cfpLoadingBarProvider.latencyThreshold = 10;

  // Don't strip trailing slashes from calculated URLs
  $resourceProvider.defaults.stripTrailingSlashes = false;

  $routeProvider.when('/about', { template })
    .otherwise({
      redirectTo: '/repositories/20',
    });
};
