  app.controller('PlistCtrl', ['$scope', 'NgTableParams', 'ProService', '$uibModal', function($scope, NgTableParams, ProService, $uibModal) {
    var _this = this;
    ProService.query(function(data) {
      $scope.datas = data;
    });

    $scope.add = function() {
      var modalInstance = $uibModal.open({
        templateUrl: 'proModal.html',
        controller:'proModalCtrl',
      });
      modalInstance.result.then(function(pInfo) {
        ProService.add(pInfo, function(result) {
          $scope.datas.splice(0, 0, pInfo);
        });
      });
    };

    _this.add = function() {
      _this.isEditing = true;
      _this.isAdding = true;
    };

    _this.cancelChanges = function() {

    };

    _this.zhijian = function(number) {
      alert(number);
    };

    $scope.yongyao = function() {
      alert('用药历史');
    };

    _this.save = save;

    function save(row, rowForm) {
      resetRow(row, rowForm);
      console.log(row);
      console.log(rowForm);
    }

    function resetRow(row, rowForm) {
      row.isEditing = false;
      rowForm.$setPristine();
    }

    _this.tableParams = new NgTableParams({count:50}, { data: $scope.data });
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

  $scope.intimeOpen = function($event) {
    $scope.status.intimeOpened = true;
  };

  $scope.outtimeOpen = function($event) {
    $scope.status.outtimeOpened = true;
  };

  $scope.today = function() {
   $scope.intime = new Date();
   $scope.outtime = new Date();
 };

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
},
]);
