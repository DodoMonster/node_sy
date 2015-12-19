angular.module('syApp')
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', routeConfig]);
function routeConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/app/main');
  $stateProvider
        .state('app', {
          abstract:true,
          url:'/app',
          templateUrl: 'views/app.html',
        })
        .state('app.main', {
          url:'/main',
          templateUrl: 'views/main.html',
          resolve:{
            deps:['$ocLazyLoad',
              function($ocLazyLoad) {
                return $ocLazyLoad.load(['js/controllers/HeaderCtrl.js']);
              },
             ],
          },
        })
        .state('app.log', {
          url:'/log',
          templateUrl: 'views/log.html',
        })
        .state('app.facSearch', {
          url:'/facSearch',
          templateUrl: 'views/facSearch.html',
          controller:'DisCtrl',
          resolve:{
            deps:['$ocLazyLoad',
              function($ocLazyLoad) {
                return $ocLazyLoad.load(['js/controllers/DisCtrl.js']);
              },
             ],
          },
        })
        .state('app.facSetting', {
          url:'/facSetting',
          templateUrl:'views/facSetting.html',
        })
        .state('app.baseSetting', {
          url:'/baseSetting',
          templateUrl:'views/baseSetting.html',
        })
        .state('app.proSearch', {
          url:'/proSearch',
          templateUrl: 'views/proSearch.html',
          controller: 'PlistCtrl as pcl',
          resolve:{
            deps:['$ocLazyLoad',
              function($ocLazyLoad) {
                return $ocLazyLoad.load(['js/controllers/PlistCtrl.js']);
              },
             ],
          },
        });

  $locationProvider.html5Mode(true);
}
