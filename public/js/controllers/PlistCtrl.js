  app.controller('PlistCtrl', ['$scope', 'NgTableParams', 'ProService', function($scope, NgTableParams, ProService) {
    var _this = this;
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

    _this.tableParams = new NgTableParams({
      count: 100,
    }, {
      getData: function(params) {
        return ProService.getData().then(function(data) {
          return data.data;
        });
      },
    });
  },
]);
