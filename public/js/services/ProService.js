angular.module('syApp')
.factory('ProService', ['$resource',
      function($resource) {
        return $resource('api/pro/:proId', {}, {
          query:{
            method:'GET',
            isArray:true,
          },
          add:{
            method:'POST',
            isArray:false,
          },
        });
      },
    ]);
