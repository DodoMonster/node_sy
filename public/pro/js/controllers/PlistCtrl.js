  app.controller('PlistCtrl', ['$scope', 'NgTableParams', 'ProService', 'PageService', '$uibModal', 'toaster', '$state', function($scope, NgTableParams, ProService, PageService, $uibModal, toaster, $state) {
    var _this = this;
    $scope.currentPage = 1;
    $scope.searchType = 'all';
    ProService.query(function(data) {
      $scope.datas = data;
    });

    $scope.openModal = function() { //打开添加牲畜的模态框
      var modalInstance = $uibModal.open({
        templateUrl: 'proModal.html',
        controller: 'proModalCtrl',
      });
      modalInstance.result.then(function(pInfo) {
        ProService.addAnimal(_.omit(pInfo, 'isEditing'), function(result) {
          if (result.message === 'success') {
            toaster.pop('success', '添加成功');
          }

          pInfo.animalId = result.animalId;
          $scope.datas.splice(0, 0, pInfo);
        }, function(error) {

          if (error) throw error;
        });
      });
    };

    $scope.edit = function(row) { //编辑物品信息
      _this.original = angular.copy(row);
      row.isEditing = true;
      console.log(row);
    };

    $scope.cancel = function(row) { //取消当前的编辑
      _.map(row, function(value, key) {
        if (key != '$$hashKey') {
          row[key] = _this.original[key];
        }
      });

      row.isEditing = false;
    };

    $scope.openDiseaseModal = function(row) {
      $state.go('pro.disease', {
        animalId: row.animalId,
        suyuancode: row.suyuancode,
      });
    };

    $scope.openQcModal = function(row) { ////打开质检信息的modal
      $state.go('pro.aniqua', {
        animalId: row.animalId,
        suyuancode: row.suyuancode,
      });
    };

    $scope.del = function(row) {
      ProService.delAnimal({
        animalId: row.animalId,
      }, function(message) {
        _.remove($scope.datas, function(index) {
          return index.animalId == row.animalId;
        });
      });
    };

    $scope.save = function(row) {
      ProService.updateAnimal({
        animalId: row.animalId,
      }, _.omit(row, 'isEditing'), function(result) {
        if (result.message === 'success') {
          row.isEditing = false;
          toaster.pop('success', '修改成功！');
        }
      });
    };

    $scope.lastPage = function() {
      $scope.currentPage = $scope.currentPage - 1;
      PageService.query({
        sType: $scope.searchType,
        cPage: $scope.currentPage,
      }, {
        sContent: $scope.sContent,
      }, function(result) {

      });
    };

    $scope.nextPage = function() {
      $scope.currentPage = $scope.currentPage + 1;
      PageService.query({
        sType: $scope.searchType,
        cPage: $scope.currentPage,
      }, {
        sContent: $scope.sContent,
      }, function(result) {

      });
    };

    $scope.search = function() {
      PageService.query({
        sType: $scope.searchType,
        cPage: 1,
      }, {
        sContent: $scope.sContent,
      }, function(result) {

      });
    };

    _this.tableParams = new NgTableParams({
      count: 50,
    }, {
      data: $scope.data,
    });
  }, ]);

  //添加牲畜的模态框
  app.controller('proModalCtrl', ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {
    $scope.status = {
      intimeOpened: false,
      outtimeOpened: false,
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
  }, ]);

  //生病信息的模态框
  app.controller('diseaseModalCtrl', ['$scope', '$uibModalInstance', 'DiseaseService', 'items', function($scope, $uibModalInstance, DiseaseService, items) {
    var _this = this;
    DiseaseService.query(function(data) {
      $scope.datas = data;
    });

    $scope.edit = function(row) { //编辑物品信息
      _this.original = angular.copy(row);
      row.isEditing = true;
    };

    $scope.cancel = function(row) { //取消当前的编辑
      _.map(row, function(value, key) {
        if (key != '$$hashKey') {
          row[key] = _this.original[key];
        }
      });

      row.isEditing = false;
    };

    $scope.save = function(row) {
      row.isEditing = false;
      DiseaseService.update({
        id: row.id,
      }, row, function(message) {
        console.log(message);
      });
    };

    $scope.del = function(row) {
      DiseaseService.del({
        id: row.id,
      }, function(message) {
        _.remove($scope.datas, function(index) {
          return index.id == row.id;
        });
      });
    };
  }, ]);

  //质检信息的模态框
  app.controller('qcModalCtrl', ['$scope', '$uibModalInstance', 'qcService', 'items', function($scope, $uibModalInstance, qcService, items) {
    qcService.query(function(data) {
      $scope.datas = data;
    });
  }, ]);