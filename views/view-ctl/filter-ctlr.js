(function(){
  angular.module('main').controller('filter', ['$scope', 'net', '$http', 'cvt',
  'Data', function($scope, net, $http, cvt, Data){

    /* Filter cycle consists of a period that defines the time in seconds
     * between which the filter is cycled to true, length of time in seconds
     * that the filter is on and a boolean indicating whether the syste is set
     * to cycle.
     */

    $scope.cycle = {
      "auto": cvt.filter_cycle.auto,
      "period":cvt.filter_cycle.period,
      "length":cvt.filter_cycle.length
    };

    $scope.position = cvt.filter_pos;


    $scope.tremain = Data.filter.tremain;
    $scope.state = Data.filter.state;

    $scope.updateCycle = function(){
      var val = $scope.cycle.auto ? 1 : 0;
      $http.get(net.address() + 'General/FilterCycle?Length=' +
      $scope.cycle.length + '&Period=' + $scope.cycle.period + '&auto=' + val);
      cvt.filter_cycle = {"period": $scope.cycle.period,
                          "length":$scope.cycle.length,
                          "auto": $scope.cycle.auto};

    };

    $scope.updateFilter = function(){
      var val = $scope.position ? 1:0;
      $http.get(net.address() + 'General/UpdateFilter?State=' + val);
      cvt.pos = $scope.position;

    };

    $scope.updateAuto = function() {
			$scope.cycle.auto = !$scope.cycle.auto;
			$scope.updateCycle();
		};

    $scope.$on('dataAvailable', function(){
      $scope.tremain = Data.filter.tremain;
      $scope.state = Data.filter.state;
    });

    $scope.$on('cvtUpdated', function(){
      $scope.cycle = {
        "auto": cvt.filter_cycle.auto,
        "period":cvt.filter_cycle.period,
        "length":cvt.filter_cycle.length
      };
    });
}]);
})();
