angular.module('syApp')
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', routeConfig]);

function routeConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/dis/main');
  $stateProvider
    .state('dis', {
      abstract: true,
      url: '/dis',
      templateUrl: 'dis/views/app.html',
    })
    .state('dis.main', {
      url: '/main',
      templateUrl: 'dis/views/main.html',
      resolve: {
        deps: ['$ocLazyLoad',
          function($ocLazyLoad) {
            return $ocLazyLoad.load(['dis/js/controllers/HeaderCtrl.js']);
          },
        ],
      },
    })
    .state('dis.purchases', {
      url: '/purchases',
      templateUrl: 'views/purchases.html',
      controller: 'PurCtrl as pur',
      resolve: {
        deps: ['$ocLazyLoad',
          function($ocLazyLoad) {
            return $ocLazyLoad.load(['dis/js/controllers/PurCtrl.js']);
          },
        ],
      },
    })
    .state('dis.shipment', {
      url: '/dis/shipment',
      templateUrl: 'views/shipment.html',
      controller: 'ShipCtrl as ship',
      resolve: {
        deps: ['$ocLazyLoad',
          function($ocLazyLoad) {
            return $ocLazyLoad.load(['dis/js/controllers/ShipCtrl.js']);
          },
        ],
      },
    })
    .state('dis.storage', {
      url: '/storage',
      templateUrl: 'views/storage.html',
    })
    .state('dis.logistics', {
      url: '/logistics',
      templateUrl: 'views/logistics.html',
    })
    .state('dis.dispro', {
      url: '/statistics',
      templateUrl: 'views/dispro.html',
      controller: 'ProCtrl as pcl',
      resolve: {
        deps: ['$ocLazyLoad',
          function($ocLazyLoad) {
            return $ocLazyLoad.load(['dis/js/controllers/ProCtrl.js']);
          },
        ],
      },
    })
    .state('dis.printTag', {
      url: '/printTag',
      templateUrl: 'views/printTag.html',
    })
    .state('dis.inputTag', {
      url: '/inputTag',
      templateUrl: 'views/inputTag.html',
    });
  $locationProvider.html5Mode(true);
}