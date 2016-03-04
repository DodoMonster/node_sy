angular.module('syApp') //对产品列表的增删查改服务
  .factory('ProService', ['$resource',
    function($resource) {
      return $resource('/producer/animal/:animalId', {}, {
        query: {
          method: 'GET',
          isArray: true,
        },
        addAnimal: {
          method: 'POST',
          isArray: false,
        },
        delAnimal: {
          method: 'DELETE',
          isArray: false,
        },
        updateAnimal: {
          method: 'PUT',
          isArray: false,
        },
      });
    },
  ]);
angular.module('syApp') //分页服务
  .factory('PageService', ['$resource',
    function($resource) {
      return $resource('api/:sType/:cPage', {}, {
        query: {
          method: 'post',
          isArray: true,
        },
      });
    },
  ]);

angular.module('syApp') //对生病信息的增删查改服务
  .factory('DiseaseService', ['$resource',
    function($resource) {
      return $resource('producer/disease/:animalId/:id', {}, {
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
  ])
  .factory('qcService', ['$resource',
    function($resource) {
      return $resource('producer/aniQua/:animalId/:pici', {}, {
        query: {
          method: 'GET',
          isArray: true,
        },
        add: {
          method: 'POST',
          isArray: false
        },
        del: {
          method: 'DELETE',
          isArray: false
        }
      });
    },
  ])
  .factory('quaService', ['$resource',
    function($resource) {
      return $resource('producer/quality/:id', {}, {
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