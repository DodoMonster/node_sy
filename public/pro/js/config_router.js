angular.module('syApp')
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', routeConfig]);

function routeConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/pro/main');
  $stateProvider
    .state('pro', {
      abstract: true,
      url: '/pro',
      templateUrl: 'pro/views/app.html',
    })
    .state('pro.main', {
      url: '/main',
      templateUrl: 'pro/views/main.html',
      resolve: {
        deps: ['$ocLazyLoad',
          function($ocLazyLoad) {
            return $ocLazyLoad.load(['pro/js/controllers/HeaderCtrl.js']);
          },
        ],
      },
    })
    .state('pro.administrator', {
      url: '/administrator',
      templateUrl: 'pro/views/administrator.html',
    })
    .state('pro.distributor', {
      url: '/distributor',
      templateUrl: 'views/distributor.html',
      controller: 'DisCtrl',
      resolve: {
        deps: ['$ocLazyLoad',
          function($ocLazyLoad) {
            return $ocLazyLoad.load(['pro/js/controllers/DisCtrl.js']);
          },
        ],
      },
    })
    .state('pro.products', {
      url: '/products',
      templateUrl: 'views/products.html',
      controller: 'PlistCtrl as pcl',
      resolve: {
        deps: ['$ocLazyLoad',
          function($ocLazyLoad) {
            return $ocLazyLoad.load(['pro/js/controllers/PlistCtrl.js']);
          },
        ],
      },
    })
    .state('pro.products_info', {
      url: '/pro_info',
      templateUrl: 'views/pro_info.html',
    })
    .state('pro.goods', {
      url: '/goods',
      templateUrl: 'views/goods.html',
    });
  $locationProvider.html5Mode(true);
}
