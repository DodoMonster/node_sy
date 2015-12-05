var app = angular.module('syApp');
app
.config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', appConfig])
.run(['$rootScope', '$state', '$stateParams', runConfig]);

function appConfig($controllerProvider, $compileProvider, $filterProvider, $provide) {
  app.controller = $controllerProvider.register;
  app.directive = $compileProvider.directive;
  app.filter = $filterProvider.register;
  app.factory = $provide.factory;
  app.service = $provide.service;
  app.constant = $provide.constant;
  app.value = $provide.value;
}

function runConfig($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
}
