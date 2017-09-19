'use strict';

bobbin.component('editProjectComponent', {

  templateUrl: 'app/scripts/components/project-edit/project-edit.html',
  controller: function(authFactory, projectFactory, $state, $scope) {

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

    $scope.updateProject = function(project) {
      projectFactory.editProject(project)
      .then((data) => {
        console.log('updateProject: ', data);
        $scope.project = data;
      });
    };

  }
});
