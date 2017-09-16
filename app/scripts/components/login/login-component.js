'use strict';

bobbin.component('loginComponent', {

  templateUrl: 'app/scripts/components/login/login.html',
  controller: function(authFactory, $state, $scope) {

    $scope.loginGoogle = function() {
      authFactory.authWithProvider()
        .then(function(result) {
          let user = result.user.uid;
          console.log('user: ', user);
          console.log('user result: ', result);
          $state.go('projects.items');
          // $scope.$apply();
        }).catch(function(error) {
          console.log(error);
          let errorCode = error.code;
          let errorMessage = error.message;
        });
    };
  }
});
