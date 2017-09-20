'use strict';

bobbin.component('editProjectComponent', {

  templateUrl: 'app/scripts/components/project-edit/project-edit.html',
  controller: function(authFactory, projectFactory, $state, $scope, $window) {


    $scope.init = function() {
      //grabbing params of projectId on the current state
      $scope.getProject($state.params.projectId);
    };

    $scope.getProject = function(projectId) {
      projectFactory.getSingleProject(projectId)
        .then((data) => {
          console.log('SingleProject: ', data);
          $scope.project = data;
        });
    };

    $scope.updateProject = function(project) {
      projectFactory.editProject($state.params.projectId, project)
      .then((data) => {
        console.log('updateProject: ', data);
        $window.Materialize.toast('Project Updated!', 2000);
      });
    };

    $scope.backBtn = function() {
      //equivalent to back button
      $window.history.back();
    };
  }
});
