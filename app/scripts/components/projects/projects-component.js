'use strict';

bobbin.component('projectsComponent', {

  templateUrl: 'app/scripts/components/projects/projects.html',
  controller: function(authFactory, projectFactory, $state, $scope) {

    $scope.project = {};

    // $scope.project = {
      //   title: null,
      //   uid: user,
      //   img: null,
      //   description: null,
      //   url: null,
      // };

    $scope.submitProject = function(project) {
      let userId = authFactory.getCurrentUser();
      project.uid = userId;

      projectFactory.addProject(project)
        .then((data) => {
          console.log('submitData', data);
          $state.go('projects.items');
        });
    };

    $scope.clearForm = function() {
      $scope.project = {};
    };

  }
});
