'use strict';

bobbin.factory('authFactory', function() {

  let currentUser = null;

  const isAuthenticated = function (){
    console.log('userFactory: isAuthenticated');
    return new Promise ( (resolve, reject) => {
      firebase.auth().onAuthStateChanged( (user) => {
        if (user){
          currentUser = user.uid;
          console.log('user', user.uid);
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  };

  const getCurrentUser = function(){
    return currentUser;
  };

  let provider = new firebase.auth.GoogleAuthProvider();

  let authWithProvider = function () {
    return firebase.auth().signInWithPopup(provider);
  };

  return { isAuthenticated, getCurrentUser, authWithProvider };
});
