(function() {
	angular.module('main').factory('Data', ['$rootScope', '$http', '$log',
	function($rootScope, $http, $log) {
		var pasObject = {
			"f0" : [],
			"IA" : [],
			"Q" : [],
			"p" : [],
			"abs" : []
		};
		var crdObject = {
			"tau" : [],
			"tau0" : [],
			"taucorr" : [],
			"tau0corr" : [],
			"ext" : [],
			"extcorr" : [],
			"stdvTau" : [],
			"etau" : [],
			"max" : []
		};

		var pasWFDataObj = {
			"micf" : [],
			"mict" : [],
			"pd" : []
		};

		var dataObj = {
			"time" : null,
			"pas" : [],
			"crd" : [],
			"rd" : [],
			"pasWFData" : []
		};

		return {
			data : {},
			getData : function() {
				promise = $http.get('http://192.168.24.73:8001/xService/General/Data?data=0').success(function(data, status, headers, config) {
					$rootScope.$broadcast('dataAvailable');
					
					/*data.CRD.CellData.forEach{
						value.extParam.Tau;
						
					}
					
					this.data */
					$log.log(data);
				});
			}
		};

	}]);

})();
