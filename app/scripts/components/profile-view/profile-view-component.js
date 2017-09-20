'use strict';

bobbin.component('profileViewComponent', {

  templateUrl: 'app/scripts/components/profile-view/profile-view.html',
  controller: function(authFactory, $scope, $state) {

    let user = authFactory.getCurrentUser();
    console.log(user);
    //user is defined up until here
    debugger;

    // On profile view initialize get user data and store in scope
    $scope.init = function() {
      authFactory.isAuthenticated(user);

      $scope.getUserData(user)
      .then((data) => {
            $scope.user = data;
            $scope.$apply();
      });
      console.log('init user', user);
    };

    $scope.logOut = (user) => {
      authFactory.logOut($scope.account)
        .then(() => {
          $state.go('root');
        });
    };
    console.log(user);

    $scope.getUserData = (user) => {
      return authFactory.isAuthenticated(user)
        .then((data) => {
          return data;
        });
    };
  }
});
