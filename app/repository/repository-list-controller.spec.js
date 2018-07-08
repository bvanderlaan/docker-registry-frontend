import repository from '../repository';

describe('RepositoryListController', () => {
  // load the controller's module
  beforeEach(angular.mock.module(repository));

  let $controller;
  let $httpBackend;
  let $q;
  let $rootScope;
  let $location;
  let $route;

  beforeEach(inject((_$controller_, _$httpBackend_, _$q_, _$rootScope_, _$location_, _$route_) => {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    $q = _$q_;
    $rootScope = _$rootScope_;
    $location = _$location_;
    $route = _$route_;
  }));

  it('should attach some keys to the scope', () => {
    const $scope = $rootScope.$new();
    const route = {
      current: {
        params: {
          lastNamespace: 'lastNamespace',
          lastRepository: 'lastRepository',
          reposPerPage: 10,
        },
      },
    };

    const mockRepositoryReturnValue = {
      repos: [{ username: 'username', name: 'name', selected: true }],
      lastRepository: 'lastNamespace/lastRepository',
    };
    const mockRepository = { query: null };
    spyOn(mockRepository, 'query').and.returnValue({ $promise: $q.when(mockRepositoryReturnValue) });

    const expectedAppMode = {
      browseOnly: true,
      defaultRepositoriesPerPage: 20,
      defaultTagsPerPage: 10,
    };
    $httpBackend.expectGET('app-mode.json').respond(expectedAppMode);

    const controller = $controller('RepositoryListController', { $scope, $route: route, Repository: mockRepository });
    $httpBackend.flush();

    expect(controller.reposPerPage).toBe(10);
    expect(controller.currentLastRepository).toEqual('lastNamespace\\lastRepository');
    expect(controller.selectedRepositories).toEqual(['name']);
    expect(mockRepository.query).toHaveBeenCalled();
    expect(controller.repositories).toEqual(mockRepositoryReturnValue);
  });

  it('/repositories/20 should display repository list page', () => {
    $location.path('/repositories/20');
    $rootScope.$digest();

    expect($route.current.controller).toBe('RepositoryListController as repositories');

    const controller = $controller('RepositoryListController', { $scope: {} });
    expect(controller.reposPerPage).toBe(20);
  });

  it('/repositories should display repository list page', () => {
    $location.path('/repositories');
    $rootScope.$digest();

    expect($route.current.controller).toBe('RepositoryListController as repositories');

    const controller = $controller('RepositoryListController', { $scope: {} });
    expect(controller.reposPerPage).toBeUndefined();
  });

  it('/repositories/10 should display repository list page', () => {
    $location.path('/repositories/10');
    $rootScope.$digest();

    expect($route.current.controller).toBe('RepositoryListController as repositories');

    const controller = $controller('RepositoryListController', { $scope: {} });
    expect(controller.reposPerPage).toBe(10);
  });
});

