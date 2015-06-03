/** This is the main service for retrieving data at regular intervals.
 * 
 */

(function() {
	angular.module('main')
	.factory('Data', ['$rootScope', '$http', '$log', 'net',
	function($rootScope, $http, $log, net) {
		
		/* Contains data specific to the PAS */
		var pasObject = function (){
			this.f0  = [];
			this.IA = [];
			this.Q =  [];
			this.p = [];
			this.abs = [];
			this.drive =  false;
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

		/* The full data object contains arrays of data as defined in the objects above */
		var dataObj = {
			"time" : null,
			"filter": true,
			"save": true,
			"o3cal": false,
			"pas" : [],
			"crd" : [],
			"rd" : [],
			"pasWFData" : []
		};
		
		dataObj.pas = [new pasObject()];
		//dataObj.crd = [new crdObject()];

		return {
			getPASData: function(){return dataObj.pas;},
			getTime: function(){return dataObj.time;},
			getData: function(){return dataObj;},
			getData : function() {
				promise = $http.get('http://' + net.address() + '/xService/General/Data')
				.success(function(data, status, headers, config) {
					$rootScope.$broadcast('dataAvailable');
					//updateTime(jsonobj.PAS.Time);
					//data.CRD.CellData.forEach{
					//	value.extParam.Tau;
						
					//}
					dataObj.time = data.Time;
					
					/*data.PAS.CellData.foreach(
						function(cell)
						{
							
						});
						*/
						// TODO: Fix this hideousness!!!  Has to be a better way...
						for (var index in data.PAS.CellData){
							
							/* Make sure we have all of the cells accounted for */
							if ((dataObj.pas.length - 1) < index){
								dataObj.pas.push(new pasObject());
							}
							
							/* Handle the resonant frequency data */
							if (dataObj.pas[index].f0.length >= 100){
								dataObj.pas[index].f0.pop();
							}
							
							dataObj.pas[index].f0.unshift(data.PAS.CellData[index].derived.f0);
							
							/* Handle the integrated area data */
							if (dataObj.pas[index].IA.length >= 100){
								dataObj.pas[index].IA.pop();
							}
							
							dataObj.pas[index].IA.unshift(data.PAS.CellData[index].derived.IA);
							
							/* Handle the quality data */
							if (dataObj.pas[index].Q.length >= 100){
								dataObj.pas[index].Q.pop();
							}
							dataObj.pas[index].Q.unshift(data.PAS.CellData[index].derived.Q);
						}
					//$log.log(data);
				});
			}
		};

	}]);
	
	function updateTime(t){
            	/* The reference for LabVIEW time is 1 Jan 1904.  JS days
				 * are zero based so set the value to the correct date for 
	 			 * reference.
	 			 */
            	var lvDate = new Date(1904,0,1);
            	lvDate.setSeconds(t);
            	var strTime = lvDate.getHours() +':' 
            		+ (lvDate.getMinutes() < 10 ? "0": "") + lvDate.getMinutes() + ':' 
            		+ (lvDate.getSeconds() < 10 ? "0": "") + lvDate.getSeconds() + '.' 
            		+ lvDate.getMilliseconds();
            }


})();

