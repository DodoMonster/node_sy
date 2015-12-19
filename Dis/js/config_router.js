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
        .state('app.purchases', {
          url:'/purchases',
          templateUrl: 'views/purchases.html',
          controller:'PurCtrl as pur',
          resolve:{
            deps:['$ocLazyLoad',
              function($ocLazyLoad) {
                return $ocLazyLoad.load(['js/controllers/PurCtrl.js']);
              },
             ],
          },
        })
        .state('app.shipment', {
          url:'/shipment',
          templateUrl: 'views/shipment.html',
          controller:'ShipCtrl as ship',
          resolve:{
            deps:['$ocLazyLoad',
              function($ocLazyLoad) {
                return $ocLazyLoad.load(['js/controllers/ShipCtrl.js']);
              },
             ],
          },
        })
        .state('app.storage', {
          url:'/storage',
          templateUrl:'views/storage.html',
        })
        .state('app.logistics', {
          url:'/logistics',
          templateUrl:'views/logistics.html',
        })
        .state('app.statistics', {
          url:'/statistics',
          templateUrl: 'views/statistics.html',
          controller: 'PlistCtrl as pcl',
          resolve:{
            deps:['$ocLazyLoad',
              function($ocLazyLoad) {
                return $ocLazyLoad.load(['js/controllers/PlistCtrl.js']);
              },
             ],
          },
        })
        .state('app.printTag', {
          url:'/printTag',
          templateUrl:'views/printTag.html',
        })
        .state('app.inputTag', {
          url:'/inputTag',
          templateUrl: 'views/inputTag.html',
        });
  $locationProvider.html5Mode(true);
}
