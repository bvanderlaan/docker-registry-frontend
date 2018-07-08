/* @ngInject */
export default class DeleteRepositoryController {
  constructor($route, $modalInstance, $window, Repository, items, information, toastr) {
    this.items = items;
    this.information = information;
    this.$route = $route;
    this.$modalInstance = $modalInstance;
    this.$window = $window;
    this.Repository = Repository;
    this.toastr = toastr;
  }

  // Callback that triggers deletion of tags and reloading of page
  ok() {
    angular.forEach(this.items, (value) => {
      const repoStr = value;
      const repoUser = value.split('/')[0];
      const repoName = value.split('/')[1];

      const repo = {
        repoUser,
        repoName,
      };

      this.Repository.delete(
        repo,
        // success
        () => this.toastr.success(`Deleted repository: ${repoStr}`),
        // error
        (httpResponse) => {
          this.toastr.error(`Failed to delete repository: ${repoStr} Response: ${httpResponse.statusText}`);
        },
      );
    });

    this.$modalInstance.close();

    // Go to the repositories page
    this.$window.location.href = 'repositories';
    this.$route.reload();
  }

  cancel() {
    this.$modalInstance.dismiss('cancel');
  }
}
