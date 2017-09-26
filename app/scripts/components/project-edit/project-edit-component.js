'use strict';

bobbin.component('editProjectComponent', {

  templateUrl: 'app/scripts/components/project-edit/project-edit.html',
  controller: function(authFactory, projectFactory, $state, $scope, $window, $timeout) {

    $scope.supplyFields =[{ id: 'editField1' }];

    $scope.init = function() {
      // Grabbing params of projectId on the current state
      $scope.getProject($state.params.projectId);
    };

    $scope.getProject = function(projectId) {
      projectFactory.getSingleProject(projectId)
        .then((data) => {
          // console.log('SingleProject: ', data);
          $scope.project = data;
        });
    };

    $scope.addNextItem = function(e) {
      // If enterkey pressed & there's a value is not equal to empty ''
      // Do not want to fire if there's no value
      if (e.which === 13 && e.currentTarget.value !== '') {
        const supplies = [];
        let editFieldId = `editField${$scope.supplyFields.length + 1}`;
        console.log(editFieldId);

        // Pushing input field by id (line 8); creating fields when length increases
        $scope.supplyFields.push({ id: editFieldId });
        console.log($scope.supplyFields);

        // Timeout; wait for data to return
        $timeout(function() {
          $window.document.getElementById(editFieldId).focus();
        });
      }
    };

    $scope.updateProject = function(project) {
      console.log($scope.supplyFields);

      // Building a new object to push newSupply into project.supplies
      angular.forEach($scope.supplyFields, (supply) => {
        let newSupply = {
          done: false,
          name: supply.itemName
        };
        console.log(newSupply);
        project.supplies.push(newSupply);
        console.log(project.supplies);
      });

      debugger;
      // Looping over supplies to delete $$hashKey from {} to correctly target
      angular.forEach(project.supplies, (supply) => {
        delete supply.$$hashKey;
      });
      // debugger;
      projectFactory.editProject($state.params.projectId, project)
        .then((data) => {
          console.log('updateProject: ', data);
          $window.Materialize.toast('Project Updated!', 2000);
        });
    };

    $scope.backBtn = function() {
      // Equivalent to back button
      $window.history.back();
    };
  }
});
