import repository from '../repository';

describe('RepositoryDetailController', () => {
  beforeEach(angular.mock.module(repository));

  let $route;
  let $location;
  let $rootScope;
  let $controller;

  beforeEach(inject((_$controller_, _$route_, _$location_, _$rootScope_) => {
    $route = _$route_;
    $location = _$location_;
    $rootScope = _$rootScope_;
    $controller = _$controller_;
  }));

  it('URL with repositoryName but no repositoryUser and tagsPerPage should display repository detail page', () => {
    $location.path('/repository/cx');
    $location.search('tagsPerPage', 10);
    $rootScope.$digest();

    expect($route.current.controller).toBe('RepositoryDetailController as repository');

    const $scope = {};
    const controller = $controller('RepositoryDetailController', { $scope });
    expect(controller.repositoryUser).toBeUndefined();
    expect(controller.repositoryName).toBe('cx');
    expect(controller.repository).toBe('cx');
  });

  it('URL with repositoryName but no repositoryUser and no tagsPerPage should display repository detail page', () => {
    $location.path('/repository/cx');
    $rootScope.$digest();

    expect($route.current.controller).toBe('RepositoryDetailController as repository');
  });

  it('URL with repositoryUser and repositoryName and tagsPerPage should display repository detail page', () => {
    $location.path('/repository/owner/name');
    $location.search('tagsPerPage', 10);
    $rootScope.$digest();

    expect($route.current.controller).toBe('RepositoryDetailController as repository');

    const controller = $controller('RepositoryDetailController');
    expect(controller.repositoryUser).toBe('owner');
    expect(controller.repositoryName).toBe('name');
    expect(controller.repository).toBe('owner/name');
  });

  it('URL with repositoryUser and repositoryName and no tagsPerPage should display repository detail page', () => {
    $location.path('/repository/owner/name');
    $rootScope.$digest();

    expect($route.current.controller).toBe('RepositoryDetailController as repository');

    const controller = $controller('RepositoryDetailController');
    expect(controller.repositoryUser).toBe('owner');
    expect(controller.repositoryName).toBe('name');
    expect(controller.repository).toBe('owner/name');
    expect(controller.maxTagsPage).toBeUndefined();
  });
});
