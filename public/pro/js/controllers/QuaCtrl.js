  app.controller('QuaCtrl', ['$scope', 'NgTableParams', 'quaService', '$uibModal', 'toaster', function($scope, NgTableParams, quaService, $uibModal, toaster) {
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
    quaService.query(function(data) { //加载数据
      $scope.datas = data;
      _this.tableParams = new NgTableParams({
        count: 50,
      }, {
        data: $scope.datas,
      });
    });

    $scope.add = function() {
      var modalInstance = $uibModal.open({ //弹出添加表单
        templateUrl: 'quaModal.html',
        controller: 'quaModalCtrl',
      });
      modalInstance.result.then(function(Info) {
        quaService.add(_.omit(Info, 'isEditing'),
          function(result) {
            if (result.message == 'success') {
              Info.id = result.id;
              _this.tableParams.settings().data.splice(0, 0, Info);
              _this.tableParams.reload();
              toaster.pop('success', '添加成功！');
            }
          });
      });
    };

    $scope.edit = function(row) {
      _this.original = angular.copy(row);
      row.isEditing = true;
      console.log(row);
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
      quaService.del({
        id: row.id
      }, function(message) {
        _.remove(_this.tableParams.settings().data, function(index) {
          return index.id == row.id;
        });
        _this.tableParams.reload();
        toaster.pop('info', '删除成功');
      });
    };

    $scope.save = function(row) {
      quaService.update({
        id: row.id
      }, _.omit(row, 'isEditing'), function(result) {
        if (result.message == 'success') {
          toaster.pop('info', '修改成功！');
          row.isEditing = false;
        }
      });
    };
  }, ]);
  app.controller('quaModalCtrl', ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {
    $scope.status = {
      dateOpened: false,
    };
    $scope.ok = function() {
      console.log($scope.Info);
      $scope.Info.date = $scope.Info['date'].toLocaleDateString();
      $uibModalInstance.close($scope.Info);
    };

    $scope.dateOpen = function($event) {
      $scope.status.dateOpened = true;
      console.log(111);
    };

    $scope.today = function() {
      $scope.intime = new Date();
    };

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  }, ]);