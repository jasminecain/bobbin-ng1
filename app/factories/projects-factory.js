'use strict';

bobbin.factory('projectFactory', function($q, $http, FBCreds) {

  const getProjects = function(user) {
    let projects = [];
    console.log(`${FBCreds.databaseURL}/projects.json?orderBy=uid&equalTo=${user}`);
    return $q ((resolve, reject) => {
      $http.get(`${FBCreds.databaseURL}/projects.json?orderBy=uid&equalTo=${user}`)
      .then((itemObject) => {
        let itemCollection = itemObject.data;
        console.log('itemCollection?', itemCollection);
        Object.keys(itemCollection).forEach((key) => {
          itemCollection[key].id = key;
          projects.push(itemCollection[key]);
        });
        resolve(projects);
      })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const addProject = function(obj) {
    let newObj = JSON.stringify(obj);
    return $http.post(`${FBCreds.databaseURL}/projects.json`, newObj)
    .then((data) => {
      return data;
    }, (error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log('error', errorCode, errorMessage);
    });
  };

  return { getProjects, addProject };

});

//add project!!!

