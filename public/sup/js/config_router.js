angular.module('syApp')
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', routeConfig]);

function routeConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/sup/main');
  $stateProvider
    .state('sup', {
      abstract: true,
      url: '/sup',
      templateUrl: 'sup/views/app.html',
    })
    .state('sup.main', {
      url: '/main',
      templateUrl: 'sup/views/main.html',
      resolve: {
        deps: ['$ocLazyLoad',
          function($ocLazyLoad) {
            return $ocLazyLoad.load(['sup/js/controllers/HeaderCtrl.js']);
          },
        ],
      },
    })
    .state('sup.log', {
      url: '/log',
      templateUrl: 'views/log.html',
    })
    .state('sup.facSearch', {
      url: '/facSearch',
      templateUrl: 'views/facSearch.html',
      controller: 'DisCtrl',
      resolve: {
        deps: ['$ocLazyLoad',
          function($ocLazyLoad) {
            return $ocLazyLoad.load(['sup/js/controllers/DisCtrl.js']);
          },
        ],
      },
    })
    .state('sup.facSetting', {
      url: '/facSetting',
      templateUrl: 'views/facSetting.html',
    })
    .state('sup.baseSetting', {
      url: '/baseSetting',
      templateUrl: 'views/baseSetting.html',
    })
    .state('sup.proSearch', {
      url: '/proSearch',
      templateUrl: 'views/proSearch.html',
      controller: 'PlistCtrl as pcl',
      resolve: {
        deps: ['$ocLazyLoad',
          function($ocLazyLoad) {
            return $ocLazyLoad.load(['sup/js/controllers/PlistCtrl.js']);
          },
        ],
      },
    });

  $locationProvider.html5Mode(true);
}