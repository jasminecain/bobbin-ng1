'use strict';

const bobbin = angular.module('BobbinApp', [
  'ui.materialize',
  'ui.router',
  'ui.router.state.events'
])

// If minifying code need to wrap dependencies and function in array
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

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
    },
    data: { requireAuth: true }
  })

  .state('projects.detail', {
    url: '/projects/:projectsId',
    views: {
      'projectsDetail': {
        component: 'projectDetailComponent'
      }
    },
    data: { requireAuth: true }
  })

  .state('profile', {
    abstract: true,
    templateUrl: 'app/templates/pages/profile-view.html',
  })

  .state('profile.view', {
    url: '/profile',
    views: {
      'profile': {
        component: 'profileViewComponent'
      }
    },
    data: { requireAuth: true }
  })

  .state('edit.project', {
    abstract: true,
    templateUrl: 'app/templates/pages/edit-project-view.html',
  })

  .state('edit.project.view', {
    url: '/edit.project',
    views: {
      'edit.project': {
        component: 'editProjectComponent'
      }
    },
    data: { requireAuth: true }
  })

  .state('photo.gallery', {
    abstract: true,
    templateUrl: 'app/templates/pages/photo-gallery-view.html',
  })

  .state('photo.gallery.view', {
    url: '/photo.gallery',
    views: {
      'photo.gallery': {
        component: 'photoGalleryComponent'
      }
    },
    data: { requireAuth: true }
  });

}])

.run(function($rootScope, $state, FBCreds, authFactory) {
  let creds = FBCreds;
  let authConfig = {
    apiKey: creds.apiKey,
    authDomain: creds.authDomain,
    databaseURL: creds.databaseURL
  };

  firebase.initializeApp(authConfig);

  // On every state change, check if auth is required
  $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
    if (toState.data && toState.data.requireAuth) {
      authFactory.isAuthenticated()
        .then((userExists) => {
          if (userExists) {
            // If current state is root, send user to projects
            // console.log('User is authenticated; proceed.');
            if ($state.current.name === 'root') {
              $state.go('projects.items');
            }
          } else {
            // If user is not authed, send them to login state
            $state.go('root');
          }
        });
    }
  });
});
