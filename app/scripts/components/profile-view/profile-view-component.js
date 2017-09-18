'use strict';

bobbin.component('profileViewComponent', {

  templateUrl: 'app/scripts/components/profile-view/profile-view.html',
  controller: function(authFactory, $scope, $state) {

    // On profile view initialize get user data and store in scope
    // $scope.init = function() {
    // $scope.getUserData()
    // ProjectFactory.getAllProjects(user)
    //   .then((data) => {
    //     $scope.user = data;
    //     $scope.$apply();
    //     console.log($scope.user);
    //   });
    //     $scope.editProfile = function() {
    //       $scope.apply($scope.user);
    //     };
    // };

    $scope.logOut = () => {
      authFactory.logOut($scope.account)
        .then(() => {
          $state.go('root');
        });
    };


    // $scope.getUserData = () => {
    //   return authFactory.getCurrentUser()
    //     .then((data) => {
    //       return data;
    //     });
    // };
  }
});
