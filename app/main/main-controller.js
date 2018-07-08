/* @ngInject */
export default class MainController {
  constructor($route, $routeParams, $location, AppVersion, RegistryHost) {
    this.$route = $route;
    this.$location = $location;
    this.$routeParams = $routeParams;
    this.appVersion = AppVersion.query();
    this.registryHost = RegistryHost.query();
  }
}
