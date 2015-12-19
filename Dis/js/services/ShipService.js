angular.module('syApp')
.factory('ShipService', ['$resource',
      function($resource) {
        return $resource('api/ship/:shipId', {}, {
          query:{
            method:'GET',
            isArray:true,
          },
          add:{
            method:'POST',
            isArray:false,
          },
          del:{
            method:'delete',
            isArray:false,
          },
          update:{
            method:'PUT',
            isArray:false,
          },
        });
      },
    ]);
