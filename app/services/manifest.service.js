function handelSchemaV1(data) {
  // https://docs.docker.com/registry/spec/manifest-v2-1/
  /** Response example:
   * {
   *   "schemaVersion": 1,
   *   "name": "arthur/busybox",
   *   "tag": "demo",
   *   "architecture": "amd64",
   *   "fsLayers": [
   *     {
   *       "blobSum": "sha256:a3ed95caeb02ffe68cdd9fd84406680ae93d633cb16422d00e8a7c22955b46d4"
   *     },
   *     {
   *       "blobSum": "sha256:d7e8ec85c5abc60edf74bd4b8d68049350127e4102a084f22060f7321eac3586"
   *     }
   *   ],
   *   "history": [
   *     {
   *       "v1Compatibility": "{\"id\":\"3e1018ee907f25aef8c50016296ab33624796511fdbfdbbdeca6a3ed2d0ba4e2\",\"parent\":\"176dfc9032a1ec3ac8586b383e325e1a65d1f5b5e6f46c2a55052b5aea8310f7\",\"created\":\"2016-01-12T17:47:39.251310827Z\",\"container\":\"2732d16efa11ab7da6393645e85a7f2070af94941a782a69e86457a2284f4a69\",\"container_config\":{\"Hostname\":\"ea7fe68f39fd\",\"Domainname\":\"\",\"User\":\"\",\"AttachStdin\":false,\"AttachStdout\":false,\"AttachStderr\":false,\"Tty\":false,\"OpenStdin\":false,\"StdinOnce\":false,\"Env\":[\"PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin\"],\"Cmd\":[\"/bin/sh\",\"-c\",\"#(nop) LABEL awesome=Not yet!\"],\"Image\":\"176dfc9032a1ec3ac8586b383e325e1a65d1f5b5e6f46c2a55052b5aea8310f7\",\"Volumes\":null,\"WorkingDir\":\"\",\"Entrypoint\":null,\"OnBuild\":[],\"Labels\":{\"awesome\":\"Not yet!\",\"test\":\"yes\",\"working\":\"true\"}},\"docker_version\":\"1.9.1\",\"author\":\"Arthur\",\"config\":{\"Hostname\":\"ea7fe68f39fd\",\"Domainname\":\"\",\"User\":\"\",\"AttachStdin\":false,\"AttachStdout\":false,\"AttachStderr\":false,\"Tty\":false,\"OpenStdin\":false,\"StdinOnce\":false,\"Env\":[\"PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin\"],\"Cmd\":[\"sh\"],\"Image\":\"176dfc9032a1ec3ac8586b383e325e1a65d1f5b5e6f46c2a55052b5aea8310f7\",\"Volumes\":null,\"WorkingDir\":\"\",\"Entrypoint\":null,\"OnBuild\":[],\"Labels\":{\"awesome\":\"Not yet!\",\"test\":\"yes\",\"working\":\"true\"}},\"architecture\":\"amd64\",\"os\":\"linux\"}"
   *     },
   *     {
   *       "v1Compatibility": "{\"id\":\"5c5fb281b01ee091a0fffa5b4a4c7fb7d358e7fb7c49c263d6d7a4e35d199fd0\",\"created\":\"2015-12-08T18:31:50.979824705Z\",\"container\":\"ea7fe68f39fd0df314e841247fb940ddef4c02ab7b5edb0ee724adc3174bc8d9\",\"container_config\":{\"Hostname\":\"ea7fe68f39fd\",\"Domainname\":\"\",\"User\":\"\",\"AttachStdin\":false,\"AttachStdout\":false,\"AttachStderr\":false,\"Tty\":false,\"OpenStdin\":false,\"StdinOnce\":false,\"Env\":null,\"Cmd\":[\"/bin/sh\",\"-c\",\"#(nop) ADD file:c295b0748bf05d4527f500b62ff269bfd0037f7515f1375d2ee474b830bad382 in /\"],\"Image\":\"\",\"Volumes\":null,\"WorkingDir\":\"\",\"Entrypoint\":null,\"OnBuild\":null,\"Labels\":null},\"docker_version\":\"1.8.3\",\"config\":{\"Hostname\":\"ea7fe68f39fd\",\"Domainname\":\"\",\"User\":\"\",\"AttachStdin\":false,\"AttachStdout\":false,\"AttachStderr\":false,\"Tty\":false,\"OpenStdin\":false,\"StdinOnce\":false,\"Env\":null,\"Cmd\":null,\"Image\":\"\",\"Volumes\":null,\"WorkingDir\":\"\",\"Entrypoint\":null,\"OnBuild\":null,\"Labels\":null},\"architecture\":\"amd64\",\"os\":\"linux\",\"Size\":1113436}"
   *     }
   *   ],
   * }
   * */

  let res = {};
  const history = data.history.map(h => angular.fromJson(h.v1Compatibility))
    .filter(h => h !== undefined)
    .map(h => ({
      id: h.id,
      os: h.os,
      docker_version: h.docker_version,
      created: h.created,
      author: h.author,
      labels: h.config && h.config.Labels,
      layerCmd: h.container_config && h.container_config.Cmd.join(' ')
        .replace(/^\/bin\/sh -c #\(nop\)\s*/, '')
        .replace('/bin/sh -c', 'RUN')
        .replace(/\t\t/g, '\\\n\t'),
    }));

  const dockerFile = history.map(h => h.layerCmd).reverse();

  if (history.length > 0) {
    res = history.shift();
    res.history = history;
  }

  res.dockerfile = dockerFile;
  res.layers = dockerFile.length;
  res.fsLayers = data.fsLayers;
  res.architecture = data.architecture;

  return res;
}

function handelSchemaV2(data) {
  // https://docs.docker.com/registry/spec/manifest-v2-2/#image-manifest-field-descriptions
  /** Response example:
   * {
   *   "schemaVersion": 2,
   *   "mediaType": "application/vnd.docker.distribution.manifest.v2+json",
   *   "config": {
   *     "mediaType": "application/vnd.docker.container.image.v1+json",
   *     "size": 7023,
   *     "digest": "sha256:b5b2b2c507a0944348e0303114d8d93aaaa081732b86451d9bce1f432a537bc7"
   *   },
   *   "layers": [
   *     {
   *       "mediaType": "application/vnd.docker.image.rootfs.diff.tar.gzip",
   *       "size": 32654,
   *       "digest": "sha256:e692418e4cbaf90ca69d05a66403747baa33ee08806650b51fab815ad7fc331f"
   *     },
   *     {
   *       "mediaType": "application/vnd.docker.image.rootfs.diff.tar.gzip",
   *       "size": 16724,
   *       "digest": "sha256:3c3a4604a545cdc127456d94e421cd355bca5b528f4a9c1905b15da2eb4a4c6b"
   *     },
   *     {
   *       "mediaType": "application/vnd.docker.image.rootfs.diff.tar.gzip",
   *       "size": 73109,
   *       "digest": "sha256:ec4b8955958665577945c89419d1af06b5f7636b4ac3da7f12184802ad867736"
   *     }
   *    ]
   *   }
   * */

  const res = {
    id: data.config.digest.replace(/^sha256:/, ''),
  };

  res.size = data.layers.reduce((size, layer) => size + layer.size, data.config.size);

  return res;
}

/* @ngInject */
export default class ManifestService {
  constructor($resource) {
    const service = $resource('/v2/:repository/manifests/:tagName', {}, {
      query: {
        method: 'GET',
        headers: {
          accept: 'application/vnd.docker.distribution.manifest.v2+json',
        },
        isArray: false,
        transformResponse(data, headers) {
          const resp = angular.fromJson(data);
          const isSchemaV2 = (headers('content-type') === 'application/vnd.docker.distribution.manifest.v2+json');
          const res = isSchemaV2
            ? handelSchemaV2(resp)
            : handelSchemaV1(resp);
          res.digest = headers('docker-content-digest');
          res.isSchemaV2 = isSchemaV2;

          return res;
        },
      },
      delete: {
        url: '/v2/:repository/manifests/:digest',
        method: 'DELETE',
      },
    });
    return service;
  }
}
