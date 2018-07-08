import app from './app';

describe('App', () => {
  let $route;
  let $location;
  let $rootScope;

  beforeEach(angular.mock.module(app));
  beforeEach(inject((_$route_, _$location_, _$rootScope_) => {
    $route = _$route_;
    $location = _$location_;
    $rootScope = _$rootScope_;
  }));

  it('/about should display about page', () => {
    $location.path('/about');
    $rootScope.$digest();
    expect($route.current.template.indexOf('About') !== -1).toBe(true);
  });

  it('/unknown-url should display repositories page', () => {
    $location.path('/unknown-url');
    $rootScope.$digest();

    expect($route.current.controller).toBe('RepositoryListController as repositories');
  });
});
