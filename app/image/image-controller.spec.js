import image from '../image';

describe('ImageController', () => {
  beforeEach(angular.mock.module(image));

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

  it('should register the controller as image', () => {
    $location.path('/image/88e37c7099fa');
    $rootScope.$digest();

    expect($route.current.controller).toBe('ImageController as image');
  });
});
