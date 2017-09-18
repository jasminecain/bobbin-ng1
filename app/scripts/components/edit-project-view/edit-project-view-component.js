'use strict';

bobbin.component('editProjectComponent', {

  templateUrl: 'app/scripts/components/projects/projects.html',
  controller: function(authFactory, projectFactory, $state, $scope, $routeParams) {

    // $scope.title = 'Edit Project';
    // $scope.submitButtonText = 'Edit Item';
    // let user = authFactory.getCurrentUser();

    // $scope.project = {
    //   title: null,
    //   uid: user,
    //   img: null,
    //   description: null,
    //   url: null,
    // };

    const showEditProject = function() {
      projectFactory.getSingleProject($routeParams.itemId)
      .then((data) => {
        console.log('showEditProjectData', data);
        $scope.title = data;
        $scope.title.id = $routeParams.itemId;
      });
    };

    $scope.submitProject = function(project) {
      let userId = authFactory.getCurrentUser();
      project.uid = userId;

      projectFactory.editProject($routeParams.itemId, $scope.task)
      .then((data) => {
        console.log('submitEditedProjectData', data);
        $state.go('projects.items');
      });
    };

  }
});


// $scope.submitProject = function(project) {

//   projectFactory.addProject(project)
//     .then((data) => {
//       console.log('submitData', data);
//       $state.go('projects.items');
//     });
// };
// }
// });
