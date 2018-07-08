import tags from '../tag';

const mockRepositories = ($q) => {
  const mockRepositoryReturnValue = {
    repos: [{ username: 'username', name: 'name', selected: true }],
    lastRepository: 'lastNamespace/lastRepository',
  };
  const mockRepository = { query: null };
  spyOn(mockRepository, 'query').and.returnValue({ $promise: $q.when(mockRepositoryReturnValue) });

  return mockRepository;
};

describe('CreateTagController', () => {
  beforeEach(angular.mock.module(tags));

  let $httpBackend;
  let $route;
  let $location;
  let $rootScope;
  let $controller;
  let $q;

  beforeEach(inject((_$controller_, _$httpBackend_, _$route_, _$location_, _$q_, _$rootScope_) => {
    $httpBackend = _$httpBackend_;
    $route = _$route_;
    $location = _$location_;
    $rootScope = _$rootScope_;
    $controller = _$controller_;
    $q = _$q_;
  }));

  it('should attach an appMode to the scope', () => {
    const mockRepository = mockRepositories($q);

    const expectedAppMode = {
      browseOnly: true,
      defaultRepositoriesPerPage: 20,
      defaultTagsPerPage: 10,
    };

    const route = {
      current: {
        params: {
          lastNamespace: 'lastNamespace',
          lastRepository: 'lastRepository',
          reposPerPage: 10,
        },
      },
    };

    const controller = $controller('CreateTagController', { $route: route, Repository: mockRepository });
    $httpBackend.expectGET('app-mode.json').respond(expectedAppMode);
    $httpBackend.flush();
    jasmine.addCustomEqualityTester(angular.equals);

    expect(controller.appMode).toEqual(expectedAppMode);
  });

  it('should register the controller as tag', () => {
    $location.path('/image/88e37c7099fa/tag');
    $rootScope.$digest();

    expect($route.current.controller).toBe('CreateTagController as tag');
  });
});
