function getNextLink(linkHeader) {
  return linkHeader.split(',').filter(l => /rel="next"/.test(l))[0];
}

function getURL(link) {
  const regex = /<(.+)>;/g;
  const url = link ? regex.exec(link) : undefined;
  return url ? url[1] : undefined;
}

function getLast(link) {
  const regex = /last=(.+)&/g;
  return link ? regex.exec(link)[1] : undefined;
}

/**
 *  Extract the "last=" part from Link header:
 *
 *   Link: </v2/_catalog?last=namespace%2Frepository&n=10>; rel="next"
 *
 * We only want to extract the "last" part and store it like this
 *
 *   lastRepository = namespace/repository
 * */
function linkParser(linkHeader) {
  let repository;
  let last;
  let link;
  let url;

  if (linkHeader) {
    link = getNextLink(linkHeader);
    url = getURL(link);
    last = getLast(url);
    repository = last ? last.replace('%2F', '/') : undefined;
  }

  return { repository };
}


/* Repository returns:
 *
 *   {
 *     repos: [
 *       {username: 'SomeNamespace', name: 'SomeNamespace/SomeRepo1', selected: true|false},
 *       {username: 'SomeOtherNamespace', name: 'SomeOtherNamespace/SomeRepo2', selected: true|false},
 *       {username: 'SomeCompletelyDifferenNamespace', name: 'SomeCompletelyDifferenNamespace/SomeRepo3', selected: true|false}
 *     ],
 *     nextLink: '/v2/_catalog?last=SomeNamespace%F2SomeRepo&n=1'
 *   }
 *
 * The "nextLink" element is a preparation for supporting pagination
 * (see https: *github.com/docker/distribution/blob/master/docs/spec/api.md#pagination)
 *
 * On subsequent calls to "Repository()" you may pass in "n" as the number of
 * elements per page as well as "last" which is the "nextLink" from the last
 * call to Repository.
 */

/* @ngInject */
 export default class RepositoryService {
  constructor($resource) {
    const service = $resource('/v2/_catalog?n=:n&last=:last', {}, {
      query: {
        method: 'GET',
        isArray: false,
        transformResponse(data, headers, status) {
          if (status !== 200) {
            return {
              repos: [],
              lastRepository: undefined,
            };
          }

          const repos = angular.fromJson(data).repositories;
          const last = linkParser(headers().link);
          const ret = {
            repos: [],
            lastRepository: last.repository,
          };

          angular.forEach(repos, (value) => {
            ret.repos.push({
              username: `${value.split('/')[0]}`,
              name: value,
              selected: false,
            });
          });

          return ret;
        },
      },
      delete: {
        url: '/v2/repositories/:repoUser/:repoName/',
        method: 'DELETE',
      },
    });
    return service;
  }
}
