'use strict';

const bobbin = angular.module('BobbinApp', [
  'ui.router'
])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider, authFactory, loginComponent) {

  //page doesn't exist, back to route
  $urlRouterProvider.otherwise('/');

  //state SPA not pages
  $stateProvider
  .state('root', {
    url: '/',
    templateUrl: 'app/templates/pages/home.html'
  })

  // .state('login', {
  //   url: '/login',
  //   views: {
  //     'login': {
  //       template: '<login-component></login-component>'
  //     }
  //   }
  // })

  .state('projects', {
    abstract: true,
    templateUrl: 'app/templates/pages/projects.html'
  })

  .state('projects.items', {
    url: '/projects',
    views: {
      'projects': {
        component: 'projectsComponent'
      }
    }
  })

  .state('projects.detail', {
    url: '/projects/:projectsId',
    views: {
      'projectsDetail': {
        component: 'projectDetailComponent'
      }
    }
  })

  .state('profile', {
    abstract: true,
    templateUrl: 'app/templates/pages/profile-view.html'
  })

  .state('profile.view', {
    url: '/profile',
    views: {
      'profile': {
        component: 'profileViewComponent'
      }
    }
  })

  .state('edit.project', {
    abstract: true,
    templateUrl: 'app/templates/pages/edit-project-view.html'
  })

  .state('edit.project.view', {
    url: '/edit.project',
    views: {
      'edit.project': {
        component: 'editProjectComponent'
      }
    }
  })

  .state('photo.gallery', {
    abstract: true,
    templateUrl: 'app/templates/pages/photo-gallery-view.html'
  })

  .state('photo.gallery.view', {
    url: '/photo.gallery',
    views: {
      'photo.gallery': {
        component: 'photoGalleryComponent'
      }
    }
  });

}])

.run(function(FBCreds) {
  let creds = FBCreds;
  let authConfig = {
      apiKey: creds.apiKey,
      authDomain: creds.authDomain,
      databaseURL: creds.databaseURL
  };
  firebase.initializeApp(authConfig);

  let isAuth = (authFactory) => new Promise((resolve, reject) => {
    console.log("authFactory is", authFactory);
    authFactory.isAuthenticated()
      .then((userExists) => {
        if (userExists) {
          console.log("Authenticated, go ahead");
          resolve();
        } else {
          console.log("Authentication reject, GO AWAY");
          reject();
        }
      });
  });
});
