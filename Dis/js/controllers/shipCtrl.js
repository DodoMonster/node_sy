app.controller('ShipCtrl', ['$scope', 'NgTableParams', 'ShipService',  '$uibModal', function($scope, NgTableParams, ShipService, $uibModal) {
  var _this = this;

  // _this.tableParams = new NgTableParams({
  //   count:50,
  // }, {
  //   getData:function(params) {
  //     return PurService.query(function(data) {
  //       params.total(data.inlineCount);
  //       return data.results;
  //     });
  //   },
  // });

  ShipService.query(function(data) {
    $scope.datas = data;
    console.log(data);
    _this.tableParams = new NgTableParams({
      count:50,
    }, {
      data:$scope.datas,
    });
  });

  $scope.add = function() {
    var modalInstance = $uibModal.open({
      templateUrl: 'proModal.html',
      controller:'proModalCtrl',
    });
    modalInstance.result.then(function(pInfo) {
      ShipService.add(pInfo, function(result) {
        _this.tableParams.settings().data.splice(0, 0, pInfo);
        _this.tableParams.reload();
      });
    });
  };

  $scope.edit = function(row) {
    _this.original = angular.copy(row);
    row.isEditing = true;
  };

  $scope.cancel = function(row) {
    _.map(row, function(value, key) {
      if (key != '$$hashKey') {
        row[key] = _this.original[key];
      }
    });

    row.isEditing = false;
  };

  $scope.del = function(row) {
    ShipService.del({shipId:row.id}, function(message) {
      console.log(message);
      _.remove(_this.tableParams.settings().data, function(index) {
        return index.id == row.id;
      });

      _this.tableParams.reload();
    });
  };

  $scope.save = function(row) {
    row.isEditing = false;
    ShipService.update({shipId:row.id}, row, function(message) {
      console.log(message);
    });
  };
},
]);
app.controller('proModalCtrl', ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {
  $scope.status = {
  intimeOpened: false,
  outtimeOpened:false,
};
  $scope.ok = function() {
  _.forEach($scope.pInfo, function(n, key) {
    if (key == 'intime' || key == 'outtime') {
      $scope.pInfo[key] = $scope.pInfo[key].toLocaleDateString();
    }
  });

  $uibModalInstance.close($scope.pInfo);
};

  $scope.outtimeOpen = function($event) {
  $scope.status.outtimeOpened = true;
};

  $scope.today = function() {
    $scope.outtime = new Date();
  };

  $scope.cancel = function() {
  $uibModalInstance.dismiss('cancel');
};
},
]);
