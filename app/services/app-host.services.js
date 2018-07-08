/* @ngInject */
export default class RegistryHostService {
  constructor($resource) {
    const service = $resource('registry-host.json', {}, {
      query: {
        method: 'GET',
        isArray: false,
      },
    });
    return service;
  }
}
