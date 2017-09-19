'use strict';

bobbin.component('projectDetailComponent', {

  templateUrl: 'app/scripts/components/project-detail/project-detail.html',
  controller: function($scope, $state, authFactory, projectFactory) {

    $scope.projectId = $state.params.projectId;

    $scope.init = function() {
      $scope.getProject($scope.projectId);
    };

    $scope.getProject = function(projectId) {
      projectFactory.getSingleProject(projectId)
        .then((data) => {
          console.log('SingleProject: ', data);
          $scope.project = data;
        });
    };

    $scope.toEditProjectView = function() {
      $state.go('editProject.view', { projectId: $scope.projectId });
    };

  }
});
