'use strict';

bobbin.component('projectsComponent', {

  templateUrl: 'app/scripts/components/projects/projects.html',
  controller: function(authFactory, projectFactory, $state, $scope) {

    $scope.title = 'New Project';
    $scope.submitButtonText = 'Add New Project';
    let user = authFactory.getCurrentUser();

    $scope.project = {
      title: null,
      uid: user,
      img: null,
      description: null,
      url: null,
    };

    $scope.submitProject = function() {
      projectFactory.addProject($scope.project)
      .then((data) => {
        $state.go('projects.items');
        console.log('data', data);
      });
    };

  }
});
