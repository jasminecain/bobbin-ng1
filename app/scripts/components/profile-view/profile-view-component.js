'use strict';

bobbin.component('profileViewComponent', {

  templateUrl: 'app/scripts/components/profile-view/profile-view.html',
  controller: function(authFactory, $scope, $state) {

    // let user = authFactory.getCurrentUser();

    // On profile view initialize get user data and store in scope
    // $scope.init = function(userObj) {
    //   console.log('init userObj', userObj);

    // $scope.getUserData(userObj)
    //   .then((data) => {
    //     $scope.user = data;
    //     $scope.$apply();
    //     // console.log($scope.user);
    //   });
    //     // $scope.editProfile = function() {
    //     //   $scope.apply($scope.user);
    //     // };
    // };

    $scope.logOut = () => {
      authFactory.logOut($scope.account)
        .then(() => {
          $state.go('root');
        });
    };

    // $scope.NewUserRegisteredInfo = [];
    // let getUserRegisteredInfo = function() {
    //   let pulledUserInfo = authFactory.getNewUserRegisteredInfo();
    //   $scope.NewUserRegisteredInfo = pulledInfo.splice(0,1);
    //   console.log('pulledUserInfo', pulledUserInfo);
    //   console.log('NewUserRegisteredInfo', $scope.NewUserRegisteredInfo);
    // } ();



    // $scope.getUserData = (userObj) => {
    //   return authFactory.getCurrentUser(currentUser)
    //     .then((data) => {
    //       return data;
    //     });
    // };
  }
});
