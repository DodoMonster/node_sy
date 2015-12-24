angular.module('syApp')
.factory('DisService', ['$resource',
    function($resource) {
      return $resource('api/dis/:disId', {}, {
        query:{
            method: 'GET',
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
