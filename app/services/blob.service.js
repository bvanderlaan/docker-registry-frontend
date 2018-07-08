/* @ngInject */
export default class BlobService {
  constructor($resource) {
    const service = $resource('/v2/:repository/blobs/:digest', {}, {
      querySize: {
        method: 'HEAD',
        interceptor: {
          response(response) {
            const res = { contentLength: parseInt(response.headers('content-length'), 10) };
            return res;
          },
        },
      },
      /** Example Response:
       * {
       *   "architecture": "amd64",
       *   "config": {},
       *   "container": "caab3f21c75adc3560754e71374cd01cb1bbe39b2b9c2809ff6c22bbcd39206c",
       *   "container_config": {},
       *   "created": "2017-04-25T03:44:24.620936172Z",
       *   "docker_version": "17.04.0-ce",
       *   "history": [
       *     {
       *       "created": "2017-04-24T19:20:41.290148217Z",
       *       "created_by": "/bin/sh -c #(nop) ADD file:712c48086043553b85ffb031d8f6c5de857a2e53974df30cdfbc1e85c1b00a25 in / "
       *     },
       *     {
       *       "created": "2017-04-24T19:20:42.022627269Z",
       *       "created_by": "/bin/sh -c #(nop)  CMD [\"/bin/bash\"]",
       *       "empty_layer": true
       *     }
       *   ],
       *   "os": "linux",
       *   "rootfs": {}
       * }
       * */
      query: {
        method: 'GET',
        transformResponse(data) {
          data = angular.fromJson(data);
          data.dockerfile = data.history.map(history => history.created_by
            .replace(new RegExp('^/bin/sh -c #\\(nop\\)\\s*'), '')
            .replace(new RegExp('^/bin/sh -c\\s*'), 'RUN ')
            .replace(/\t\t/g, '\\\n\t'));

          return data;
        },
      },
    });
    return service;
  }
}
