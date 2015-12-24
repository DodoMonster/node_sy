angular.module('syApp')
.factory('PurService', ['$resource',
      function($resource) {
        return $resource('api/pur/:purId', {}, {
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
