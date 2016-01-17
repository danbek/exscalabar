!function(){angular.module("main",["ngRoute","ui.bootstrap","ui.bootstrap.contextMenu","dygraph","cirrus.ui.ibutton","cirrus.ui.inumeric","cirrus.ui.string","ngSanitize","ui.bootstrap.dropdownToggle"])}(),function(){angular.module("main").factory("net",function(){return localStorage.ip||(localStorage.ip="192.168.0.73"),localStorage.port||(localStorage.port="8001"),{ip:localStorage.ip,port:localStorage.port,getNetworkParams:function(){return{ip:this.ip,port:this._port}},setNetworkParams:function(t,e){this._ip=t,this.port=e,localStorage.ip=t,localStorage.port=e},setIP:function(t){this.ip=t,localStorage.ip=t},setPort:function(t){this.port=t,localStorage.port=t},address:function(){return"http://"+this.ip+":"+this.port+"/xService/"}}})}(),function(){function t(t,e){for(var a in t)if(t[a].id===e)return!0;return!1}function e(t,e,a,n,i,s){this.label=t,this.id=e,this.ctlr=a,this.sn=n,this.sp=i,this.address=s}function a(t,e){var a=t,n=e;this.net=n,this.fred=1e3,this.dcred=50,this.fblue=2e3,this.dcblue=50,this.kred=1,this.kblue=1,this.kpmt=[0,0,0,0,0],this.eblue=!0,this.ered=!0,this.setLaserRate=function(t,e){var i="CRDS_CMD/fblue?Rate="+e;t?(i="CRDS_CMD/fred?Rate="+e,this.fred=e):this.fblue=e,a.get(n.address()+i)},this.setEnable=function(t){this.eblue=t[0],this.ered=t[1];var e=this.ered?1:0,i=this.eblue?1:0,s="CRDS_CMD/LaserEnable?Red="+e+"&Blue="+i;a.get(n.address()+s)},this.setGain=function(t){this.kpmt=t,a.get(n.address()+"CRDS_CMD/Vpmt?V="+t.toString())},this.setLaserGain=function(t){this.kred=t[1],this.kblue=t[0],a.get(n.address()+"CRDS_CMD/LaserGain?B1=0&B0="+t[0]+"&R="+t[1])}}function n(t,e){var a=t,n=e;this.spk={vrange:5,voffset:0,f0:1350,df:100,pos:!0,auto:!1,period:360,length:30},this.las={vr:[5,5,5,5,5],voffset:[1,2,3,4,5],f0:[1351,1352,1353,1354,1355],modulation:[!1,!1,!1,!1,!1],enable:[!1,!1,!1,!1,!1]},this.las.setf0=function(t){this.f0=t,a.get(n.address()+"PAS_CMD/UpdateFr?f0="+t.join(","))},this.las.setVr=function(t){this.las.vr=t,a.get(n.address()+"PAS_CMD/UpdateVrange?Vrange="+t.join(","))},this.las.setVo=function(t){this.las.vr=vr,a.get(n.address()+"PAS_CMD/UpdateVoffset?Voffset="+t.join(","))},this.las.updateMod=function(t){this.moduldation=t;var e=[];for(i=0;i<t.length;i++)e.push(t?1:0)},this.las.updateEnable=function(t){this.enable=t},this.spk.updateCtl=function(t){var e=t.pos?1:0;a.get(n.address()+"PAS_CMD/SpkSw?SpkSw="+e),a.get(n.address()+"PAS_CMD/Spk?df="+this.df+"&f0="+this.f0),a.get(n.address()+"PAS_CMD/UpdateSpkVparams?Voffset="+this.voffset+"&Vrange="+this.vrange)},this.spk.updateCycle=function(t,e,i){this.auto=t,this.length=i,this.period=e;var s=t?1:0;a.get(n.address()+"PAS_CMD/UpdateSpkCycle?Length="+i+"&Period="+e+"&Cycle="+s)}}function s(t){for(var e in t)if(t.hasOwnProperty(e))return!1;return!0}angular.module("main").factory("cvt",["$http","net","$rootScope",function(i,o,r){function l(t,e,a,n,i,s){this.p=t,this.i=e,this.d=a,this.sp=n,this.en=i,this.updateEn=function(){},this.updateParams=function(t){},this.name=s}var c={save:!0,ozone:!1,filter_pos:!0,first_call:1,fctl:[],power:{Pump:!1,O3Gen:!1,Denuder:!1,Laser:!1,TEC:!1},purge:{setSw:function(t){this.pos=t;var e=t?1:0;i.get(o.address()+"General/PurgeSwitch?val="+e)},pos:!0},alicat:[],vaisala:[],mTEC:[],TEC:{},ppt:[]};return c.humidifier=[new l(.75,1,0,90,!1,"Medium"),new l(.75,1,0,80,!1,"High")],c.pas=new n(i,o),c.crd=new a(i,o),c.filter={cycle:{period:360,length:20,auto:!1},position:!0,updateCycle:function(t){this.cycle=t;var e=this.cycle.auto?1:0;i.get(o.address()+"General/FilterCycle?Length="+this.cycle.length+"&Period="+this.cycle.period+"&auto="+e)},updatePos:function(t){this.position=t;var e=this.position?1:0;i.get(o.address()+"General/UpdateFilter?State="+e)}},c.checkCvt=function(){promise=i.get(o.address()+"General/cvt?force="+c.first_call).then(function(a){if(first_Call=0,!s(a.data)){var n=a.data.crd,i=a.data.pas,o=a.data.device;for(var l in o){var u=o[l];switch(u.type){case"alicat":c.alicat.length>0&&!t(c.alicat,l)?c.alicat.push(new e(u.label,l,u.controller,u.sn,u.sp,u.address)):c.alicat=[new e(u.label,l,u.controller,u.sn,u.sp,u.address)];break;case"mTEC":c.mTEC.length>0&&!t(c.mTEC,l)?c.mTEC.push(new e(u.label,l,u.controller,u.sn,u.sp,u.address)):c.mTEC=[new e(u.label,l,u.controller,u.sn,u.sp,u.address)];break;case"vaisala":c.vaisala.length>0&&!t(c.vaisala,l)?c.vaisala.push(new e(u.label,l,u.controller,u.sn,u.sp,u.address)):c.vaisala=[new e(u.label,l,u.controller,u.sn,u.sp,u.address)];break;case"ppt":c.ppt.length>0&&!t(c.ppt,l)?c.ppt.push(new e(u.label,l,u.controller,u.sn,u.sp,u.address)):c.ppt=[new e(u.label,l,u.controller,u.sn,u.sp,u.address)];break;default:console.log("Unexpected device found...")}r.$broadcast("deviceListRefresh")}var d=a.data.Humidifier;c.humidifier[0].p=d.Med.p,c.humidifier[0].i=d.Med.i,c.humidifier[0].d=d.Med.d,c.humidifier[0].en=d.Med.ctl,c.humidifier[0].sp=d.Med.rhsp,c.humidifier[1].p=d.High.p,c.humidifier[1].i=d.High.i,c.humidifier[1].d=d.High.d,c.humidifier[1].en=d.High.ctl,c.humidifier[1].sp=d.High.rhsp,c.crd.fred=n.red.f,c.crd.fblue=n.blue.f,c.crd.dcred=n.red.dc,c.crd.dcblue=n.blue.dc,c.crd.kpmt=n.kpmt,c.pas.las.f0=i.las.f0,c.pas.las.vrange=i.las.vrange,c.pas.las.voffset=i.las.voffset,c.pas.las.enable=i.las.enabled,c.pas.spk.f0=i.spk.fcenter,c.pas.spk.df=i.spk.df,c.pas.spk.vrange=i.spk.vrange,c.pas.spk.voffset=i.spk.voffset,c.pas.spk.auto=i.spk.cycle,c.pas.spk.length=i.spk.length,c.pas.spk.period=i.spk.period,c.pas.spk.pos=i.spk.enabled,c.filter.cycle.period=a.data.Filter.period,c.filter.cycle.length=a.data.Filter.length,c.filter.cycle.auto=a.data.Filter.auto,c.filter.position=a.data.general.filter_pos;for(var p=Number(a.data.general.power).toString(2);p.length<5;)p+="0";c.power.Pump="1"==p[4],c.power.O3Gen="1"==p[3],c.power.Denuder="1"==p[2],c.power.Laser="1"==p[1],c.power.TEC="1"==p[0],r.$broadcast("cvtUpdated")}})},c.flows={},c.flows.updateSP=function(t,e){c.flows[t]=e,i.get(o.address()+"General/DevSP?SP="+e+"&DevID="+t)},c.updatePS=function(t){i.get(o.address()+"General/PowerSupply?val="+t)},c}])}(),function(){angular.module("main").config(["$routeProvider",function(t){t.when("/CRDS",{templateUrl:"crd/crds.html"}).when("/PAS",{templateUrl:"pas/pas.html"}).when("/O3",{templateUrl:"o3/ozone.html"}).when("/",{templateUrl:"main/main.html"}).when("/Flows",{templateUrl:"alicat/flows.html"}).when("/Temperature",{templateUrl:"views/temperature.html"}).when("/Humidifier",{templateUrl:"humidity/humidifier.html"}).when("/Common",{templateUrl:"views/common.html"}).when("/Config",{templateUrl:"config/config.html"}).when("/msg",{templateUrl:"msgs/msg.html"})}])}(),function(){function t(t,e,a){var n={name:"",version:"",pas:{colors:[],xGrid:!1,yGrid:!1},crd:{colors:[],xGrid:!1,yGrid:!1},flow:{colors:[],xGrid:!1,yGrid:!1}},i=e.$$absUrl,s=i.search("#/");i=i.slice(0,s);{var o="/"===i.slice(-1)?"":"/",r=i+o+"ui.json";t.get(r).then(function(t){n.name=t.data.name,n.version=t.data.version,n.pas.xGrid=t.data.pasplot.xGrid,n.pas.yGrid=t.data.pasplot.yGrid,n.pas.xGrid=t.data.crdplot.xGrid,n.pas.yGrid=t.data.crdplot.yGrid,n.flow.xGrid=t.data.flowplot.xGrid,n.flow.yGrid=t.data.flowplot.yGrid,a.$broadcast("CfgUpdated")},function(){console.log("Configuration file not found."),n.name="EXSCALABAR",n.version="0.1.0"})["finally"](function(){})}return n}angular.module("main").factory("ExReadCfgSvc",t),t.$inject=["$http","$location","$rootScope"]}(),function(){angular.module("main").controller("ExMainCtl",["Data","$scope","$rootScope","$interval","cvt","ExReadCfgSvc",function(t,e,a,n,i,s){e.name=s.name,e.ver=s.version,n(function(){t.getData(),i.checkCvt()},1e3),e.$on("CfgUpdated",function(){e.name=s.name,e.ver=s.version})}])}(),function(){function t(t){var e=new Date(1904,0,1);return e.setSeconds(t),e}angular.module("main").factory("Data",["$rootScope","$http","net","cvt",function(e,a,n){var i=["pDryBlue"],s=["vDryRed","vDryBlue"],o={cTime:null,tObj:new Date,save:!0,o3cal:!1,Cabin:!1,time:[],msg:[],date:{}},r=300,l=!1;o.filter={state:!0,tremain:0};var c=!1;return o.getData=function(){c||(c=!0,promise=a.get(n.address()+"General/Data").then(function(a){o.filter.state=a.data.Filter;var n=a.data.fcycle.tt-a.data.fcycle.te;for(o.filter.tremain=n>0?n:0,u=0;u<i.length;u++)i[u]in a.data&&(o[i[u]]=a.data[i[u]]);for(var u=0;u<s.length;u++)s[u]in a.data&&(o[s[u]]=a.data[s[u]]);o.time.length-1>=r&&(l=!0),o.tObj=t(Number(a.data.Time)),o.Cabin=a.data.Cabin,o.msg=a.data.Msg,o.data=a.data,e.$broadcast("dataAvailable"),c=!1},function(){e.$broadcast("dataNotAvailable")})["finally"](function(){c=!1}))},o}])}(),function(){function t(t,e){function a(){if(e.msg.length>0){var a="<span>";for(i=0;i<e.msg.length;i++)a=e.msg[i].search("ERROR")>0?'<span class="cui-msg-error">':(e.msg[i].search("WARNING")>0,'<span class="cui-msg-info">'),n.msgs+=a+e.msg[i]+"</span><br>";for(i=0;i<e.msg.length;i++)e.msg[i].search("ERROR")>0?n.numType[2]+=1:e.msg[i].search("WARNING")>0?n.numType[1]+=1:n.numType[0]+=1;t.$broadcast("msgAvailable")}}var n={numType:[0,0,0],msgs:"",clearMsgArray:function(){this.msgs="",this.numType=[0,0,0],t.$broadcast("countCleared")},resetCount:function(){this.numType=[0,0,0]}};return t.$on("dataAvailable",a),n}angular.module("main").factory("ExMsgSvc",t),t.$inject=["$rootScope","Data"]}(),function(){function t(){return{restrict:"E",scope:{},templateUrl:"app/Messages/msg.html"}}angular.module("main").directive("exMsgDirective",t)}(),function(){angular.module("main").controller("ExMsgCtl",["$scope","ExMsgSvc",function(t,e){t.msgs=e.msgs,t.$on("msgAvailable",function(){t.msgs=e.msgs}),t.clrMsgs=function(){t.msgs="",e.clearMsgArray()}}])}(),function(){angular.module("main").controller("Sidebar",["$scope","$http","Data","net","cvt",function(t,e,a,n,i){t.save=1,t.filter=a.filter.state,t.time="Not connected",t.connected=!1,t.o3On=!1,t.cabin=!1,t.pumpBlocked=!1,t.impBlocked=!1,t.interlock=!1,t.time="Not Connected",t.connected=!1,t.$on("dataAvailable",function(){t.filter=a.filter.state,t.cabin=a.Cabin,t.connected=!0}),t.$on("cvtUpdated",function(){}),t.$on("dataNotAvailable",function(){t.connected=!1}),t.saveData=function(){t.save=!t.save;var a=t.save?1:0;e.get(n.address()+"General/Save?save="+a.toString())},t.setFilter=function(){t.filter=!t.filter;var a=t.filter?1:0;e.get(n.address()+"General/UpdateFilter?State="+a)},t.setCabin=function(){t.cabin=!t.cabin;var a=t.cabin?1:0;e.get(n.address()+"General/Cabin?Cabin="+a)},t.stop=function(){e.get(n.address()+"General/Stop")}}])}(),function(){angular.module("main").controller("mrAlicatConfigCtlr",["$scope",function(t){function e(t,e){this.address=t,this.id=e}t.entry=new e("A","default"),t.devices=[],t.addDevice=function(){t.devices.push(new e(t.entry.address,t.entry.id))},t.rmDevice=function(){}}])}(),function(){function t(t,e,a){function n(){this.IDs=[],this.Q=[],this.P=[],this.T=[],this.Q0=[],this.data={},this.Qsp=[],this.clear_data=function(){this.Q=[],this.P=[],this.T=[],this.Q0=[]}}function i(){this.Q=0,this.P=0,this.T=0,this.Q0=0,this.isController=!1,this.Qsp=0,this.label=""}function s(t,a){var n=t.id;a?(r.push(d.data[n].P),l.push(d.data[n].T),c.push(d.data[n].Q),u.push(d.data[n].Q0)):(r=[e.tObj,d.data[n].P],l=[e.tObj,d.data[n].T],c=[e.tObj,d.data[n].Q],u=[e.tObj,d.data[n].Q0])}function o(){for(var a="",n=0;n<m.length;n++)m[n].id in e.data&&(a=m[n].id,a in d.data||(d.data[a]=new i,0===d.IDs.length?d.IDs=[a]:d.IDs.push(a),e.data[a].Type.search("C")>=0&&(d.data[a].isController=!0,d.data[a].Qsp=e.data[a].Qsp)),d.data[a].P=e.data[a].P,d.data[a].T=e.data[a].T,d.data[a].Q=e.data[a].Q,d.data[a].label=m[n].label);m.forEach(s),f?(d.P.shift(),d.T.shift(),d.Q.shift(),d.Q0.shift()):h+=1,d.P.push(r),d.T.push(l),d.Q.push(c),d.Q0.push(u),f=h>=p,t.$broadcast("FlowDataAvailable")}var r,l,c,u,d=new n,p=300,f=!1,h=0,m=a.alicat;return t.$on("dataAvailable",o),t.$on("deviceListRefresh",function(){m=a.alicat}),d}angular.module("main").factory("ExFlowSvc",t),t.$inject=["$rootScope","Data","cvt"]}(),function(){angular.module("main").controller("ExFooterCtl",["$scope","ExMsgSvc","Data","ExCrdSvc",function(t,e,a,n){t.filter=!0,t.time="Not connected",t.connected=!1,t.o3On=!1,t.cabin=!1,t.pumpBlocked=!1,t.impBlocked=!1,t.interlock=!1,t.num_codes=[0,0,0],t.time="Not Connected",t.$on("dataAvailable",function(){t.time=a.tObj.toLocaleTimeString("en-US",{hour12:!1}),t.filter=a.filter,t.cabin=a.Cabin,t.connected=!0}),t.$on("msgAvailable",function(){t.num_codes=e.numType}),t.$on("countCleared",function(){t.num_codes=e.numType}),t.$on("dataNotAvailable",function(){t.connected=!1})}])}(),function(){angular.module("main").controller("ExPowerCtl",["$scope","cvt",function(t,e){t.power=e.power,t.order=["Pump","O3Gen","Denuder","Laser","TEC"],e.first_call=1,t.toggle=function(a){t.power[a]=!t.power[a];for(var n=0,i=0,s=0;s<t.order.length;s++)t.power.hasOwnProperty(t.order[s])&&(i=t.power[t.order[s]]?1:0,n+=Math.pow(2,s)*i);e.updatePS(n)}}])}(),function(){angular.module("main").controller("mrConfigCtlr",["$scope","$http","Data","net","cvt",function(t,e,a,n,i){i.first_call=1,t.network={ip:n.ip,port:n.port},t.changeIP=function(){n.setIP(t.network.ip)},t.changePort=function(){n.setPort(t.network.port)},t.filter={pos:!0,auto:!0,len:30,per:360,updatePos:function(){this.pos=!this.pos,console.log("updating filter position")},updateAuto:function(){auto=!auto,console.log("update filter auto")}},t.file={folder:"exscalabar\\data",main:"u:\\",mirror:"v:\\",prefix:"ex_",ext:".txt",max:10,save:!0}}])}(),function(){angular.module("main").controller("ExFilterCtl",["$scope","net","$http","cvt","Data",function(t,e,a,n,i){n.first_call=1,t.filter={cycle:n.filter.cycle,position:n.filter.position,updateCycle:function(){n.filter.updateCycle(this.cycle)},updateAuto:function(){this.cycle.auto=!this.cycle.auto,this.updateCycle()},updatePos:function(){n.filter.updatePos(this.position)}},t.tremain=i.filter.tremain,t.state=i.filter.state,t.updateAuto=function(){t.cycle.auto=!t.cycle.auto,t.updateCycle()},t.$on("dataAvailable",function(){t.tremain=i.filter.tremain,t.state=i.filter.state}),t.$on("cvtUpdated",function(){t.filter.cycle=n.filter.cycle})}])}(),function(){function t(t,n){function i(){s=a(n,s),t.$broadcast("crdDataAvaliable")}var s=new e;return t.$on("dataAvailable",i),s}function e(){this.tau=[],this.tau0=[],this.taucorr=[],this.tau0corr=[],this.ext=[],this.extcorr=[],this.stdevtau=[],this.etau=[],this.max=[],this.avg_rd=[],this.fit_rd=[],this.set_history=function(t){if(this.tau.length>t){var e=this.tau.length-t;this.tau.splice(0,e),this.tau.splice(0,e),this.tau0.splice(0,e),this.taucorr.splice(0,e),this.tau0corr.splice(0,e),this.ext.splice(0,e),this.extcorr.splice(0,e),this.stdevtau.splice(0,e),this.etau.splice(0,e),this.max.splice(0,e),n=!0}else n=!1;i=t},this.clear_history=function(){n=!1,this.tau=[],this.tau0=[],this.taucorr=[],this.tau0corr=[],this.ext=[],this.extcorr=[],this.stdevtau=[],this.etau=[],this.max=[]}}function a(t,e){var a=[t.tObj],s=[t.tObj],o=[t.tObj],r=[t.tObj],l=[t.tObj],c=[t.tObj],u=[t.tObj],d=[t.tObj],p=[t.tObj];n?(e.tau.shift(),e.tau0.shift(),e.taucorr.shift(),e.tau0corr.shift(),e.ext.shift(),e.extcorr.shift(),e.stdevtau.shift(),e.etau.shift(),e.max.shift()):n=e.tau.length>=i?!0:!1;for(var f in t.data.CellData)a.push(t.data.CellData[f].extParam.Tau),s.push(t.data.CellData[f].extParam.Tau0),l.push(t.data.CellData[f].extParam.Tau0cor),r.push(t.data.CellData[f].extParam.taucorr),c.push(t.data.CellData[f].extParam.ext),u.push(t.data.CellData[f].extParam.extCorr),o.push(t.data.CellData[f].extParam.stdevTau),d.push(t.data.CellData[f].extParam.eTau),p.push(t.data.CellData[f].extParam.max);e.avg_rd=[];for(var h=0;h<t.data.CellData[0].Ringdowns[0].length;h++){for(var m=[h],v=0;v<t.data.CellData.length;v++)m.push(t.data.CellData[v].Ringdowns[0][h]);e.avg_rd.push(m)}return e.tau.push(a),e.tau0.push(s),e.tau0corr.push(l),e.taucorr.push(r),e.extcorr.push(u),e.ext.push(c),e.stdevtau.push(o),e.etau.push(d),e.max.push(p),e}angular.module("main").factory("ExCrdSvc",t);var n=!1,i=300;t.$inject=["$rootScope","Data"]}(),function(){angular.module("main").controller("ExCrdCtl",["$scope","cvt","ExCrdSvc",function(t,e,a){e.firstcall=1;var n=function(t,e,a,n,i){this.rate=t,this.DC=e,this.k=a,this.en=n,this.id=i};t.setRate=function(){var t=arguments[0],a=arguments[1];e.crd.setLaserRate(t,a)},t.setEn=function(){var a=arguments[0];t.laser_ctl[a].en=!t.laser_ctl[a].en,e.crd.setEnable([t.laser_ctl[0].en,t.laser_ctl[1].en])},t.laser_ctl=[new n(e.crd.fblue,e.crd.dcblue,e.crd.kblue,e.crd.eblue,"Blue Laser"),new n(e.crd.fred,e.crd.dcred,e.crd.kred,e.crd.ered,"Red Laser")],t.pmt=e.crd.kpmt,t.setGain=function(){e.crd.setGain(t.pmt)},t.setLaserGain=function(){e.crd.setLaserGain([t.laser_ctl[0].k,t.laser_ctl[1].k])},t.purge={pos:!1,flow:.16,setValve:function(){this.pos=!this.pos,e.purge.setSw(this.pos)},setFlow:function(){}},t.data=a,t.setEnable=function(a){t.laser_ctl[a].en=!t.laser_ctl[a].en;var n=t.laser_ctl[a].en;switch(a){case 0:e.crd.eblue=n;break;case 1:e.crd.ered=n}},t.ringdownAvg=[[0,0/0,0/0,0/0,0/0,0/0]],t.options={title:"Ringdown Data",ylabel:"Ringdown Magnitude (au)",labels:["t","Cell 1","Cell 2","Cell 3","Cell 4","Cell 5"],legend:"always"},t.$on("crdDataAvaliable",function(){t.data=a,t.ringdownAvg=a.avg_rd}),t.$on("cvtUpdated",function(){t.laser_ctl[0].rate=e.crd.fblue,t.laser_ctl[0].DC=e.crd.dcblue,t.laser_ctl[0].k=e.crd.kblue,t.laser_ctl[0].enabled=e.crd.eblue,t.laser_ctl[1].rate=e.crd.fred,t.laser_ctl[1].DC=e.crd.dcred,t.laser_ctl[1].k=e.crd.kred,t.laser_ctl[1].enabled=e.crd.ered,t.pmt=e.crd.kpmt})}])}(),function(){function t(){var t=function(t,e,a){function n(){i.data=e[s]}var i=this,s="tau";i.cm=[["<em>&tau;</em>",function(){s="tau",i.options.ylabel="<em>&tau;</em> (&mu;s)"}],["<em>&tau;'</em>",function(){s="taucorr",i.options.ylabel="<em>&tau;'</em> (&mu;s)"}],["<em>&sigma;<sub>&tau;</sub></em>",function(){s="stdevtau",i.options.ylabel="<em>&sigma;<sub>&tau;</sub></em> (us)"}],["Max",function(){s="max",i.options.ylabel="Max (a.u.)"}],null,["Clear Data",function(){e.clear_history()}],["Length",null,[["30",function(){e.set_history(30)}],["60",function(){e.set_history(60)}],["120",function(){e.set_history(120)}],["150",function(){e.set_history(150)}],["300",function(){e.set_history(300)}]]]],i.options={ylabel:"<em>&tau;</em> (&mu;s)",labels:["t","Cell 1","Cell 2","Cell 3","Cell 4","Cell 5"],legend:"always",axes:{y:{axisLabelWidth:70,drawGrid:a.crd.yGrid},x:{drawAxis:!0,drawGrid:a.crd.yGrid,axisLabelFormatter:function(t){return Dygraph.zeropad(t.getHours())+":"+Dygraph.zeropad(t.getMinutes())+":"+Dygraph.zeropad(t.getSeconds())}}}},void 0!==i.title&&(i.options.title=i.title),i.data=[[0,0/0,0/0,0/0,0/0,0/0]],t.$on("crdDataAvaliable",n)};return t.$inject=["$rootScope","ExCrdSvc","ExReadCfgSvc"],{restrict:"E",require:"contextMenu",scope:{title:"@?"},controller:t,controllerAs:"vm",bindToController:!0,template:'<context-menu menu-options="vm.cm"><dy-graph options="vm.options" data="vm.data" ></dy-graph></context-menu>'}}angular.module("main").directive("exCrdplot",t)}(),function(){function t(t,e,a){function n(){t.data=a}t.data=a,t.$on("pasDataAvailable",n),e.first_call=1}angular.module("main").controller("ExPasCtl",t),t.$inject=["$scope","cvt","ExPasSvc"]}(),function(){function t(t,n){var i=new e;return t.$on("dataAvailable",function(){i=a(n,i),t.$broadcast("pasDataAvaliable")}),i}function e(){this.f0=[],this.IA=[],this.Q=[],this.p=[],this.abs=[],this.wvfm={micf:[],mict:[],pd:[]},this.drive=!1,this.set_history=function(t){},this.clear=function(){this.f0=[],this.IA=[],this.Q=[],this.p=[],this.abs=[],n=!1}}function a(t,e){var a=[t.tObj],s=[t.tObj],o=[t.tObj],r=[t.tObj],l=[t.tObj];n?(e.f0.shift(),e.IA.shift(),e.Q.shift(),e.p.shift(),e.abs.shift()):n=e.f0.length>=i?!0:!1;for(var c in t.data.PAS.CellData)a.push(t.data.PAS.CellData[c].derived.f0),s.push(t.data.PAS.CellData[c].derived.IA),o.push(t.data.PAS.CellData[c].derived.Q),r.push(t.data.PAS.CellData[c].derived.noiseLim),l.push(t.data.PAS.CellData[c].derived.ext);for(e.f0.push(a),e.IA.push(s),e.Q.push(o),e.p.push(r),e.abs.push(l),e.drive=t.data.PAS.Drive,e.wvfm.mict=[],e.wvfm.micf=[],e.wvfm.pd=[],k=0;k<t.data.PAS.CellData[0].MicFreq.Y.length;k++){var u=[k],d=[k],p=[k];for(j=0;j<t.pas.CellData.length;j++)u.push(t.data.PAS.CellData[j].MicFreq.Y[j]),d.push(t.data.PAS.CellData[j].MicTime.Y[j]),p.push(t.data.PAS.CellData[c].PhotoDiode.Y[j]);e.wvfm.micf.push(u),e.wvfm.mict.push(d),e.wvfm.pd.push(p)}return e}angular.module("main").factory("ExPasSvc",t);var n=!1,i=300;t.$inject=["$rootScope","Data"]}(),function(){angular.module("main").controller("pasSpk",["$scope","cvt","Data",function(t,e,a){var n=10,i=5;t.speaker=e.pas.spk;var s={high:3e3,low:500};t.$on("cvtUpdated",function(){t.speaker=e.pas.spk}),t.setPos=function(){t.speaker.pos=!t.speaker.pos,e.pas.spk.updateCtl(t.speaker)},t.updateSpkV=function(){t.speaker.vrange>n?t.speaker.vrange=n:t.speaker.vrange<0&&(t.speaker.vrange=0),t.speaker.voffset>i?t.speaker.voffset=i:t.speaker.voffset<0&&(t.speaker.voffset=0),e.pas.spk.updateCtl(t.speaker)},t.updateSpkF=function(){t.speaker.f0>s.high?t.speaker.f0=s.high:t.speaker.f0<s.low&&(t.speaker.f0=s.low),e.pas.spk.updateCtl(t.speaker)},t.updateCycle=function(){e.pas.spk.updateCycle(t.speaker.auto,t.speaker.period,t.speaker.length)},t.updateAuto=function(){t.speaker.auto=!t.speaker.auto,t.updateCycle()}}])}(),function(){function t(t,e,a,n,i){this.Vrange=t,this.Voffset=e,this.f0=a,this.modulation=n,this.lasEn=!1}angular.module("main").controller("pasLas",["$scope","cvt","Data",function(e,a,n){for(e.lasCtl=[],e.testVal="hello",i=0;i<a.pas.las.vr.length;i++)e.lasCtl.push(new t(a.pas.las.vr[i],a.pas.las.voffset[i],a.pas.las.f0[i],a.pas.las.modulation[i],a.pas.las.enable[i]));e.$on("dataAvailable",function(){if(n.pas.drive)for(i=0;i<n.pas.cell.length;i++)e.lasCtl[i].f0=e.data.cell[i].f0[0].y}),e.$on("cvtUpdated",function(){for(i=0;i<a.pas.las.vr.length;i++)e.lasCtl[i].vr=a.pas.las.vr[i],e.lasCtl[i].vo=a.pas.las.voffset[i],e.lasCtl[i].f0=a.pas.las.f0[i],e.lasCtl[i].mod=a.pas.las.modulation[i],e.lasCtl[i].en=a.pas.las.enable[i]}),e.updateMod=function(t){e.lasCtl[t].modulation=!e.lasCtl[t].modulation;var n=[];for(j=0;j<e.lasCtl.length;j++)n.push(e.lasCtl[j].modulation);a.pas.las.updateMod(n)},e.updateVr=function(){var t=[];for(i=0;i<e.lasCtl.length;i++)t.push(e.lasCtl[i].Vrange);a.pas.las.setVr(t)},e.updateVo=function(){var t=[];for(i=0;i<e.lasCtl.length;i++)t.push(e.lasCtl[i].Voffset);a.pas.las.setVo(t)},e.updatef0=function(){var t=[];for(i=0;i<e.lasCtl.length;i++)t.push(e.lasCtl[i].f0);a.pas.las.setf0(t)},e.updateEnable=function(t){e.lasCtl[t].lasEn=!e.lasCtl[t].lasEn;var n=[];for(t=0;t<e.lasCtl.length;t++)n.push(e.lasCtl[t].lasEn);a.pas.las.updateEnable(n)}}])}(),function(){function t(t){var e=function(e,a){function n(){i.data=a[s]}var i=this,s="IA";i.cm=[["<em>IA</em>",function(){s="IA",i.options.ylabel="IA (a.u.)"}],["<em>f<sub>0</sub></em>",function(){s="f0",i.options.ylabel="<em>f<sub>0</sub></em> (Hz)"}],["Quality",function(){s="Q",i.options.ylabel="Quality (a.u.)"}],["Noise Floor",function(){s="p",i.options.ylabel="Noise (a.u.)"}],["<em>&sigma;<sub>abs</sub></em>",function(){s="abs",i.options.ylabel="<em>&sigma;<sub>abs</sub></em> (Mm<sup>-1</sup>)"}],null,["Clear Data",function(){a.clear()}],["History",null,[["30",function(){a.set_history(30)}],["60",function(){a.set_history(60)}],["120",function(){a.set_history(120)}],["150",function(){a.set_history(150)}],["300",function(){a.set_history(300)}]]],["Grid",null,[["Grid X",function(){}],["Grid Y",function(){}],["Enable",function(){}],["Disable",function(){}]]]],i.options={ylabel:"IA (a.u.)",labels:["t","Cell 1","Cell 2","Cell 3","Cell 4","Cell 5"],legend:"always",axes:{y:{axisLabelWidth:70,drawGrid:t.pas.yGrid},x:{drawAxis:!0,drawGrid:t.pas.xGrid,axisLabelFormatter:function(t){return Dygraph.zeropad(t.getHours())+":"+Dygraph.zeropad(t.getMinutes())+":"+Dygraph.zeropad(t.getSeconds())}}}},void 0!==i.title&&(i.options.title=i.title),i.data=[[0,0/0,0/0,0/0,0/0,0/0]],e.$on("pasDataAvaliable",n)};return e.$inject=["$rootScope","ExPasSvc"],{restrict:"E",scope:{title:"@?"},controller:e,controllerAs:"vm",bindToController:!0,template:'<context-menu menu-options="vm.cm"><dy-graph options="vm.options" data="vm.data"></dy-graph></context-menu>'}}angular.module("main").directive("exPasplot",t),t.$inject=["ExReadCfgSvc"]}(),function(){function t(t,e,a){t.Devices={},t.updateSP=function(){var t=arguments[0];e.flows.updateSP(t.ID,t.sp)},t.$on("dataAvailable",function(){t.Devices=a.data})}angular.module("main").controller("ExFlowCtl",t),t.$inject=["$scope","Data","cvt","ExFlowSvc"]}(),function(){function t(){var t=function(t,e,a){function n(){var t=["t"].concat(e.IDs);t!==i.options.labels&&(i.options.labels=t.slice()),i.data=e[s]}var i=this,s="P";i.ref={},i.cm=[["P",function(){s="P",i.options.ylabel="P (mb)",i.options.axes.y.valueRange=[null,null]}],["T",function(){s="T",i.options.ylabel="T (degC)",i.options.axes.y.valueRange=[null,null]}],["Q",function(){s="Q",i.options.ylabel="Q (lpm)",i.options.axes.y.valueRange=[null,null]}],["Q0",function(){s="Q0",i.options.ylabel="Q0 (slpm)",i.options.axes.y.valueRange=[null,null]}],null,["Controller",null,[["Controller 1",function(){console.log("Controller 1 fired.")}],["Controller 2",function(){console.log("Controller 2 fired.")}]],["Enable All",function(){console.log("Enabling all.")}],["Clear Data",function(){e.clear_data()}]],["Autoscale",null,[["Autoscale 1x",function(){i.options.axes.y.valueRange=i.ref.yAxisRange()}],["Autoscale",function(){i.options.axes.y.valueRange=[null,null]}]]]],i.options={ylabel:"P (mb)",labels:["t","Alicat0"],legend:"always",axes:{y:{axisLabelWidth:70,drawGrid:a.flow.yGrid},x:{drawAxis:!0,drawGrid:a.flow.xGrid,axisLabelFormatter:function(t){return Dygraph.zeropad(t.getHours())+":"+Dygraph.zeropad(t.getMinutes())+":"+Dygraph.zeropad(t.getSeconds())}}},labelsUTC:!0},void 0!==i.title&&(i.options.title=i.title),i.data=[[0,0/0]],t.$on("FlowDataAvailable",n)};return t.$inject=["$rootScope","ExFlowSvc","ExReadCfgSvc"],{restrict:"E",require:"contextMenu",scope:{title:"@?"},controller:t,controllerAs:"vm",bindToController:!0,template:'<context-menu menu-options ="vm.cm"><dy-graph options="vm.options" ref= "vm.ref" data="vm.data" ></dy-graph></context-menu>'}}angular.module("main").directive("exFlowplot",t)}(),function(){angular.module("main").controller("ExHumidityCtl",["$scope","cvt","Data",function(t,e,a){e.first_call=1,t.h=e.humidifier,t.setEnable=function(e){t.h[e].en=!t.h[e].en,t.updateHum(e)},t.updateHum=function(){var t=arguments[0];e.humidifier[t].updateParams()},t.ctlrOutData=[[0,0/0,0/0]],t.RH=[[0,0/0,0/0]],t.optCtlOut={ylabel:"Controller Output",labels:["t","med","high"],legend:"always"},t.optRH={ylabel:"RH (%)",labels:["t","med","high"],legend:"always"}}])}(),function(){angular.module("main").controller("startCal",["$scope","$http","net","cvt",function(t,e,a,n){t.cal=n.ozone,t.startCalibration=function(){t.cal=!t.cal;var i=t.cal?1:0;n.ozone=t.cal,e.get(a.address()+"General/ozone?start="+i.toString())}}])}(),function(){angular.module("main").controller("O3Table",["$scope","tableService",function(t,e){t.table_vals=[{id:"Wait",step:"Wait",descr:"Set a wait time in the ozone cal in seconds"},{id:"Filter",step:"Filter",descr:"Boolean that sets the filter state."},{id:"Speaker",step:"Speaker",descr:"Boolean that sets the speaker state."},{id:"O2-Valve",step:"O2 Valve",descr:"Boolean that sets the O2 valve position."},{id:"O3-Valve",step:"O3 Valve",descr:"Boolean that sets the O3 valve state."},{id:"O3-Generator",step:"O3 Generator",descr:"Boolean that sets the O3 generator state."},{id:"QO2",step:"QO2",descr:"Numeric to set the oxygen flow rate"}],t.clickRow=function(t){e.setTab(t.id.toString())}}])}(),function(){angular.module("main").factory("tableService",["$rootScope",function(t){var e={curTab:"",getTab:function(){return this.curTab},setTab:function(e){this.curTab=e,t.$broadcast("handleBroadcast")}};return e}])}(),function(){angular.module("main").factory("SaveData",function(){var t={data:[],setData:function(t){this.data=t},getData:function(){return this.data}};return t})}(),function(){angular.module("main").controller("Save",["$scope","SaveData","$http","net",function(t,e,a,n){t.cal_file="default",t.save=function(){var i='<?xml version="1.0" encoding="utf-8"?>\r\n<OZONE>\r\n';e.getData().forEach(function(t){i+="	<"+t.id+">"+t.val+"</"+t.id+">\r\n"}),i+="</OZONE>",a({method:"POST",url:n.address()+"Calibration/saveCalFile?file_name="+t.cal_file+".xml",data:i,headers:{"Content-Type":"application/x-www-form-urlencoded"}})}}])}(),function(){angular.module("main").controller("InputTable",["$scope","tableService","SaveData",function(t,e,a){t.data=[],t.$on("handleBroadcast",function(){var n=e.getTab(),i="";switch(n){case"O3-Valve":case"O2-Valve":case"O3-Generator":case"Filter":i="FALSE";break;case"Wait":case"Speaker":i="20";break;case"QO2":i="100"}t.data.push({id:n,val:i}),a.setData(t.data)})}])}(),function(){function t(){return{restrict:"E",scope:{},templateUrl:"sidebar/side.html"}}angular.module("main").directive("sidebar",t)}(),function(){angular.module("main").factory("navservice",["$http","net","cvt",function(t,e,a){var n={};return n.stop=function(){t.get(e.address()+"General/Stop")},n.save=function(a){var n=a?1:0;t.get(e.address()+"General/Save?save="+n.toString())},n}])}(),function(){function t(){return{restrict:"E",scope:{name:"=?"},templateUrl:"nav/navi.html"}}angular.module("main").directive("navi",t)}(),function(){angular.module("main").controller("navctlr",["$scope","navservice",function(t,e){t.save=!0,t.updateSave=function(){t.save=!t.save,e.save(t.save)},t.stop=function(){e.stop()}}])}();