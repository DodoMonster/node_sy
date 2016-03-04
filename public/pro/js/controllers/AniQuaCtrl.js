  app.controller('AniQuaCtrl', ['$scope', 'NgTableParams', 'qcService', '$uibModal', '$stateParams', 'toaster', function($scope, NgTableParams, qcService, $uibModal, $stateParams, toaster) {
    var _this = this,
      animalId = $stateParams.animalId;
    $scope.suyuancode = $stateParams.suyuancode;
    qcService.query({
        animalId: animalId
      },
      function(data) { //加载数据
        $scope.datas = data;
        _this.tableParams = new NgTableParams({
          count: 50,
        }, {
          data: $scope.datas,
        });
      });

    $scope.add = function() {
      var modalInstance = $uibModal.open({ //弹出添加表单
        templateUrl: 'aniQuaModal.html',
        controller: 'aniQuaModalCtrl',
      });
      modalInstance.result.then(function(Info) {
        qcService.add({
          animalId: animalId,
        }, Info, function(result) {
          if (result.message === 'success') {
            qcService.query({
              animalId: animalId
            }, function(data) {
              $scope.datas = data;
              console.log(data);
              _this.tableParams.settings().data = $scope.datas;
              _this.tableParams.reload();
            });
          }
        });
      });
    };
    $scope.del = function(row) {
      qcService.del({
        animalId: animalId,
        pici: row.pici,
      }, function(result) {
        if (result.message === 'success') {
          _.remove(_this.tableParams.settings().data, function(index) {
            return index.pici == row.pici;
          });
          _this.tableParams.reload();
          toaster.pop('info', '删除成功');
        }
      });
    };
  }, ]);
  app.controller('aniQuaModalCtrl', ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {
    $scope.ok = function() {
      $uibModalInstance.close($scope.Info);
    };
    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  }, ]);