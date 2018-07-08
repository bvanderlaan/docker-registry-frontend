/* @ngInject */
export default class HomeController {
  constructor(AppMode) {
    this.appMode = AppMode.query();
  }
}
