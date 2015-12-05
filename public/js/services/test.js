angular.module('syApp')
.factory('ProService', ['$resource', function($resource) {
    return $resource('api/user/:id', {
      id:'@',
    }, {

    });
  },
]);
