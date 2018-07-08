import tags from '../tag';

function buildRoute() {
  return {
    current: {
      params: {
        repositoryName: 'nginx',
        tagName: 'latest',
        tagsPerPage: 10,
      },
    },
  };
}

function mockTagService($q) {
  const mockTagReturnValue = [];
  const mockTag = { query: null };
  spyOn(mockTag, 'query').and.returnValue({ $promise: $q.when(mockTagReturnValue) });

  return mockTag;
}

function mockAppMode($httpBackend) {
  const expectedAppMode = {
    browseOnly: true,
    defaultRepositoriesPerPage: 20,
    defaultTagsPerPage: 10,
  };
  $httpBackend.expectGET('app-mode.json').respond(expectedAppMode);
}

function mockRegistryHost($httpBackend) {
  const expectedRegistryHost = { host: 'path-to-your-registry', port: 80 };
  $httpBackend.expectGET('registry-host.json').respond(expectedRegistryHost);
}

describe('TagController', () => {
  // load the controller's module
  beforeEach(angular.mock.module(tags));

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

  it('/tag/repositoryName/latest should display tag detail page', () => {
    $location.path('/tag/repositoryName/latest');
    $rootScope.$digest();

    expect($route.current.controller).toBe('TagController as tag');
  });

  it('/tag/repositoryUser/repositoryName/latest should display tag detail page', () => {
    $location.path('/tag/repositoryUser/repositoryName/latest');
    $rootScope.$digest();

    expect($route.current.controller).toBe('TagController as tag');

    const $scope = {};
    const controller = $controller('TagController', { $scope });
    expect(controller.repositoryUser).toBe('repositoryUser');
    expect(controller.repositoryName).toBe('repositoryName');
    expect(controller.repository).toBe('repositoryUser/repositoryName');
    expect(controller.tagName).toBe('latest');
  });

  describe('Sorting', () => {
    it('should sort tags Ascending', () => {
      const $scope = $rootScope.$new();
      const route = buildRoute();
      const mockTag = mockTagService($q);

      mockRegistryHost($httpBackend);
      mockAppMode($httpBackend);

      const controller = $controller('TagController', { $scope, $route: route, Tag: mockTag });
      $httpBackend.flush();
      controller.displayedTags = [{
        name: 'aaa',
        details: {
          created: '2015-03-25',
        },
      }, {
        name: 'bbb',
        details: {
          created: '2015-03-20',
        },
      }];
      expect(controller.orderByCreated).toBeTruthy();

      controller.sortTags();
      expect(controller.displayedTags).toEqual([{
        name: 'bbb',
        details: {
          created: '2015-03-20',
        },
      }, {
        name: 'aaa',
        details: {
          created: '2015-03-25',
        },
      }]);
      expect(controller.orderByCreated).toBeFalsy();
    });

    it('should sort tags Descending', () => {
      const $scope = $rootScope.$new();
      const route = buildRoute();
      const mockTag = mockTagService($q);

      mockRegistryHost($httpBackend);
      mockAppMode($httpBackend);

      const controller = $controller('TagController', { $scope, $route: route, Tag: mockTag });
      $httpBackend.flush();
      controller.displayedTags = [{
        name: 'aaa',
        details: {
          created: '2015-03-25',
        },
      }, {
        name: 'bbb',
        details: {
          created: '2015-03-20',
        },
      }];
      controller.orderByCreated = false;
      expect(controller.orderByCreated).toBeFalsy();

      controller.sortTags();
      expect(controller.displayedTags).toEqual([{
        name: 'aaa',
        details: {
          created: '2015-03-25',
        },
      }, {
        name: 'bbb',
        details: {
          created: '2015-03-20',
        },
      }]);
      expect(controller.orderByCreated).toBeTruthy();
    });
  });
});

