'use strict';

bobbin.component('headerComponent', {

  templateUrl: 'app/scripts/components/header/header.html',
  controller: function($scope, authFactory, $state) {

    $scope.logOut = (user) => {
      authFactory.logOut($scope.account)
        .then(() => {
          $state.go('root');
        });
    };
  }
});
