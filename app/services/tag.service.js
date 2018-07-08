/* @ngInject */
export default class TagService {
  constructor($resource) {

    // TODO: rename :repo to repoUser/repoString for convenience.
    // https://github.com/docker/distribution/blob/master/docs/spec/api.md#listing-image-tags

    const service = $resource('/v2/:repoUser/:repoName/tags/list', {}, {
      // Response example:
      // {"name":"kkleine/docker-registry-frontend","tags":["v2", "v1-deprecated"]}
      query: {
        method: 'GET',
        isArray: true,
        transformResponse(data) {
          const res = [];
          const resp = angular.fromJson(data);
          for (const idx in resp.tags) {
            res.push({
              name: resp.tags[idx],
              imageId: `ImageIDOf${resp.tags[idx]}`,
              selected: false,
            });
          }
          return res;
        },
      },
      exists: {
        url: '/v1/repositories/:repoUser/:repoName/tags/:tagName',
        method: 'GET',
        transformResponse(data) {
          // data will be the image ID if successful or an error object.
          data = angular.isString(angular.fromJson(data));
          return data;
        },
      },
      // Usage: Tag.save({repoUser:'someuser', repoName: 'someRepo', tagName: 'someTagName'}, imageId);
      save: {
        method: 'PUT',
        url: '/v1/repositories/:repoUser/:repoName/tags/:tagName',
      },
    });
    return service;
  }
}
