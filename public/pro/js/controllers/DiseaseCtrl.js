 app.controller('DiseaseCtrl', ['$scope', '$uibModal', 'DiseaseService', '$stateParams', 'toaster', function($scope, $uibModal, DiseaseService, $stateParams, toaster) {
   var _this = this,
     animalId = $stateParams.animalId;
   $scope.suyuancode = $stateParams.suyuancode;
   DiseaseService.query({
       animalId: animalId
     },
     function(data) {
       $scope.datas = data;
       console.log(data);
     });

   $scope.openModal = function() { //打开添加模态框
     var modalInstance = $uibModal.open({
       templateUrl: 'disModal.html',
       controller: 'disModalCtrl',
     });
     modalInstance.result.then(function(Info) {
       DiseaseService.add({
           animalId: animalId
         },
         Info,
         function(result) {
           if (result.message === 'success') {
             toaster.pop('success', '添加成功');
           }

           Info.id = result.id
           $scope.datas.splice(0, 0, Info);
         },
         function(error) {
           if (error) throw error;
         });
     });
   };
   $scope.edit = function(row) { //编辑信息
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

   $scope.save = function(row) {

     DiseaseService.update({
       animalId: animalId,
       id: row.id,
     }, _.omit(row, 'isEditing'), function(result) {
       if (result.message == 'success') {
         toaster.pop('success', '修改成功！');
         row.isEditing = false;
       } else {
         _.map(row, function(value, key) {
           if (key != '$$hashKey') {
             row[key] = _this.original[key];
           }
         });
         row.isEditing = false;
         toaster.pop('danger', '修改失败！');
       }
     });

   };

   $scope.del = function(row) {
     DiseaseService.del({
       animalId: animalId,
       id: row.id,
     }, function(message) {
       if (message === 'success') {
         _.remove($scope.datas, function(index) {
           return index.id == row.id;
         });
       }
     });
   };
 }, ]);
 app.controller('disModalCtrl', ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {
   $scope.status = {
     startDateOpened: false,
     endDateOpened: false,
   };
   $scope.ok = function() {
     _.forEach($scope.Info, function(n, key) {
       if (key == 'startDate' || key == 'endDate') {
         $scope.Info[key] = $scope.Info[key].toLocaleDateString();
       }
     });

     $uibModalInstance.close($scope.Info);
   };

   $scope.startDateOpen = function($event) {
     $scope.status.startDateOpened = true;
   };

   $scope.endDateOpen = function($event) {
     $scope.status.endDateOpened = true;
   };

   $scope.today = function() {
     $scope.startDate = new Date();
     $scope.endDate = new Date();
   };

   $scope.cancel = function() {
     $uibModalInstance.dismiss('cancel');
   };
 }, ]);