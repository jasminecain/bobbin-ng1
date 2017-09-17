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

  const logIn = function(userObj) {
    return firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password);
  };

  const logOut = function() {
    console.log('logoutUser');
    return firebase.auth().signOut();
  };

  const register = function(userObj) {
    return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
    .catch(function(error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log('error', errorCode, errorMessage);
    });
  };

  let provider = new firebase.auth.GoogleAuthProvider();

  let authWithProvider = function () {
    return firebase.auth().signInWithPopup(provider);
  };

  return { isAuthenticated, getCurrentUser, logIn, logOut, register, authWithProvider, };
});
