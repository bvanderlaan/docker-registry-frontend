import main from '../main';

describe('MainController', () => {
  // load the controller's module
  beforeEach(angular.mock.module(main));

  let $httpBackend;
  let controller;

  beforeEach(inject(($controller, _$httpBackend_) => {
    controller = $controller('MainController');
    $httpBackend = _$httpBackend_;
  }));

  it('should attach an appVersion and registryHost to the scope', () => {
    const expectedAppVersion = { git: { sha1: 'foo', ref: 'bar' } };
    const expectedRegistryHost = { host: 'path-to-your-registry', port: 80 };

    $httpBackend.expectGET('app-version.json').respond(expectedAppVersion);
    $httpBackend.expectGET('registry-host.json').respond(expectedRegistryHost);
    $httpBackend.flush();
    jasmine.addCustomEqualityTester(angular.equals);
    expect(controller.appVersion).toEqual(expectedAppVersion);
    expect(controller.registryHost).toEqual(expectedRegistryHost);
  });
});
