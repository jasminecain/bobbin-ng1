'use strict';

bobbin.component('projectsComponent', {

  templateUrl: 'app/scripts/components/projects/projects.html',
  controller: function(authFactory, projectFactory, $state, $scope, $window) {

    let user = authFactory.getCurrentUser();

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

    $scope.deleteProject = function(project) {
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
  }
});
