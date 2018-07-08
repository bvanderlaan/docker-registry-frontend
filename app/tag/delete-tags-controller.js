/* @ngInject */
export default class DeleteTagsController {
  constructor($modalInstance, $window, Manifest, items, information) {
    this.items = items;
    this.information = information;
    this.$modalInstance = $modalInstance;
    this.$window = $window;
    this.Manifest = Manifest;
  }

  ok() {
    angular.forEach(this.items, (value) => {
      const repository = value.split(':')[0];
      const tagName = value.split(':')[1];

      this.Manifest.query({
        repository,
        tagName,
      }).$promise.then((data) => {
        this.Manifest.delete({
          repository,
          digest: data.digest,
        }).$promise.then(() => {
          this.$window.location.href = `/repository/${repository}`;
        });
      });
    });
    this.$modalInstance.close();
  }

  cancel() {
    this.$modalInstance.dismiss('cancel');
  }
}
