angular.module('syApp')
.factory('ProService', ProService);

ProService.$inject = ['$http'];

function ProService($http) {
  return {
      getData:function() {
        return $http.get('api/proData.json');
      },
    };
}
