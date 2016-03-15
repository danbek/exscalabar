!function(){angular.module("main",["ngRoute","ui.bootstrap","ui.bootstrap.contextMenu","dygraph","cirrus.ui.ibutton","cirrus.ui.inumeric","cirrus.ui.string","ngSanitize","ui.bootstrap.dropdownToggle"])}(),function(){angular.module("main").factory("net",function(){return localStorage.ip||(localStorage.ip="192.168.0.73"),localStorage.port||(localStorage.port="8001"),{ip:localStorage.ip,port:localStorage.port,getNetworkParams:function(){return{ip:this.ip,port:this._port}},setNetworkParams:function(t,a){this._ip=t,this.port=a,localStorage.ip=t,localStorage.port=a},setIP:function(t){this.ip=t,localStorage.ip=t},setPort:function(t){this.port=t,localStorage.port=t},address:function(){return"http://"+this.ip+":"+this.port+"/xService/"}}})}(),function(){function t(t,a){for(var e in t)if(t[e].id===a)return!0;return!1}function a(t,a,e,n,i,o){this.label=t,this.id=a,this.ctlr=e,this.sn=n,this.sp=i,this.address=o}function e(t,a){var e=t,n=a;this.net=n,this.fred=1e3,this.dcred=50,this.fblue=2e3,this.dcblue=50,this.kred=1,this.kblue=1,this.kpmt=[0,0,0,0,0],this.eblue=!0,this.ered=!0,this.setLaserRate=function(t,a){var i="CRDS_CMD/fblue?Rate="+a;t?(i="CRDS_CMD/fred?Rate="+a,this.fred=a):this.fblue=a,e.get(n.address()+i)},this.setEnable=function(t){this.eblue=t[0],this.ered=t[1];var a=this.ered?1:0,i=this.eblue?1:0,o="CRDS_CMD/LaserEnable?Red="+a+"&Blue="+i;e.get(n.address()+o)},this.setGain=function(t){this.kpmt=t,e.get(n.address()+"CRDS_CMD/Vpmt?V="+t.toString())},this.setLaserGain=function(t){this.kred=t[1],this.kblue=t[0],e.get(n.address()+"CRDS_CMD/LaserGain?B1=0&B0="+t[0]+"&R="+t[1])}}function n(t,a){var e=t,n=a;this.spk={vrange:5,voffset:0,f0:1350,df:100,pos:!0,auto:!1,period:360,length:30},this.las={vr:[5,5,5,5,5],voffset:[1,2,3,4,5],f0:[1351,1352,1353,1354,1355],modulation:[!1,!1,!1,!1,!1],enable:[!1,!1,!1,!1,!1]},this.las.setf0=function(t){this.f0=t,e.get(n.address()+"PAS_CMD/UpdateFr?f0="+t.join(","))},this.las.setVr=function(t){this.las.vr=t,e.get(n.address()+"PAS_CMD/UpdateVrange?Vrange="+t.join(","))},this.las.setVo=function(t){this.las.vr=vr,e.get(n.address()+"PAS_CMD/UpdateVoffset?Voffset="+t.join(","))},this.las.updateMod=function(t){this.moduldation=t;var a=[];for(i=0;i<t.length;i++)a.push(t?1:0)},this.las.updateEnable=function(t){this.enable=t},this.spk.updateCtl=function(t){var a=t.pos?1:0;e.get(n.address()+"PAS_CMD/SpkSw?SpkSw="+a),e.get(n.address()+"PAS_CMD/Spk?df="+this.df+"&f0="+this.f0),e.get(n.address()+"PAS_CMD/UpdateSpkVparams?Voffset="+this.voffset+"&Vrange="+this.vrange)},this.spk.updateCycle=function(t,a,i){this.auto=t,this.length=i,this.period=a;var o=t?1:0;e.get(n.address()+"PAS_CMD/UpdateSpkCycle?Length="+i+"&Period="+a+"&Cycle="+o)}}angular.module("main").factory("cvt",["$http","net","$rootScope",function(i,o,s){function l(t,a,e,n,i,o){this.p=t,this.i=a,this.d=e,this.sp=n,this.en=i,this.updateEn=function(){},this.updateParams=function(t){},this.name=o}function r(t){for(var a in t)if(t.hasOwnProperty(a))return!1;return!0}var c={save:!0,ozone:!1,filter_pos:!0,first_call:1,fctl:[],power:{Pump:!1,O3Gen:!1,Denuder:!1,Laser:!1,TEC:!1},purge:{setSw:function(t){this.pos=t;var a=t?1:0;i.get(o.address()+"General/PurgeSwitch?val="+a)},pos:!0},alicat:[],vaisala:[],mTEC:[],tec:{},ppt:[]};return c.humidifier=[new l(.75,1,0,90,!1,"Medium"),new l(.75,1,0,80,!1,"High")],c.pas=new n(i,o),c.crd=new e(i,o),c.filter={cycle:{period:360,length:20,auto:!1},position:!0,updateCycle:function(t){this.cycle=t;var a=this.cycle.auto?1:0;i.get(o.address()+"General/FilterCycle?Length="+this.cycle.length+"&Period="+this.cycle.period+"&auto="+a)},updatePos:function(t){this.position=t;var a=this.position?1:0;i.get(o.address()+"General/UpdateFilter?State="+a)}},c.checkCvt=function(){promise=i.get(o.address()+"General/cvt?force="+c.first_call).then(function(e){if(first_Call=0,!r(e.data)){var n=e.data.crd,i=e.data.pas,o=e.data.device;for(var l in o){var u=o[l];switch(u.type){case"alicat":c.alicat.length>0&&!t(c.alicat,l)?c.alicat.push(new a(u.label,l,u.controller,u.sn,u.sp,u.address)):c.alicat=[new a(u.label,l,u.controller,u.sn,u.sp,u.address)];break;case"mTEC":c.mTEC.length>0&&!t(c.mTEC,l)?c.mTEC.push(new a(u.label,l,u.controller,u.sn,u.sp,u.address)):c.mTEC=[new a(u.label,l,u.controller,u.sn,u.sp,u.address)];break;case"vaisala":c.vaisala.length>0&&!t(c.vaisala,l)?c.vaisala.push(new a(u.label,l,u.controller,u.sn,u.sp,u.address)):c.vaisala=[new a(u.label,l,u.controller,u.sn,u.sp,u.address)];break;case"ppt":c.ppt.length>0&&!t(c.ppt,l)?c.ppt.push(new a(u.label,l,u.controller,u.sn,u.sp,u.address)):c.ppt=[new a(u.label,l,u.controller,u.sn,u.sp,u.address)];break;case"TEC":r(c.tec)&&(c.tec=new a(u.label,l,u.controller,u.sn,u.sp,u.address));break;default:console.log("Unexpected device found...")}s.$broadcast("deviceListRefresh")}var d=e.data.Humidifier;c.humidifier[0].p=d.Med.p,c.humidifier[0].i=d.Med.i,c.humidifier[0].d=d.Med.d,c.humidifier[0].en=d.Med.ctl,c.humidifier[0].sp=d.Med.rhsp,c.humidifier[1].p=d.High.p,c.humidifier[1].i=d.High.i,c.humidifier[1].d=d.High.d,c.humidifier[1].en=d.High.ctl,c.humidifier[1].sp=d.High.rhsp,c.crd.fred=n.red.f,c.crd.fblue=n.blue.f,c.crd.dcred=n.red.dc,c.crd.dcblue=n.blue.dc,c.crd.kpmt=n.kpmt,c.pas.las.f0=i.las.f0,c.pas.las.vrange=i.las.vrange,c.pas.las.voffset=i.las.voffset,c.pas.las.enable=i.las.enabled,c.pas.spk.f0=i.spk.fcenter,c.pas.spk.df=i.spk.df,c.pas.spk.vrange=i.spk.vrange,c.pas.spk.voffset=i.spk.voffset,c.pas.spk.auto=i.spk.cycle,c.pas.spk.length=i.spk.length,c.pas.spk.period=i.spk.period,c.pas.spk.pos=i.spk.enabled,c.filter.cycle.period=e.data.Filter.period,c.filter.cycle.length=e.data.Filter.length,c.filter.cycle.auto=e.data.Filter.auto,c.filter.position=e.data.general.filter_pos;for(var p=Number(e.data.general.power).toString(2);p.length<5;)p+="0";c.power.Pump="1"==p[4],c.power.O3Gen="1"==p[3],c.power.Denuder="1"==p[2],c.power.Laser="1"==p[1],c.power.TEC="1"==p[0],s.$broadcast("cvtUpdated")}})},c.flows={},c.flows.updateSP=function(t,a){c.flows[t]=a,i.get(o.address()+"General/DevSP?SP="+a+"&DevID="+t)},c.updatePS=function(t){i.get(o.address()+"General/PowerSupply?val="+t)},c}])}(),function(){angular.module("main").config(["$routeProvider",function(t){t.when("/CRDS",{templateUrl:"crd/crds.html"}).when("/PAS",{templateUrl:"pas/pas.html"}).when("/O3",{templateUrl:"o3/ozone.html"}).when("/",{templateUrl:"main/main.html"}).when("/Flows",{templateUrl:"alicat/flows.html"}).when("/Temperature",{templateUrl:"views/temperature.html"}).when("/Humidifier",{templateUrl:"humidity/humidifier.html"}).when("/Common",{templateUrl:"views/common.html"}).when("/Config",{templateUrl:"config/config.html"}).when("/msg",{templateUrl:"msgs/msg.html"}).when("/Checklist",{templateUrl:"checklist/checklist.html"}).when("/Housekeeping",{templateUrl:"housekeeping/housekeeping.html"})}])}(),function(){function t(t,a,e){var n={name:"",version:"",pas:{},crd:{},flow:{},tec:{},ppt:{},mtec:{},main_path:""},i=a.$$absUrl,o=i.search("#/");i=i.slice(0,o);var s="/"===i.slice(-1)?"":"/";n.main_path=i+s;var l=n.main_path+"ui.json";return t.get(l).then(function(t){n.name=t.data.name,n.version=t.data.version,n.pas=t.data.pasplot,n.crd=t.data.crdplot,n.flow=t.data.flowplot,n.tec=t.data.tec,n.ppt=t.data.ppt,n.vaisala=t.data.vaisala,e.$broadcast("CfgUpdated")},function(){console.log("Configuration file not found."),n.name="EXSCALABAR",n.version="0.1.0"})["finally"](function(){}),n}angular.module("main").factory("ExReadCfgSvc",t),t.$inject=["$http","$location","$rootScope"]}(),function(){angular.module("main").controller("ExMainCtl",["Data","$scope","$rootScope","$interval","cvt","ExReadCfgSvc","ExChecklistSvc",function(t,a,e,n,i,o,s){a.name=o.name,a.ver=o.version,n(function(){t.getData(),i.checkCvt()},1e3),s.load(),a.$on("CfgUpdated",function(){a.name=o.name,a.ver=o.version})}])}(),function(){function t(t){var a=new Date(1904,0,1);return a.setSeconds(t),a}angular.module("main").factory("Data",["$rootScope","$http","net","cvt",function(a,e,n){var i=["pDryBlue"],o=["vDryRed","vDryBlue"],s={cTime:null,tObj:new Date,save:!0,o3cal:!1,Cabin:!1,pas:{},crd:{},time:[],msg:[],date:{}},l=300,r=!1;s.filter={state:!0,tremain:0};var c=!1;return s.getData=function(){c||(c=!0,promise=e.get(n.address()+"General/Data").then(function(e){s.filter.state=e.data.Filter;var n=e.data.fcycle.tt-e.data.fcycle.te;for(s.filter.tremain=n>0?n:0,s.pas=e.data.PAS,u=0;u<i.length;u++)i[u]in e.data&&(s[i[u]]=e.data[i[u]]);for(var u=0;u<o.length;u++)o[u]in e.data&&(s[o[u]]=e.data[o[u]]);s.time.length-1>=l&&(r=!0),s.tObj=t(Number(e.data.Time)),s.Cabin=e.data.Cabin,s.msg=e.data.Msg,s.data=e.data,a.$broadcast("dataAvailable"),c=!1},function(){a.$broadcast("dataNotAvailable")})["finally"](function(){c=!1}))},s}])}(),function(){function t(t,a){function e(){if(a.msg.length>0){var e="<span>";for(i=0;i<a.msg.length;i++)e=a.msg[i].search("ERROR")>0?'<span class="cui-msg-error">':(a.msg[i].search("WARNING")>0,'<span class="cui-msg-info">'),n.msgs+=e+a.msg[i]+"</span><br>";for(i=0;i<a.msg.length;i++)a.msg[i].search("ERROR")>0?n.numType[2]+=1:a.msg[i].search("WARNING")>0?n.numType[1]+=1:n.numType[0]+=1;t.$broadcast("msgAvailable")}}var n={numType:[0,0,0],msgs:"",clearMsgArray:function(){this.msgs="",this.numType=[0,0,0],t.$broadcast("countCleared")},resetCount:function(){this.numType=[0,0,0]}};return t.$on("dataAvailable",e),n}angular.module("main").factory("ExMsgSvc",t),t.$inject=["$rootScope","Data"]}(),function(){function t(){return{restrict:"E",scope:{},templateUrl:"app/Messages/msg.html"}}angular.module("main").directive("exMsgDirective",t)}(),function(){angular.module("main").controller("ExMsgCtl",["$scope","ExMsgSvc",function(t,a){t.msgs=a.msgs,t.$on("msgAvailable",function(){t.msgs=a.msgs}),t.clrMsgs=function(){t.msgs="",a.clearMsgArray()}}])}(),function(){angular.module("main").controller("Sidebar",["$scope","$http","Data","net","cvt",function(t,a,e,n,i){t.save=1,t.filter=e.filter.state,t.time="Not connected",t.connected=!1,t.o3On=!1,t.cabin=!1,t.pumpBlocked=!1,t.impBlocked=!1,t.interlock=!1,t.time="Not Connected",t.connected=!1,t.$on("dataAvailable",function(){t.filter=e.filter.state,t.cabin=e.Cabin,t.connected=!0}),t.$on("cvtUpdated",function(){}),t.$on("dataNotAvailable",function(){t.connected=!1}),t.saveData=function(){t.save=!t.save;var e=t.save?1:0;a.get(n.address()+"General/Save?save="+e.toString())},t.setFilter=function(){t.filter=!t.filter;var e=t.filter?1:0;a.get(n.address()+"General/UpdateFilter?State="+e)},t.setCabin=function(){t.cabin=!t.cabin;var e=t.cabin?1:0;a.get(n.address()+"General/Cabin?Cabin="+e)},t.stop=function(){a.get(n.address()+"General/Stop")}}])}(),function(){angular.module("main").controller("mrAlicatConfigCtlr",["$scope",function(t){function a(t,a){this.address=t,this.id=a}t.entry=new a("A","default"),t.devices=[],t.addDevice=function(){t.devices.push(new a(t.entry.address,t.entry.id))},t.rmDevice=function(){}}])}(),function(){function t(t,a,e){function n(){this.IDs=[],this.Q=[],this.P=[],this.T=[],this.Q0=[],this.data={},this.Qsp=[],this.clear_data=function(){this.Q=[],this.P=[],this.T=[],this.Q0=[],f=!1,h=0}}function i(){this.Q=0,this.P=0,this.T=0,this.Q0=0,this.isController=!1,this.Qsp=0,this.label=""}function o(t,e){var n=t.id;e?(l.push(d.data[n].P),r.push(d.data[n].T),c.push(d.data[n].Q),u.push(d.data[n].Q0)):(l=[a.tObj,d.data[n].P],r=[a.tObj,d.data[n].T],c=[a.tObj,d.data[n].Q],u=[a.tObj,d.data[n].Q0])}function s(){for(var e="",n=0;n<m.length;n++)m[n].id in a.data&&(e=m[n].id,e in d.data||(d.data[e]=new i,0===d.IDs.length?d.IDs=[e]:d.IDs.push(e),a.data[e].Type.search("C")>=0&&(d.data[e].isController=!0,d.data[e].Qsp=a.data[e].Qsp)),d.data[e].P=a.data[e].P,d.data[e].T=a.data[e].T,d.data[e].Q=a.data[e].Q,d.data[e].label=m[n].label);m.forEach(o),f?(d.P.shift(),d.T.shift(),d.Q.shift(),d.Q0.shift()):h+=1,d.P.push(l),d.T.push(r),d.Q.push(c),d.Q0.push(u),f=h>=p,t.$broadcast("FlowDataAvailable")}var l,r,c,u,d=new n,p=300,f=!1,h=0,m=e.alicat;return t.$on("dataAvailable",s),t.$on("deviceListRefresh",function(){m=e.alicat}),d}angular.module("main").factory("ExFlowSvc",t),t.$inject=["$rootScope","Data","cvt"]}(),function(){angular.module("main").controller("ExFooterCtl",["$scope","ExMsgSvc","Data","ExCrdSvc",function(t,a,e,n){t.filter=!0,t.time="Not connected",t.connected=!1,t.o3On=!1,t.cabin=!1,t.pumpBlocked=!1,t.impBlocked=!1,t.interlock=!1,t.num_codes=[0,0,0],t.time="Not Connected",t.$on("dataAvailable",function(){t.time=e.tObj.toLocaleTimeString("en-US",{hour12:!1}),t.filter=e.filter,t.cabin=e.Cabin,t.connected=!0}),t.$on("msgAvailable",function(){t.num_codes=a.numType}),t.$on("countCleared",function(){t.num_codes=a.numType}),t.$on("dataNotAvailable",function(){t.connected=!1})}])}(),function(){angular.module("main").controller("ExPowerCtl",["$scope","cvt",function(t,a){t.power=a.power,t.order=["Pump","O3Gen","Denuder","Laser","TEC"],a.first_call=1,t.toggle=function(e){t.power[e]=!t.power[e];for(var n=0,i=0,o=0;o<t.order.length;o++)t.power.hasOwnProperty(t.order[o])&&(i=t.power[t.order[o]]?1:0,n+=Math.pow(2,o)*i);a.updatePS(n)}}])}(),function(){angular.module("main").controller("mrConfigCtlr",["$scope","$http","Data","net","cvt",function(t,a,e,n,i){i.first_call=1,t.network={ip:n.ip,port:n.port},t.changeIP=function(){n.setIP(t.network.ip)},t.changePort=function(){n.setPort(t.network.port)},t.filter={pos:!0,auto:!0,len:30,per:360,updatePos:function(){this.pos=!this.pos,console.log("updating filter position")},updateAuto:function(){auto=!auto,console.log("update filter auto")}},t.file={folder:"exscalabar\\data",main:"u:\\",mirror:"v:\\",prefix:"ex_",ext:".txt",max:10,save:!0}}])}(),function(){angular.module("main").controller("ExFilterCtl",["$scope","net","$http","cvt","Data",function(t,a,e,n,i){n.first_call=1,t.filter={cycle:n.filter.cycle,position:n.filter.position,updateCycle:function(){n.filter.updateCycle(this.cycle)},updateAuto:function(){this.cycle.auto=!this.cycle.auto,this.updateCycle()},updatePos:function(){n.filter.updatePos(this.position)}},t.tremain=i.filter.tremain,t.state=i.filter.state,t.updateAuto=function(){t.cycle.auto=!t.cycle.auto,t.updateCycle()},t.$on("dataAvailable",function(){t.tremain=i.filter.tremain,t.state=i.filter.state}),t.$on("cvtUpdated",function(){t.filter.cycle=n.filter.cycle})}])}(),function(){function t(t,n){function i(){o=e(n,o),t.$broadcast("crdDataAvaliable")}var o=new a;return t.$on("dataAvailable",i),o}function a(){this.tau=[],this.tau0=[],this.taucorr=[],this.tau0corr=[],this.ext=[],this.extcorr=[],this.stdevtau=[],this.etau=[],this.max=[],this.avg_rd=[],this.fit_rd=[],this.set_history=function(t){if(this.tau.length>t){var a=this.tau.length-t;this.tau.splice(0,a),this.tau.splice(0,a),this.tau0.splice(0,a),this.taucorr.splice(0,a),this.tau0corr.splice(0,a),this.ext.splice(0,a),this.extcorr.splice(0,a),this.stdevtau.splice(0,a),this.etau.splice(0,a),this.max.splice(0,a),n=!0}else n=!1;i=t},this.clear_history=function(){n=!1,this.tau=[],this.tau0=[],this.taucorr=[],this.tau0corr=[],this.ext=[],this.extcorr=[],this.stdevtau=[],this.etau=[],this.max=[]}}function e(t,a){var e=[t.tObj],o=[t.tObj],s=[t.tObj],l=[t.tObj],r=[t.tObj],c=[t.tObj],u=[t.tObj],d=[t.tObj],p=[t.tObj];n?(a.tau.shift(),a.tau0.shift(),a.taucorr.shift(),a.tau0corr.shift(),a.ext.shift(),a.extcorr.shift(),a.stdevtau.shift(),a.etau.shift(),a.max.shift()):n=a.tau.length>=i?!0:!1;for(var f in t.data.CellData)e.push(t.data.CellData[f].extParam.Tau),o.push(t.data.CellData[f].extParam.Tau0),r.push(t.data.CellData[f].extParam.Tau0cor),l.push(t.data.CellData[f].extParam.taucorr),c.push(t.data.CellData[f].extParam.ext),u.push(t.data.CellData[f].extParam.extCorr),s.push(t.data.CellData[f].extParam.stdevTau),d.push(t.data.CellData[f].extParam.eTau),p.push(t.data.CellData[f].extParam.max);a.avg_rd=[];for(var h=0;h<t.data.CellData[0].Ringdowns[0].length;h++){for(var m=[h],v=0;v<t.data.CellData.length;v++)m.push(t.data.CellData[v].Ringdowns[0][h]);a.avg_rd.push(m)}return a.tau.push(e),a.tau0.push(o),a.tau0corr.push(r),a.taucorr.push(l),a.extcorr.push(u),a.ext.push(c),a.stdevtau.push(s),a.etau.push(d),a.max.push(p),a}angular.module("main").factory("ExCrdSvc",t);var n=!1,i=300;t.$inject=["$rootScope","Data"]}(),function(){angular.module("main").controller("ExCrdCtl",["$scope","cvt","ExCrdSvc",function(t,a,e){a.firstcall=1;var n=function(t,a,e,n,i){this.rate=t,this.DC=a,this.k=e,this.en=n,this.id=i};t.setRate=function(){var t=arguments[0],e=arguments[1];a.crd.setLaserRate(t,e)},t.setEn=function(){var e=arguments[0];t.laser_ctl[e].en=!t.laser_ctl[e].en,a.crd.setEnable([t.laser_ctl[0].en,t.laser_ctl[1].en])},t.laser_ctl=[new n(a.crd.fblue,a.crd.dcblue,a.crd.kblue,a.crd.eblue,"Blue Laser"),new n(a.crd.fred,a.crd.dcred,a.crd.kred,a.crd.ered,"Red Laser")],t.pmt=a.crd.kpmt,t.setGain=function(){a.crd.setGain(t.pmt)},t.setLaserGain=function(){a.crd.setLaserGain([t.laser_ctl[0].k,t.laser_ctl[1].k])},t.purge={pos:!1,flow:.16,setValve:function(){this.pos=!this.pos,a.purge.setSw(this.pos)},setFlow:function(){}},t.data=e,t.setEnable=function(e){t.laser_ctl[e].en=!t.laser_ctl[e].en;var n=t.laser_ctl[e].en;switch(e){case 0:a.crd.eblue=n;break;case 1:a.crd.ered=n}},t.ringdownAvg=[[0,NaN,NaN,NaN,NaN,NaN]],t.options={title:"Ringdown Data",ylabel:"Ringdown Magnitude (au)",labels:["t","Cell 1","Cell 2","Cell 3","Cell 4","Cell 5"],legend:"always"},t.$on("crdDataAvaliable",function(){t.data=e,t.ringdownAvg=e.avg_rd}),t.$on("cvtUpdated",function(){t.laser_ctl[0].rate=a.crd.fblue,t.laser_ctl[0].DC=a.crd.dcblue,t.laser_ctl[0].k=a.crd.kblue,t.laser_ctl[0].enabled=a.crd.eblue,t.laser_ctl[1].rate=a.crd.fred,t.laser_ctl[1].DC=a.crd.dcred,t.laser_ctl[1].k=a.crd.kred,t.laser_ctl[1].enabled=a.crd.ered,t.pmt=a.crd.kpmt})}])}(),function(){function t(){var t=function(t,a,e){function n(){i.data=a[o]}var i=this,o="tau";i.cm=[["<em>&tau;</em>",function(){o="tau",i.options.ylabel="<em>&tau;</em> (&mu;s)"}],["<em>&tau;'</em>",function(){o="taucorr",i.options.ylabel="<em>&tau;'</em> (&mu;s)"}],["<em>&sigma;<sub>&tau;</sub></em>",function(){o="stdevtau",i.options.ylabel="<em>&sigma;<sub>&tau;</sub></em> (us)"}],["Max",function(){o="max",i.options.ylabel="Max (a.u.)"}],null,["Clear Data",function(){a.clear_history()}],["Length",null,[["30",function(){a.set_history(30)}],["60",function(){a.set_history(60)}],["120",function(){a.set_history(120)}],["150",function(){a.set_history(150)}],["300",function(){a.set_history(300)}]]]];var s=e.crd,l=["t"].concat(s.names);i.options={ylabel:"<em>&tau;</em> (&mu;s)",labels:l,legend:"always",axes:{y:{axisLabelWidth:70,drawGrid:s.yGrid},x:{drawAxis:!0,drawGrid:s.xGrid,axisLabelFormatter:function(t){return Dygraph.zeropad(t.getHours())+":"+Dygraph.zeropad(t.getMinutes())+":"+Dygraph.zeropad(t.getSeconds())}}},series:{}};for(var r=s.color.length,c=s.pattern.length,u=s.strokeWidth.length,d=0;d<s.names.length;d++){var p=null===s.pattern[d%c]?null:Dygraph[s.pattern[d%c]];i.options.series[s.names[d]]={color:s.color[d%r],strokeWidth:s.strokeWidth[d%u],strokePattern:p,drawPoints:!0}}void 0!==i.title&&(i.options.title=i.title),i.data=[[0,NaN,NaN,NaN,NaN,NaN]],t.$on("crdDataAvaliable",n)};return t.$inject=["$rootScope","ExCrdSvc","ExReadCfgSvc"],{restrict:"E",require:"contextMenu",scope:{title:"@?"},controller:t,controllerAs:"vm",bindToController:!0,template:'<context-menu menu-options="vm.cm"><dy-graph options="vm.options" data="vm.data" ></dy-graph></context-menu>'}}angular.module("main").directive("exCrdplot",t)}(),function(){function t(t,a,e,n){function i(){console.log("PAS data updated."),t.data=e.data,t.wvfmData=e.wvfm.micf}t.data=e.data;var o=n.pas.names.slice();o.unshift("t");var s=n.pas.color.length,l=n.pas.pattern.length;t.$on("pasDataAvaliable",i),t.wvfmData=[[0,NaN,NaN,NaN,NaN,NaN]],t.options={title:"PAS Waveform Data",ylabel:"Microphone Frequency (a.u.)",labels:o,legend:"always",series:{}};for(var r=0;r<n.pas.names.length;r++){var c=null===n.pas.pattern[r%l]?null:Dygraph[n.pas.pattern[r%l]];t.options.series[n.pas.names[r]]={color:n.pas.color[r%s],strokeWidth:1,strokePattern:c,drawPoints:!1}}t.cm_options=[["Mic. Frequency",function(){data_set="micf",t.options.ylabel="Microphone Frequency (a.u.)",t.options.axes.y.valueRange=[null,null]}],["Mic. Time",function(){data_set="mict",t.options.ylabel="Microphone Time (a.u.)",t.options.axes.y.valueRange=[null,null]}],["Photodiode Time",function(){data_set="pd",t.options.ylabel="Photodiode Time (a.u>)",t.options.axes.y.valueRange=[null,null]}]],a.first_call=1}angular.module("main").controller("ExPasCtl",t),t.$inject=["$scope","cvt","ExPasSvc","ExReadCfgSvc"]}(),function(){function t(t,n){function i(){this.f0=[],this.IA=[],this.Q=[],this.p=[],this.abs=[],this.wvfm={micf:[],mict:[],pd:[]},this.drive=!1,this.data=[],this.set_history=function(t){},this.clear=function(){this.f0=[],this.IA=[],this.Q=[],this.p=[],this.abs=[],a=!1}}function o(t,a,e,n,i,o,s){this.IA=t,this.f0=a,this.abs=e,this.Q=n,this.p=i,this.maxi=o,this.maxloc=s}function s(){var i=[n.tObj],s=[n.tObj],r=[n.tObj],c=[n.tObj],u=[n.tObj];a?(l.f0.shift(),l.IA.shift(),l.Q.shift(),l.p.shift(),l.abs.shift()):a=l.f0.length>=e;var d=n.data.PAS.CellData;for(var p in n.data.PAS.CellData)l.data.length-1<p?l.data.push(new o(d[p].derived.IA,d[p].derived.f0,d[p].derived.ext,d[p].derived.noiseLim,d[p].derived.Q,d[p].derived.max[0],d[p].derived.max[1])):l.data[p]={IA:d[p].derived.IA,f0:d[p].derived.f0,abs:d[p].derived.ext,p:d[p].derived.noiseLim,Q:d[p].derived.Q,maxi:d[p].derived.max[0],maxloc:d[p].derived.max[1]},i.push(d[p].derived.f0),s.push(d[p].derived.IA),r.push(d[p].derived.Q),c.push(d[p].derived.noiseLim),u.push(d[p].derived.ext);l.f0.push(i),l.IA.push(s),l.Q.push(r),l.p.push(c),l.abs.push(u),l.drive=n.data.PAS.Drive,l.wvfm.mict=[],l.wvfm.micf=[],l.wvfm.pd=[];for(var f=0;f<d[0].MicFreq.Y.length;f++){for(var h=[f],m=[f],v=[f],g=0;g<d.length;g++)h.push(d[g].MicFreq.Y[f]),m.push(d[g].MicTime.Y[f]),v.push(d[p].PhotoDiode.Y[f]);l.wvfm.micf.push(h),l.wvfm.mict.push(m),l.wvfm.pd.push(v)}t.$broadcast("pasDataAvaliable"),console.log("Display data now!")}t.$on("dataAvailable",s);var l=new i;return l}angular.module("main").factory("ExPasSvc",t);var a=!1,e=300;t.$inject=["$rootScope","Data"]}(),function(){angular.module("main").controller("ExPasSpkCtl",["$scope","cvt","Data",function(t,a){var e=10,n=5;t.speaker=a.pas.spk;var i={high:3e3,low:500};t.$on("cvtUpdated",function(){t.speaker=a.pas.spk}),t.setPos=function(){t.speaker.pos=!t.speaker.pos,a.pas.spk.updateCtl(t.speaker)},t.updateSpkV=function(){t.speaker.vrange>e?t.speaker.vrange=e:t.speaker.vrange<0&&(t.speaker.vrange=0),t.speaker.voffset>n?t.speaker.voffset=n:t.speaker.voffset<0&&(t.speaker.voffset=0),a.pas.spk.updateCtl(t.speaker)},t.updateSpkF=function(){t.speaker.f0=t.speaker.f0>i.high?i.high:t.speaker.f0,t.speaker.f0=t.speaker.f0<i.low?i.low:t.speaker.f0,a.pas.spk.updateCtl(t.speaker)},t.updateCycle=function(){a.pas.spk.updateCycle(t.speaker.auto,t.speaker.period,t.speaker.length)},t.updateAuto=function(){t.speaker.auto=!t.speaker.auto,t.updateCycle()}}])}(),function(){function t(t,a,e,n,i){this.Vrange=t,this.Voffset=a,this.f0=e,this.modulation=n,this.lasEn=!1}angular.module("main").controller("ExPasLasCtl",["$scope","cvt","Data",function(a,e,n){a.lasCtl=[];for(var i=0;i<e.pas.las.vr.length;i++)a.lasCtl.push(new t(e.pas.las.vr[i],e.pas.las.voffset[i],e.pas.las.f0[i],e.pas.las.modulation[i],e.pas.las.enable[i]));a.$on("dataAvailable",function(){if(n.pas.drive)for(i=0;i<n.pas.cell.length;i++)a.lasCtl[i].f0=a.data.cell[i].f0[0].y}),a.$on("cvtUpdated",function(){for(var t=0;t<e.pas.las.vr.length;t++)a.lasCtl[t].vr=e.pas.las.vr[t],a.lasCtl[t].vo=e.pas.las.voffset[t],a.lasCtl[t].f0=e.pas.las.f0[t],a.lasCtl[t].mod=e.pas.las.modulation[t],a.lasCtl[t].en=e.pas.las.enable[t]}),a.updateMod=function(t){a.lasCtl[t].modulation=!a.lasCtl[t].modulation;var n=[];for(j=0;j<a.lasCtl.length;j++)n.push(a.lasCtl[j].modulation);e.pas.las.updateMod(n)},a.updateVr=function(){var t=[];for(i=0;i<a.lasCtl.length;i++)t.push(a.lasCtl[i].Vrange);e.pas.las.setVr(t)},a.updateVo=function(){var t=[];for(i=0;i<a.lasCtl.length;i++)t.push(a.lasCtl[i].Voffset);e.pas.las.setVo(t)},a.updatef0=function(){var t=[];for(i=0;i<a.lasCtl.length;i++)t.push(a.lasCtl[i].f0);e.pas.las.setf0(t)},a.updateEnable=function(t){a.lasCtl[t].lasEn=!a.lasCtl[t].lasEn;var n=[];for(t=0;t<a.lasCtl.length;t++)n.push(a.lasCtl[t].lasEn);e.pas.las.updateEnable(n)}}])}(),function(){function t(t){var a=function(a,e){function n(){i.data=e[o]}var i=this,o="IA";i.cm=[["<em>IA (a.u.)</em>",function(){o="IA",i.options.ylabel="IA (a.u.)"}],["<em>f<sub>0</sub></em>",function(){o="f0",i.options.ylabel="<em>f<sub>0</sub></em> (Hz)"}],["Quality",function(){o="Q",i.options.ylabel="Quality (a.u.)"}],["Noise Floor",function(){o="p",i.options.ylabel="Noise (a.u.)"}],["<em>&sigma;<sub>abs</sub></em>",function(){o="abs",i.options.ylabel="<em>&sigma;<sub>abs</sub></em> (Mm<sup>-1</sup>)"}],null,["Clear Data",function(){e.clear()}],["History",null,[["30",function(){e.set_history(30)}],["60",function(){e.set_history(60)}],["120",function(){e.set_history(120)}],["150",function(){e.set_history(150)}],["300",function(){e.set_history(300)}]]],["Grid",null,[["Grid X",function(){}],["Grid Y",function(){}],["Enable",function(){}],["Disable",function(){}]]]];var s=t.pas,l=["t"].concat(s.names);i.options={ylabel:"<em>IA</em> (a.u.)",labels:l,legend:"always",axes:{y:{axisLabelWidth:70,drawGrid:s.yGrid},x:{drawAxis:!0,drawGrid:s.xGrid,axisLabelFormatter:function(t){return Dygraph.zeropad(t.getHours())+":"+Dygraph.zeropad(t.getMinutes())+":"+Dygraph.zeropad(t.getSeconds())}}},series:{}};for(var r=s.color.length,c=s.pattern.length,u=s.strokeWidth.length,d=0;d<s.names.length;d++){var p=null===s.pattern[d%c]?null:Dygraph[s.pattern[d%c]];i.options.series[s.names[d]]={color:s.color[d%r],strokeWidth:s.strokeWidth[d%u],strokePattern:p,drawPoints:!0}}void 0!==i.title&&(i.options.title=i.title),i.data=[[0,NaN,NaN,NaN,NaN,NaN]],a.$on("pasDataAvaliable",n)};return a.$inject=["$rootScope","ExPasSvc"],{restrict:"E",scope:{title:"@?"},controller:a,controllerAs:"vm",bindToController:!0,template:'<context-menu menu-options="vm.cm"><dy-graph options="vm.options" data="vm.data"></dy-graph></context-menu>'}}angular.module("main").directive("exPasplot",t),t.$inject=["ExReadCfgSvc"]}(),function(){function t(t,a,e){t.Devices={},t.updateSP=function(){var t=arguments[0],e=arguments[1];a.flows.updateSP(e,t.Qsp)},t.$on("dataAvailable",function(){t.DeviceData=e.data,t.Device=e})}angular.module("main").controller("ExFlowCtl",t),t.$inject=["$scope","cvt","ExFlowSvc"]}(),function(){function t(){var t=function(t,a,e){function n(){var t=["t"];for(var e in a.data)t.push(a.data[e].label);if(t!==i.options.labels){i.ref.updateOptions({labels:t.slice()});for(var n=i.options.labels.slice(1),l=s.color.length,r=s.pattern.length,c=s.strokeWidth.length,u=0;u<n.length;u++){var d=null===s.pattern[u%r]?null:Dygraph[s.pattern[u%r]];i.options.series[n[u]]={color:s.color[u%l],strokeWidth:s.strokeWidth[u%c],strokePattern:d,drawPoints:!0}}}i.data=a[o]}var i=this,o="P";i.ref={},i.cm=[["P",function(){o="P",i.options.ylabel="<em>P</em> (mb)",i.options.axes.y.valueRange=[null,null]}],["T",function(){o="T",i.options.ylabel="<em>T</em> (&deg;C)",i.options.axes.y.valueRange=[null,null]}],["Q",function(){o="Q",i.options.ylabel="<em>Q</em> (lpm)",i.options.axes.y.valueRange=[null,null]}],["Q0",function(){o="Q0",i.options.ylabel="<em>Q<sub>0</sub></em> (slpm)",i.options.axes.y.valueRange=[null,null]}],null,["Controller",null,[["Enable All",function(){console.log("Enabling all.")}],["Clear Data",function(){a.clear_data()}]]],["Autoscale",null,[["Autoscale 1x",function(){i.options.axes.y.valueRange=i.ref.yAxisRange()}],["Autoscale",function(){i.options.axes.y.valueRange=[null,null]}]]]];var s=e.flow;i.options={ylabel:"<em>P</em> (mb)",labels:["t","Alicat0"],legend:"always",axes:{y:{axisLabelWidth:70,drawGrid:s.yGrid},x:{drawAxis:!0,drawGrid:s.xGrid,axisLabelFormatter:function(t){return Dygraph.zeropad(t.getHours())+":"+Dygraph.zeropad(t.getMinutes())+":"+Dygraph.zeropad(t.getSeconds())}}},series:{},labelsUTC:!0},void 0!==i.title&&(i.options.title=i.title),i.data=[[0,NaN]],t.$on("FlowDataAvailable",n)};return t.$inject=["$rootScope","ExFlowSvc","ExReadCfgSvc"],{restrict:"E",require:"contextMenu",scope:{title:"@?"},controller:t,controllerAs:"vm",bindToController:!0,template:'<context-menu menu-options ="vm.cm"><dy-graph options="vm.options" ref="vm.ref" data="vm.data" ></dy-graph></context-menu>'}}angular.module("main").directive("exFlowplot",t)}(),function(){function t(t,o,s){function l(){for(var a in u){var s=a.id;s in o.data&&(!s in c.data?(c.data[s]=new e(o.data[s].P,o.data[s].T),0===c.IDs?c.IDs=[s]:c.IDs.push(s)):(c.data[s].P=o.data[s].P,c.data[s].T=o.data[s].T),u.forEach(r),d?(c.P.shift(),c.T.shift()):i+=1,c.P.push(p),c.T.push(f),d=i>=n,t.$broadcast("PptDataAvailable"))}}function r(t,a){a?(p.push(c.data[t.id].P),f.push(c.data[t.id].T)):(p=[o.tObj,c.data[t.id].P],f=[o.tObj,c.data[t.id].T])}var c=new a,u=s.ppt,d=!1;t.$on("deviceListRefresh",function(){u=s.ppt}),t.$on("dataAvailable",l);var p,f;return c}function a(){this.IDs=[],this.T=[],this.P=[],this.data={},this.clear_data=function(){this.P=[],this.T=[]},this.set_max=function(t){n=t}}function e(t,a){this.T=a,this.P=t}angular.module("main").factory("ExPptSvc",t);var n=300,i=0;t.$inject=["$rootScope","Data","cvt"]}(),function(){angular.module("main").controller("ExHumidityCtl",["$scope","cvt","Data",function(t,a,e){a.first_call=1,t.h=a.humidifier,t.setEnable=function(a){t.h[a].en=!t.h[a].en,t.updateHum(a)},t.updateHum=function(){var t=arguments[0];a.humidifier[t].updateParams()},t.ctlrOutData=[[0,NaN,NaN]],t.RH=[[0,NaN,NaN]],t.optCtlOut={ylabel:"Controller Output",labels:["t","med","high"],legend:"always"},t.optRH={ylabel:"RH (%)",labels:["t","med","high"],legend:"always"}}])}(),function(){angular.module("main").controller("startCal",["$scope","$http","net","cvt",function(t,a,e,n){t.cal=n.ozone,t.startCalibration=function(){t.cal=!t.cal;var i=t.cal?1:0;n.ozone=t.cal,a.get(e.address()+"General/ozone?start="+i.toString())}}])}(),function(){angular.module("main").controller("O3Table",["$scope","tableService",function(t,a){t.table_vals=[{id:"Wait",step:"Wait",descr:"Set a wait time in the ozone cal in seconds"},{id:"Filter",step:"Filter",descr:"Boolean that sets the filter state."},{id:"Speaker",step:"Speaker",descr:"Boolean that sets the speaker state."},{id:"O2-Valve",step:"O2 Valve",descr:"Boolean that sets the O2 valve position."},{id:"O3-Valve",step:"O3 Valve",descr:"Boolean that sets the O3 valve state."},{id:"O3-Generator",step:"O3 Generator",descr:"Boolean that sets the O3 generator state."},{id:"QO2",step:"QO2",descr:"Numeric to set the oxygen flow rate"}],t.clickRow=function(t){a.setTab(t.id.toString())}}])}(),function(){angular.module("main").factory("tableService",["$rootScope",function(t){var a={curTab:"",getTab:function(){return this.curTab},setTab:function(a){this.curTab=a,t.$broadcast("handleBroadcast")}};return a}])}(),function(){angular.module("main").factory("SaveData",function(){var t={data:[],setData:function(t){this.data=t},getData:function(){return this.data}};return t})}(),function(){angular.module("main").controller("Save",["$scope","SaveData","$http","net",function(t,a,e,n){t.cal_file="default",t.save=function(){var i='<?xml version="1.0" encoding="utf-8"?>\r\n<OZONE>\r\n';a.getData().forEach(function(t){i+="	<"+t.id+">"+t.val+"</"+t.id+">\r\n"}),i+="</OZONE>",e({method:"POST",url:n.address()+"Calibration/saveCalFile?file_name="+t.cal_file+".xml",data:i,headers:{"Content-Type":"application/x-www-form-urlencoded"}})}}])}(),function(){angular.module("main").controller("InputTable",["$scope","tableService","SaveData",function(t,a,e){t.data=[],t.$on("handleBroadcast",function(){var n=a.getTab(),i="";switch(n){case"O3-Valve":case"O2-Valve":case"O3-Generator":case"Filter":i="FALSE";break;case"Wait":case"Speaker":i="20";break;case"QO2":i="100"}t.data.push({id:n,val:i}),e.setData(t.data)})}])}(),function(){
function t(){return{restrict:"E",scope:{},templateUrl:"sidebar/side.html"}}angular.module("main").directive("sidebar",t)}(),function(){angular.module("main").factory("navservice",["$http","net","cvt",function(t,a){var e={};return e.stop=function(){t.get(a.address()+"General/Stop")},e.save=function(e){var n=e?1:0;t.get(a.address()+"General/Save?save="+n.toString())},e}])}(),function(){function t(){return{restrict:"E",scope:{name:"=?"},templateUrl:"nav/navi.html"}}angular.module("main").directive("navi",t)}(),function(){angular.module("main").controller("navctlr",["$scope","navservice",function(t,a){t.save=!0,t.updateSave=function(){t.save=!t.save,a.save(t.save)},t.stop=function(){a.stop()}}])}(),function(){function t(t,a){t.ListObj=a,t.setChecked=function(){a.update(t.ListObj)},t.$on("CheckListUpdated",function(){t.ListObj=a})}angular.module("main").controller("ExChecklistCtl",t),t.$inject=["$scope","ExChecklistSvc"]}(),function(){function t(t,a,e){var n={main:[{}],update:function(t){this.main=t.main}},i=a.$$absUrl,o=i.search("#/");i=i.slice(0,o);var s="/"===i.slice(-1)?"":"/",l=i+s+"checklist.json";return n.load=function(){t.get(l).then(function(t){n.main=t.data.main;for(var a in n.main){n.main[a].checked=[];for(var i in n.main[a].items)n.main[a].checked.push(!1)}e.$broadcast("CheckListUpdated")},function(){console.log("Checklist not found...")})["finally"](function(){})},n}angular.module("main").factory("ExChecklistSvc",t),t.$inject=["$http","$location","$rootScope"]}(),function(){function t(t,a,e){function n(){this.IDs=[],this.RH=[],this.T=[],this.Td=[],this.data={},this.clear_data=function(){this.RH=[],this.Td=[],this.T=[],p=!1,f=0}}function i(){this.RH=0,this.Td=0,this.T=0,this.label=""}function o(t,e){var n=t.id;e?(l.push(u.data[n].RH),r.push(u.data[n].T),c.push(u.data[n].Td)):(l=[a.tObj,u.data[n].RH],r=[a.tObj,u.data[n].T],c=[a.tObj,u.data[n].Td])}function s(){for(var e="",n=0;n<h.length;n++)h[n].id in a.data&&(e=h[n].id,e in u.data||(u.data[e]=new i,0===u.IDs.length?u.IDs=[e]:u.IDs.push(e)),u.data[e].RH=a.data[e].RH,u.data[e].T=a.data[e].T,u.data[e].Td=a.data[e].Td,u.data[e].label=h[n].label);h.forEach(o),p?(u.RH.shift(),u.T.shift(),u.Td.shift()):f+=1,u.RH.push(l),u.T.push(r),u.Td.push(c),p=f>=d,t.$broadcast("VaisalaDataAvailable")}var l,r,c,u=new n,d=300,p=!1,f=0,h=e.vaisala;return t.$on("dataAvailable",s),t.$on("deviceListRefresh",function(){h=e.vaisala}),u}angular.module("main").factory("ExVaisalaSvc",t),t.$inject=["$rootScope","Data","cvt"]}(),function(){function t(t,a,e){t.Devices={},t.updateSP=function(){var t=arguments[0];a.flows.updateSP(t.ID,t.sp)},t.$on("VaisalaDataAvailable",function(){t.Devices=e.data})}angular.module("main").controller("ExVaisalaCtl",t),t.$inject=["$scope","cvt","ExVaisalaSvc"]}(),function(){function t(){function t(t,a,e){function n(){var t=["t"];for(var e in a.data)t.push(a.data[e].label);if(t!==i.options.labels){i.ref.updateOptions({labels:t.slice()});for(var n=i.options.labels.slice(1),l=s.color.length,r=s.pattern.length,c=s.strokeWidth.length,u=0;u<n.length;u++){var d=null===s.pattern[u%r]?null:Dygraph[s.pattern[u%r]];i.options.series[n[u]]={color:s.color[u%l],strokeWidth:s.strokeWidth[u%c],strokePattern:d,drawPoints:!0}}}i.data=a[o]}var i=this,o="RH";i.ref={},i.cm=[["RH",function(){o="RH",i.options.ylabel="<em>RH</em> (%)",i.options.axes.y.valueRange=[null,null]}],["T",function(){o="T",i.options.ylabel="<em>T</em> (&deg;C)",i.options.axes.y.valueRange=[null,null]}],["T<sub>d</sub>",function(){o="Td",i.options.ylabel="<em>T<sub>d</sub></em> (&deg;C)",i.options.axes.y.valueRange=[null,null]}],null,["Meter",null,[["Enable All",function(){console.log("Enabling all.")}],["Clear Data",function(){a.clear_data()}]]],["Autoscale",null,[["Autoscale 1x",function(){i.options.axes.y.valueRange=i.ref.yAxisRange()}],["Autoscale",function(){i.options.axes.y.valueRange=[null,null]}]]]];var s=e.vaisala;i.options={ylabel:"<em>RH</em> (%)",labels:["t","Vaisala0"],legend:"always",axes:{y:{axisLabelWidth:70,drawGrid:s.yGrid},x:{drawAxis:!0,drawGrid:s.xGrid,axisLabelFormatter:function(t){return Dygraph.zeropad(t.getHours())+":"+Dygraph.zeropad(t.getMinutes())+":"+Dygraph.zeropad(t.getSeconds())}}},series:{},labelsUTC:!0},void 0!==i.title&&(i.options.title=i.title),i.data=[[0,NaN]],t.$on("VaisalaDataAvailable",n)}return t.$inject=["$rootScope","ExVaisalaSvc","ExReadCfgSvc"],{restrict:"E",require:"contextMenu",scope:{title:"@?"},controller:t,controllerAs:"vm",bindToController:!0,template:'<context-menu menu-options ="vm.cm"><dy-graph options="vm.options" ref="vm.ref" data="vm.data" ></dy-graph></context-menu>'}}angular.module("main").directive("exVaisalaPlot",t)}(),function(){function t(t,a){function e(){console.log("Update TE Tech CVT.")}t.ctl={P:1,I:.75,D:0},t.Tsp=18,t.ch_mult={htx:0,clx:1},t.$on("tetechCVTUpdated",e),t.set_pid=function(){console.log("New PID control set.")},t.set_mult=function(){console.log("Set multipliers.")},t.update_sp=function(){console.log("Update set point.")}}angular.module("main").controller("ExTetechCtl",t),t.$inject=["$scope","ExTetechSvc"]}(),function(){function t(t,a,e){function n(){this.t1=[],this.t2=[],this.pow=[],this.data={t1:0,t2:0,power:0},this.cvt={},this.label="",this.clear_data=function(){this.t1=[],this.t2=[],this.pow=[],r=0,l=!1}}function i(){var e=a.data.tetech;o.data.t1=e.Input1,o.data.t2=e.Input2,o.data.pow=e.Power,o.label=o.cvt.label,l?(o.t1.shift(),o.t2.shift(),o.pow.shift()):0===r?(o.t1=[[a.tObj,o.data.t1]],o.t2=[[a.tObj,o.data.t2]],o.pow=[[a.tObj,o.data.pow]],r+=1):r+=1,o.t1.push([a.tObj,o.data.t1]),o.t2.push([a.tObj,o.data.t2]),o.pow.push([a.tObj,o.data.pow]),l=r>=s,t.$broadcast("TeTechDataAvailable")}var o=new n,s=300,l=!1,r=0;return o.cvt=e.tec,t.$on("dataAvailable",i),t.$on("deviceListRefresh",function(){o.cvt=e.tec,t.$broadcast("tetechCVTUpdated")}),o}angular.module("main").factory("ExTetechSvc",t),t.$inject=["$rootScope","Data","cvt"]}(),function(){function t(){function t(t,a,e){function n(){if("pow"==o?l=["t","Power"]:l=["t","T"],l!==i.options.labels){i.ref.updateOptions({labels:l.slice()});for(var t=i.options.labels.slice(1),e=s.color.length,n=s.pattern.length,r=s.strokeWidth.length,c=0;c<t.length;c++){var u=null===s.pattern[c%n]?null:Dygraph[s.pattern[c%n]];i.options.series[t[c]]={color:s.color[c%e],strokeWidth:s.strokeWidth[c%r],strokePattern:u,drawPoints:!0}}}i.data=a[o]}var i=this,o="t1";i.ref={},i.cm=[["T<sub>1</sub>",function(){o="t1",i.options.ylabel="<em>T<sub>1</sub></em> (&deg;C)",i.options.axes.y.valueRange=[null,null]}],["T<sub>2</sub>",function(){o="t2",i.options.ylabel="<em>T<sub>2</sub></em> (&deg;C)",i.options.axes.y.valueRange=[null,null]}],["Power",function(){o="pow",i.options.ylabel="<em>Power</em> (%)",i.options.axes.y.valueRange=[null,null]}],null,["Clear Data",function(){a.clear_data()}],["Autoscale",null,[["Autoscale 1x",function(){i.options.axes.y.valueRange=i.ref.yAxisRange()}],["Autoscale",function(){i.options.axes.y.valueRange=[null,null]}]]]];var s=e.tec;i.options={ylabel:"<em>T<sub>1</sub></em> (&deg;C)",labels:["t","T"],legend:"never",axes:{y:{axisLabelWidth:70,drawGrid:s.yGrid},x:{drawAxis:!0,drawGrid:s.xGrid,axisLabelFormatter:function(t){return Dygraph.zeropad(t.getHours())+":"+Dygraph.zeropad(t.getMinutes())+":"+Dygraph.zeropad(t.getSeconds())}}},series:{},labelsUTC:!0},void 0!==i.title&&(i.options.title=i.title),i.data=[[0,NaN]],t.$on("TeTechDataAvailable",n)}return t.$inject=["$rootScope","ExTetechSvc","ExReadCfgSvc"],{restrict:"E",require:"contextMenu",scope:{title:"@?"},controller:t,controllerAs:"vm",bindToController:!0,template:'<context-menu menu-options ="vm.cm"><dy-graph options="vm.options" ref="vm.ref" data="vm.data" ></dy-graph></context-menu>'}}angular.module("main").directive("exTetechPlot",t)}();