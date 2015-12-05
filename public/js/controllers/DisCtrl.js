app.controller('DisCtrl', ['$scope', '$uibModal', 'DisService', function($scope, $uibModal, DisService) {
  var _this = this;
  DisService.query(function(data) {
    $scope.datas = data;
  });

  $scope.save = function(info) {
    info.isEditing = false;
    DisService.update({disId:info.id}, info, function(message) {
      console.log(message);
    });
  };

  $scope.cancle = function(info) {
    info.name = _this.original.name;
    info.telephone =  _this.original.telephone;
    info.address = _this.original.address;
    info.isEditing = false;
  };

  $scope.edit = function(info) {
    _this.original = angular.copy(info);
    info.isEditing = true;

  };

  $scope.del = function(info) {
    DisService.del({disId:info.id}, function(message) {
      console.log(message);
    });

    _.remove($scope.datas, function(index) {
      return index.id == info.id;
    });
  };

  $scope.open = function(size) {
    var modalInstance = $uibModal.open({
      templateUrl: 'myModal.html',
      controller:'myModalCtrl',
    });
    modalInstance.result.then(function(aInfo) {
      DisService.add(aInfo, function(result) {
        if (aInfo == undefined) {
          aInfo = {
                    id:'',
                    name:'',
                    address:'',
                    telephone:'',
                  };
        }
        aInfo.id =result.id;
        $scope.datas.splice(0, 0, aInfo);
      });
    }, function() {

    });
  };
},
]);

app.controller('myModalCtrl', ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {
  $scope.ok = function() {

    $uibModalInstance.close($scope.aInfo);
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
},
]);
