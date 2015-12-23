  app.controller('PlistCtrl', ['$scope', 'NgTableParams', 'ProService', 'PageService', '$uibModal', function($scope, NgTableParams, ProService, PageService, $uibModal) {
    var _this = this;
    $scope.currentPage = 1, $scope.searchType = 'all';
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
          pInfo.id = result.id;
          $scope.datas.splice(0, 0, pInfo);
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

    _this.zhijian = function(number) {
      alert(number);
    };

    $scope.yongyao = function(row) {
      alert('用药历史');
    };

    $scope.del = function(row) {
      ProService.del({proId:row.id}, function(message) {
        console.log(message);
        _.remove($scope.datas, function(index) {
          return index.id == row.id;
        });
      });
    };

    $scope.save = function(row) {
      row.isEditing = false;
      ProService.update({proId:row.id}, row, function(message) {
        console.log(message);
      });
    };

    $scope.lastPage = function() {
      $scope.currentPage =   $scope.currentPage - 1;
      PageService.query({
        sType:$scope.searchType,
        cPage:$scope.currentPage,
      }, {
        sContent:$scope.sContent,
      }, function(result) {

      });
    };

    $scope.nextPage = function() {
      $scope.currentPage =   $scope.currentPage + 1;
      PageService.query({
        sType:$scope.searchType,
        cPage:$scope.currentPage,
      }, {
        sContent:$scope.sContent,
      }, function(result) {

      });
    };

    $scope.search = function() {
      PageService.query({
        sType:$scope.searchType,
        cPage:1,
      }, {
        sContent:$scope.sContent,
      }, function(result) {

      });
    };

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
