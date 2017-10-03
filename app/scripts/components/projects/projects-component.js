'use strict';

bobbin.component('projectsComponent', {

  templateUrl: 'app/scripts/components/projects/projects.html',
  controller: function(authFactory, projectFactory, $state, $scope, $window) {

    let user = authFactory.getCurrentUser();
    $scope.deleteItem = null;

    $scope.init = function() {
      $scope.showAllProjects();
    };

    $scope.showAllProjects = function () {
      projectFactory.getAllProjects(user.uid)
        .then((projects) => {
          // console.log("showAllProjects", projects);
          $scope.projects = projects;
        });
    };

    // $('.carousel.carousel-slider').carousel({ fullWidth: true, duration: 200 });

    $scope.submitProject = function(project) {
      project.uid = user.uid;

      projectFactory.addProject(project)
        .then((data) => {
          console.log('submitData', data);
          $scope.showAllProjects();
          $scope.clearForm();
          $window.Materialize.toast('Project Created!', 2000);
        });
    };

    // function created; which project to delete
    // gain access to project outside of ng-repeat
    $scope.selectProjectForDelete = function(project) {
      // debugger;
      // project is accessible when passed into $scope.deleteItem
      $scope.deleteItem = project;
    };

    $scope.deleteProject = function(project) {
      // debugger;
      projectFactory.deleteProject(project.id)
        .then(() => {
          $scope.showAllProjects();
        });
    };

    $scope.clearForm = function() {
      $scope.project = {};
    };

    $scope.emailShare = function(project) {
      $window.open('mailto:' + '' + '?subject=' + 'Check out my latest project' + '&body=' + project.title + ' - ' + project.url, '_self');
    };

    $scope.NoBackBtn = function(project) {
      $scope.showAllProjects();
    };
  }
});
