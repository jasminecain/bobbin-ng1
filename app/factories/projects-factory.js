'use strict';

bobbin.factory('projectFactory', function($q, $http, FBCreds) {

  const getAllProjects = function(userId) {
    let projects = [];
    // console.log(`${FBCreds.databaseURL}/projects.json?orderBy="uid"&equalTo="${user}"`);
    return $q ((resolve, reject) => {
      $http.get(`${FBCreds.databaseURL}/projects.json?orderBy="uid"&equalTo="${userId}"`)
      .then((itemObject) => {
        let itemCollection = itemObject.data;
        // console.log('itemCollection?', itemCollection);
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

  const editProject = function(projectId, projectObj) {
    // console.log('id and object', projectId, projectObj);
    return $q((resolve, reject) => {
      let newObj = JSON.stringify(projectObj);
      $http.put(`${FBCreds.databaseURL}/projects/${projectId}.json`, newObj)
        .then((project) => {
          debugger;
          resolve(project.data);
        })
        .catch((error) => {
          reject(error);
          console.log('editProjectError', error);
        });
    });
  };

  const getSingleProject = function(projectId) {
    return $q((resolve, reject) => {
      $http.get(`${FBCreds.databaseURL}/projects/${projectId}.json`)
        .then((project) => {
          resolve(project.data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  };

  const deleteProject = function(projectId) {
    return $q((resolve, reject) => {
      $http.delete(`${FBCreds.databaseURL}/projects/${projectId}.json`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
    });
  };

  return { getAllProjects, addProject, editProject, getSingleProject, deleteProject };

});
