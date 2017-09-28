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
          // console.log('SingleProject: ', data);
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
          //create an item set done to false, not checked
          //checked done = true
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

    $scope.deleteProject = function(project) {
      project.id = $scope.projectId;
      // debugger;
      projectFactory.deleteProject(project.id)
        .then(() => {
          $state.go('projects.items');
        });
    };
    $scope.deleteItem = function(project, index) {
      // debugger;
      project.supplies.splice(index, 1);
      angular.forEach(project.supplies, (supply) => {
        delete supply.$$hashKey;
      });
      // debugger;
      // console.log(project);
      // console.log(index);
      // targeting project.supplies[index] to delete
      projectFactory.editProject($scope.projectId, project)
        .then((data) => {
          // debugger;
          // console.log(data);
          // debugger;
          $state.go('projects.detail');
        });
      // console.log(index);
    };

    //looping over over to delete hashkeys from {}
    $scope.toggleSupplyItem = function(project) {
      angular.forEach(project.supplies, (supply) => {
        delete supply.$$hashKey;
      });
      // debugger;
      projectFactory.editProject($state.params.projectId, project)
      .then((data) => {
        $window.Materialize.toast('Project Updated!', 2000);
      });
    };

    $scope.toggleItem = function (item) {
      console.log(item);
    };
  }
});
