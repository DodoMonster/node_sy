angular.module('syApp') //对分销商进行增删查改
  .factory('DisService', ['$resource',
    function($resource) {
      return $resource('/producer/distributor/:id', {}, {
        query: {
          method: 'GET',
          isArray: true,
        },
        add: {
          method: 'POST',
          isArray: false,
        },
        del: {
          method: 'delete',
          isArray: false,
        },
        update: {
          method: 'PUT',
          isArray: false,
        },
      });
    },
  ]);