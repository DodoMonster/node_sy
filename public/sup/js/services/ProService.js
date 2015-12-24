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
angular.module('syApp')
.factory('PageService', ['$resource',
          function($resource) {
            return $resource('api/:sType/:cPage', {}, {
              query:{
                method:'post',
                isArray:true,
              }
            });
          },
        ]);
