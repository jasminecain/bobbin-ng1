'use strict';

bobbin.factory('authFactory', function() {

  let provider = new firebase.auth.GoogleAuthProvider();

  let authWithProvider = function () {
    return firebase.auth().signInWithPopup(provider);
  };

  return { authWithProvider };
});
