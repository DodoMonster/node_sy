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
        .state('app.administrator', {
          url:'/administrator',
          templateUrl: 'views/administrator.html',
        })
        .state('app.distributor', {
          url:'/distributor',
          templateUrl: 'views/distributor.html',
          controller:'DisCtrl',
          resolve:{
            deps:['$ocLazyLoad',
              function($ocLazyLoad) {
                return $ocLazyLoad.load(['js/controllers/DisCtrl.js']);
              },
             ],
          },
        })
        .state('app.products', {
          url:'/products',
          templateUrl: 'views/products.html',
          controller: 'PlistCtrl as pcl',
          resolve:{
            deps:['$ocLazyLoad',
              function($ocLazyLoad) {
                return $ocLazyLoad.load(['js/controllers/PlistCtrl.js']);
              },
             ],
          },
        })
        .state('app.products_info', {
          url:'/pro_info',
          templateUrl:'views/pro_info.html',
        })
        .state('app.goods', {
          url:'/goods',
          templateUrl: 'views/goods.html',
        });
  $locationProvider.html5Mode(true);
}
