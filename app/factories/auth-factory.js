'use strict';

bobbin.factory('authFactory', function($http, FBCreds) {

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
          console.log('userObj',userObj);
          addNewUserRegisteredObj.push(userObj);
          // debugger;
          currentUser = user.uid;
          console.log('isAuthenticated User ', user.email, user.uid);
          resolve(user);
        } else {
          resolve(false);
        }
      });
    });
  };

const getCurrentUser = function() {
  return currentUser;
};

const setCurrentUser = function(id) {
  currentUser = id;
}

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
    .then(function addUserInfo(userObj) {
      let addUserInfotoFB = {
        uid: userObj.uid,
        userEmail: userObj.email,
        userName: userObj.displayName,
        userPhoto: userObj.photoURL
      };
      debugger;
      aaddUserInfo.push(addUserInfotoFB);
      console.log('userObjFB.uid', addUserInfotoFB);
      let newObj = JSON.stringify(addUserInfotoFB);
      return $http.post(`${FBCreds.databaseURL}/users.json`, newObj)
        .then((data) => {
          console.log("data", data);
          return data;
        }, (error) => {
          let errorCode = error.code;
          let errorMessage = error.message;
          console.log("error", errorCode, errorMessage);
        });
      })
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

  return { isAuthenticated, getCurrentUser, setCurrentUser, getNewUserRegisteredInfo, logIn, logOut, register, authWithProvider, };
});
