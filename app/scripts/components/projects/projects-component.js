'use strict';

bobbin.component('projectsComponent', {

  templateUrl: 'app/scripts/components/projects/projects.html',
  controller: function(authFactory, projectFactory, $state, $scope) {

    // $scope.project = {};
    let user = authFactory.getCurrentUser();

    // $rootScope.showSearch = true;
    // $scope.searchText = searchFactory;
    $scope.projects = {
        title: null,
        uid: user,
        img: null,
        description: null,
        url: null,
        // projectid: $routeParams.itemId
      };

    // $scope.init = function() {
    // $scope.getProjectData()
    //   .then((data) => {
    //     $scope.projects = data;
    //     console.log('$scope.projectdata', data)
    //     $scope.$apply();
    //     debugger;
    //     console.log($scope.user);
    //   });
    // };

    // $scope.getUserData = () => {
    //   return authFactory.getCurrentUser()
    //     .then((data) => {
    //       return data;
    //     });
    // };

    const showAllProjects = function () {
      // console.log('user', user);
      projectFactory.getAllProjects(user)
        .then((projects) => {
          console.log("showAllProjects", projects);
          $scope.projects = projects;
        });
    };

    $scope.deleteProject = function (id) {
      projectFactory.deleteProject(id)
        .then(() => {
          showAllProjects();
        });
    };

    $scope.submitProject = function(project) {
      let user = authFactory.getCurrentUser();
      project.uid = user;
      // console.log('project.uid', project.uid);
      // console.log('user', user);


      projectFactory.addProject(project)
        .then((data) => {
          console.log('submitData', data);
          $state.go('projects.items');
        });
    };

    $scope.clearForm = function() {
      $scope.project = {};
    };
    showAllProjects();
  }
});
