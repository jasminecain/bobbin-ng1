'use strict';

bobbin.component('projectDetailComponent', {

  templateUrl: 'app/scripts/components/project-detail/project-detail.html',
  controller: function($scope, $state, authFactory, projectFactory, $window, $timeout) {

    $scope.projectId = $state.params.projectId;
    $scope.supplyFields =[{ id: 'field1' }];

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

    $scope.printSupplyList = function() {
      $window.print();
    };

    // opening email share on click
    $scope.emailShare = function(project) {
      $window.open('mailto:' + '' + '?subject=' + 'Check out my latest project' + '&body=' + project.title + ' - ' + project.url, '_self');
    };

    $scope.addNextItem = function(e) {
      //if enterkey pressed & there's a value is not equal to empty ''
      //do not want to fire if there's no value
      if(e.which === 13 && e.currentTarget.value !== '') {
        const supplies = [];
        let fieldId = `field${$scope.supplyFields.length + 1}`;
        console.log(fieldId);

        //pushing input field by id (line 9); creating fields when length increases
        $scope.supplyFields.push({ id: fieldId });
        console.log($scope.supplyFields);

        //timeout; wait for data to return
        $timeout(function() {
          $window.document.getElementById(fieldId).focus();
        });
      }
    };

    $scope.saveSupplyList = function(project) {
      console.log($scope.supplyFields);

      const supplyItems = [];
      angular.forEach($scope.supplyFields, (field) => {
        if (field.itemName) {
          //create an item set done to false, done is false
          supplyItems.push({ name: field.itemName, done: false });
        }
      });

      //Add array of supplies to the project object
      //before patch request
      project.supplies = supplyItems;

      projectFactory.editProject($scope.projectId, project)
      .then((data) => {
        console.log('updateProject: ', data);
        $window.Materialize.toast('Supply list added!', 2000);
      });
    };

  }
});
