'use strict';

bobbin.component('projectsComponent', {

  templateUrl: 'app/scripts/components/projects/projects.html',
  controller: function(authFactory, projectFactory, $state, $scope) {

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
          console.log('submitData', data);
        });
    };
  }
});
