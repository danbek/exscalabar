(function () {
  angular.module('main').controller('ExHumidityCtl', ['$scope', 'cvt', 'Data',
  function ($scope, cvt, Data) {

    /**
    * @ngdoc controller
    * @name main.controller:humidifier
    * @requires $scope
    * @requires main.service:cvt
    * @requires main.service:Data
    *
    * @description
    * Provides functionality for the humidifier data page.
    */


    cvt.first_call = 1;


    cvt.changeWvfmState(false, false);

    /**
    * @ngdoc property
    * @name main.humidifier.high
    * @propertyOf main.controller:humidifier
    * @description
    * Object defining the properties of the high value humidifier -
    * pid values and enable.  These values are initialized with the
    * appropriate cvt controls.
    */


    $scope.h = cvt.humidifier;

    $scope.setEnable = function (i) {
      $scope.h[i].en = !$scope.h[i].en;
      $scope.updateHum(i);

    };

    $scope.$on('cvtUpdated', function () {
      $scope.h = cvt.humidifier;

    })

    $scope.$on('dataAvailable', updatePlot);

    function updatePlot(){
       console.log('Update humidity plot');
       $scope.RH_data.push([Data.tObj,Data.data.vHighRH.RH,Data.data.vMedRH.RH]);
       if($scope.RH_data.length>300){$scope.RH_data.shift()};
       $scope.RH=$scope.RH_data;
       console.log($scope);
       $scope.ctlrOut_data.push([Data.tObj,Data.data.HighTEC.Iout,Data.data.MedTEC.Iout]);
       if($scope.ctlrOut_data.length>300){$scope.ctlrOut_data.shift()};
       //$scope.ctlrOut=$scope.ctlrOut_data;
       //$scope.ctlrOutData.push([Data.tObj,Data.data.MedTEC.Iout,Data.data.HighTEC.Iout]);

       //$scope.optCtlOut.valueRange=[null,null];
       $scope.ctlref.updateOptions({'file':$scope.ctlrOut_data});
       //$scope.optCtlOut.axes.y.valueRange=[-5,5];
       //$scope.optCtlOut.axes.y.valueRange=[null,null];
    }
    $scope.updateHum = function () {
      var i = arguments[0];
      cvt.humidifier[i].updateParams();
    };

    $scope.ctlrOut_data = [];
    $scope.ctlrOut = [[new Date(),0,0]];
    $scope.RH = [[new Date(),0,0]];
    $scope.RH_data = [];
    $scope.optCtlOut = {
      ylabel: "Controller Output",
      labels: ["t", "high", "med"],
      legend: "always",
      valueRange:[null,null]
    };
    $scope.optRH = {
      ylabel: "RH (%)",
      labels: ["t", "high", "med"],
      legend: "always",
      valueRange:[null,null]
    };

  }
]);
})();
