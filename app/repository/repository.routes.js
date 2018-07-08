import listTemplate from './repository-list.html';
import detailTemplate from './repository-detail.html';

/* @ngInject */
export default ($routeProvider) => {
  $routeProvider
    .when('/repositories/:reposPerPage?/:lastNamespace?/:lastRepository?', {
      template: listTemplate,
      controller: 'RepositoryListController as repositories',
    })
    .when('/repository/:repositoryUser/:repositoryName', {
      template: detailTemplate,
      controller: 'RepositoryDetailController as repository',
    })
    .when('/repository/:repositoryName', {
      template: detailTemplate,
      controller: 'RepositoryDetailController as repository',
    });
};
