  app.controller('PurCtrl', ['$scope', 'NgTableParams', 'PurService',  '$uibModal', function($scope, NgTableParams, PurService, $uibModal) {
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
    PurService.query(function(data) {   //加载数据
      $scope.datas = data;
      _this.tableParams = new NgTableParams({
        count:50,
      }, {
        data:$scope.datas,
      });
    });

    $scope.add = function() {
      var modalInstance = $uibModal.open({   //弹出添加表单
        templateUrl: 'proModal.html',
        controller:'proModalCtrl',
      });
      modalInstance.result.then(function(pInfo) {
        PurService.add(pInfo, function(result) {
          pInfo.id = result.id;
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
      PurService.del({purId:row.id}, function(message) {
        _.remove(_this.tableParams.settings().data, function(index) {
          return index.id == row.id;
        });

        _this.tableParams.reload();
      });
    };

    $scope.save = function(row) {
      row.isEditing = false;
      PurService.update({purId:row.id}, row, function(message) {
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
      if (key == 'intime') {
        $scope.pInfo[key] = $scope.pInfo[key].toLocaleDateString();
      }
    });

    $uibModalInstance.close($scope.pInfo);
  };

  $scope.intimeOpen = function($event) {
    $scope.status.intimeOpened = true;
    console.log(111);
  };

  $scope.today = function() {
   $scope.intime = new Date();
 };

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
},
]);
