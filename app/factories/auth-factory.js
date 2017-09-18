'use strict';

bobbin.factory('authFactory', function() {

  let currentUser = null;
  let addNewUserRegisteredObj = [];

  const isAuthenticated = function() {
    // console.log('authFactory: isAuthenticated');
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          let userObj = {
            userName: user.displayName,
            userEmail: user.email,
            userPhoto: user.photoURL
          };
          // console.log('userObj',userObj);
          addNewUserRegisteredObj.push(userObj);
          currentUser = user;
          // console.log('User: ', user.email, user.uid);
          resolve(user);
        } else {
          resolve(false);
        }
      });
    });
  };

const getCurrentUser = function() {
  return isAuthenticated();
};

const getNewUserRegisteredInfo = function() {
  return addNewUserRegisteredObj;
};
// addNewUserRegisteredObj

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
      console.log('register error', errorCode, errorMessage);
    });
  };

  let provider = new firebase.auth.GoogleAuthProvider();

  let authWithProvider = function () {
    return firebase.auth().signInWithPopup(provider);
  };

  return { isAuthenticated, getCurrentUser, getNewUserRegisteredInfo, logIn, logOut, register, authWithProvider, };
});
