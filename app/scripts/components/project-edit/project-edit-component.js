'use strict';

bobbin.component('editProjectComponent', {

  templateUrl: 'app/scripts/components/project-edit/project-edit.html',
  controller: function(authFactory, projectFactory, $state, $scope, $window, $timeout, Upload) {

    $scope.supplyFields =[{ id: 'editField1' }];

    $scope.init = function() {
      // Grabbing params of projectId on the current state and displaying the project
      $scope.getProject($state.params.projectId);
    };

    $scope.getProject = function(projectId) {
      projectFactory.getSingleProject(projectId)
        .then((data) => {
          console.log('SingleProject: ', data);
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

      if(!project.supplies) {
        project.supplies = [];
      }
      // Building a new object to push newSupply into project.supplies
      angular.forEach($scope.supplyFields, (supply) => {
        if (supply.itemName) {
          let newSupply = {
            done: false,
            name: supply.itemName
          };
          console.log(newSupply);
          project.supplies.push(newSupply);
          console.log(project.supplies);
        }
      });

      project.supplies = $scope.deleteHashKeys(project.supplies);
      debugger;
      projectFactory.editProject($state.params.projectId, project)
        .then((data) => {
          // Resetting supplyFields to 1
          $scope.supplyFields =[{ id: 'editField1' }];
          console.log('updateProject: ', data);
          $window.Materialize.toast('Project Updated!', 2000);
        });
    };

    $scope.uploadPhoto = function(file, project) {
      if (file) {
        // converting file to base64
        Upload.base64DataUrl(file).then(function(base64) {
          if (!project.photos) {
            project.photos = [];
          }

          project.photos.push(base64);
          $window.Materialize.toast('Photo Uploaded!', 2000);
        });
      }
    };

    $scope.deletePhoto = function(project, index) {
      debugger;
      project.photos.splice(index, 1);

      // project.photos = $scope.deleteHashKeys(project.photos);
      $window.Materialize.toast('Photo deleted!', 2000);
    };


    $scope.deleteHashKeys = function(supplies) {
      let suppliesArray = [];

      // Looping over supplies to delete $$hashKey from {} to correctly target
      angular.forEach(supplies, (supply) => {
        delete supply.$$hashKey;
        suppliesArray.push(supply);
      });

      return suppliesArray;
    };

    $scope.backBtn = function() {
      // Equivalent to back button
      // $state.go('projects.detail');
      $window.history.back();
    };
  }
});
