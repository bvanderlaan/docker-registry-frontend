/* @ngInject */
export default class AppVersionService {
  constructor($resource) {
    const service = $resource('app-version.json', {}, {
      query: {
        method: 'GET',
        isArray: false,
      },
    });
    return service;
  }
}
