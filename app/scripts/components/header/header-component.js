'use strict';

bobbin.component('headerComponent', {

  templateUrl: 'app/scripts/components/header/header.html',
  controller: function($scope, authFactory, $state, $window) {

    //moved header component into each page due to scoping issues; nav hides until login
    $scope.currentUser = $window.localStorage.getItem('currentUser');
    // console.log($scope.currentUser);

    $scope.logOut = () => {
      authFactory.logOut($scope.account)
        .then(() => {
          $window.localStorage.removeItem('currentUser');
          $state.go('root');
        });
    };
  }
});
