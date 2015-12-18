!function(){angular.module("main",["ngRoute","ui.bootstrap","ui.bootstrap.contextMenu","dygraph","cirrus.ui.ibutton","cirrus.ui.inumeric","cirrus.ui.string","ngSanitize"])}(),function(){angular.module("main").factory("net",function(){return localStorage.ip||(localStorage.ip="192.168.0.73"),localStorage.port||(localStorage.port="8001"),{ip:localStorage.ip,port:localStorage.port,getNetworkParams:function(){return{ip:this.ip,port:this._port}},setNetworkParams:function(t,e){this._ip=t,this.port=e,localStorage.ip=t,localStorage.port=e},setIP:function(t){this.ip=t,localStorage.ip=t},setPort:function(t){this.port=t,localStorage.port=t},address:function(){return"http://"+this.ip+":"+this.port+"/xService/"}}})}(),function(){function t(t,e,a,l,n,i){this.p=t,this.i=e,this.d=a,this.sp=l,this.en=n,this.updateEn=function(){},this.updateParams=function(t){},this.name=i}function e(t,e){var a=t,l=e;this.net=l,this.fred=1e3,this.dcred=50,this.fblue=2e3,this.dcblue=50,this.kred=1,this.kblue=1,this.kpmt=[0,0,0,0,0],this.eblue=!0,this.ered=!0,this.setLaserRate=function(t,e){var n="CRDS_CMD/fblue?Rate="+e;t?(n="CRDS_CMD/fred?Rate="+e,this.fred=e):this.fblue=e,a.get(l.address()+n)},this.setEnable=function(t){this.eblue=t[0],this.ered=t[1];var e=this.ered?1:0,n=this.eblue?1:0,i="CRDS_CMD/LaserEnable?Red="+e+"&Blue="+n;a.get(l.address()+i)},this.setGain=function(t){this.kpmt=t,a.get(l.address()+"CRDS_CMD/Vpmt?V="+t.toString())},this.setLaserGain=function(t){this.kred=t[1],this.kblue=t[0],a.get(l.address()+"CRDS_CMD/LaserGain?B1=0&B0="+t[0]+"&R="+t[1])}}function a(t,e){var a=t,l=e;this.spk={vrange:5,voffset:0,f0:1350,df:100,pos:!0,auto:!1,period:360,length:30},this.las={vr:[5,5,5,5,5],voffset:[1,2,3,4,5],f0:[1351,1352,1353,1354,1355],modulation:[!1,!1,!1,!1,!1],enable:[!1,!1,!1,!1,!1]},this.las.setf0=function(t){this.f0=t,a.get(l.address()+"PAS_CMD/UpdateFr?f0="+t.join(","))},this.las.setVr=function(t){this.las.vr=t,this.http.get(this.net.address()+"PAS_CMD/UpdateVrange?Vrange="+t.join(","))},this.las.setVo=function(t){this.las.vr=vr,this.http.get(this.net.address()+"PAS_CMD/UpdateVoffset?Voffset="+t.join(","))},this.las.updateMod=function(t){this.moduldation=t;var e=[];for(i=0;i<t.length;i++)e.push(t?1:0)},this.las.updateEnable=function(t){this.enable=t},this.spk.updateCtl=function(t){var e=t.pos?1:0;a.get(l.address()+"PAS_CMD/SpkSw?SpkSw="+e),a.get(l.address()+"PAS_CMD/Spk?df="+this.df+"&f0="+this.f0),a.get(l.address()+"PAS_CMD/UpdateSpkVparams?Voffset="+this.voffset+"&Vrange="+this.vrange)},this.spk.updateCycle=function(t,e,n){this.auto=t,this.length=n,this.period=e;var i=t?1:0;a.get(l.address()+"PAS_CMD/UpdateSpkCycle?Length="+n+"&Period="+e+"&Cycle="+i)}}function l(t){for(var e in t)if(t.hasOwnProperty(e))return!1;return!0}angular.module("main").factory("cvt",["$http","net","$rootScope",function(n,i,s){var r={save:!0,ozone:!1,filter_pos:!0,first_call:1,fctl:[],power:{Pump:!1,O3Gen:!1,Denuder:!1,Laser:!1,TEC:!1},purge:{setSw:function(t){this.pos=t;var e=t?1:0;n.get(i.address()+"General/PurgeSwitch?val="+e)},pos:!0}};return r.humidifier=[new t(.75,1,0,90,!1,"Medium"),new t(.75,1,0,80,!1,"High")],r.pas=new a(n,i),r.crd=new e(n,i),r.filter={cycle:{period:360,length:20,auto:!1},position:!0,updateCycle:function(t){this.cycle=t;var e=this.cycle.auto?1:0;n.get(i.address()+"General/FilterCycle?Length="+this.cycle.length+"&Period="+this.cycle.period+"&auto="+e)},updatePos:function(t){this.position=t;var e=this.position?1:0;n.get(i.address()+"General/UpdateFilter?State="+e)}},r.checkCvt=function(){promise=n.get(i.address()+"General/cvt?force="+r.first_call).then(function(t){if(first_Call=0,!l(t.data)){var e=t.data.crd,a=t.data.pas;r.crd.fred=e.red.f,r.crd.fblue=e.blue.f,r.crd.dcred=e.red.dc,r.crd.dcblue=e.blue.dc,r.crd.kpmt=e.kpmt,r.pas.las.f0=a.las.f0,r.pas.las.vrange=a.las.vrange,r.pas.las.voffset=a.las.voffset,r.pas.las.enable=a.las.enabled,r.pas.spk.f0=a.spk.fcenter,r.pas.spk.df=a.spk.df,r.pas.spk.vrange=a.spk.vrange,r.pas.spk.voffset=a.spk.voffset,r.pas.spk.auto=a.spk.cycle,r.pas.spk.length=a.spk.length,r.pas.spk.period=a.spk.period,r.pas.spk.pos=a.spk.enabled,r.filter.cycle.period=t.data.filter.period,r.filter.cycle.length=t.data.filter.length,r.filter.cycle.auto=t.data.filter.auto,r.filter.position=t.data.general.filter_pos;for(var n=Number(t.data.general.power).toString(2);n.length<5;)n+="0";r.power.Pump="1"==n[4]?!0:!1,r.power.O3Gen="1"==n[3]?!0:!1,r.power.Denuder="1"==n[2]?!0:!1,r.power.Laser="1"==n[1]?!0:!1,r.power.TEC="1"==n[0]?!0:!1,s.$broadcast("cvtUpdated")}})},r.flows={},r.flows.updateSP=function(t,e){r.flows[t]=e,n.get(i.address()+"General/DevSP?SP="+e+"&DevID="+t)},r.updatePS=function(t){n.get(i.address()+"General/PowerSupply?val="+t)},r}])}(),function(){angular.module("main").config(["$routeProvider",function(t){t.when("/CRDS",{templateUrl:"crd/crds.html"}).when("/PAS",{templateUrl:"pas/pas.html"}).when("/O3",{templateUrl:"o3/ozone.html"}).when("/",{templateUrl:"main/main.html"}).when("/Flows",{templateUrl:"alicat/flows.html"}).when("/Temperature",{templateUrl:"views/temperature.html"}).when("/Humidifier",{templateUrl:"humidity/humidifier.html"}).when("/Common",{templateUrl:"views/common.html"}).when("/Config",{templateUrl:"config/config.html"}).when("/msg",{templateUrl:"msgs/msg.html"})}])}(),function(){angular.module("main").controller("MainCtlr",["Data","$scope","$interval","cvt",function(t,e,a,l){a(function(){t.getData(),l.checkCvt()},1e3)}])}(),function(){function t(t){var e=new Date(1904,0,1);return e.setSeconds(t),e}function e(){this.ID="",this.Q=0,this.Q0=0,this.P=0,this.T=0,this.Qsp=0}function a(){this.f0=[],this.IA=[],this.Q=[],this.p=[],this.abs=[],this.micf=[],this.mict=[],this.pd=[]}function l(){this.tau=[],this.tau0=[],this.taucorr=[],this.tau0corr=[],this.ext=[],this.extcorr=[],this.stdevtau=[],this.etau=[],this.max=[],this.avg_rd=[],this.fit_rd=[]}function n(t,e,a){var l=(e.time[0],[e.tObj]),n=[e.tObj],i=[e.tObj],s=[e.tObj],r=[e.tObjj];a&&(e.pas.cell.f0.shift(),e.pas.cell.IA.shift(),e.pas.cell.Q.shift(),e.pas.cell.p.shift(),e.pas.cell.abs.shift());for(var o in t.PAS.CellData)l.push(t.PAS.CellData[o].derived.f0),n.push(t.PAS.CellData[o].derived.IA),i.push(t.PAS.CellData[o].derived.Q),s.push(t.PAS.CellData[o].derived.noiseLim),r.push(t.PAS.CellData[o].derived.ext);e.pas.cell.f0.unshift(l),e.pas.cell.IA.unshift(n),e.pas.cell.Q.unshift(i),e.pas.cell.p.unshift(s),e.pas.cell.abs.unshift(r),e.pas.drive=t.PAS.Drive,e.pas.cell.micf=[],e.pas.cell.mict=[],e.pas.cell.pd=[];var c=[],u=[],d=[];for(k=0;k<t.PAS.CellData[0].MicFreq.Y.length;k++){for(u=[k],d=[k],c=[k],j=0;j<t.pas.CellData.length;j++)u.push(t.PAS.CellData[j].MicFreq.Y[j]),d.push(t.PAS.CellData[j].MicTime.Y[j]),c.push(t.PAS.CellData[o].PhotoDiode.Y[j]);e.pas.cell.micf.push(u),e.pas.cell.mict.push(d),e.pas.cell.pd.push(c)}return e}function s(t,e,a){var l=[e.tObj],n=[e.tObj],i=[e.tObj],s=[e.tObj],r=[e.tObj],o=[e.tObj],c=[e.tObj],u=[e.tObj],d=[e.tObj];a&&(e.crd.cell.tau.shift(),e.crd.cell.tau0.shift(),e.crd.cell.taucorr.shift(),e.crd.cell.tau0corr.shift(),e.crd.cell.ext.shift(),e.crd.cell.extcorr.shift(),e.crd.cell.stdevtau.shift(),e.crd.cell.etau.shift(),e.crd.cell.max.shift());for(var p in t.CellData)l.push(t.CellData[p].extParam.Tau),n.push(t.CellData[p].extParam.Tau0),r.push(t.CellData[p].extParam.Tau0cor),s.push(t.CellData[p].extParam.taucorr),o.push(t.CellData[p].extParam.ext),c.push(t.CellData[p].extParam.extCorr),i.push(t.CellData[p].extParam.stdevTau),u.push(t.CellData[p].extParam.eTau),d.push(t.CellData[p].extParam.max);for(e.crd.cell.avg_rd=[],k=0;k<t.CellData[0].Ringdowns[0].length;k++){var f=[k];for(j=0;j<t.CellData.length;j++)f.push(t.CellData[j].Ringdowns[0][k]);e.crd.cell.avg_rd.push(f)}return e.crd.cell.tau.unshift(l),e.crd.cell.tau0.unshift(n),e.crd.cell.tau0corr.unshift(r),e.crd.cell.taucorr.unshift(s),e.crd.cell.extcorr.unshift(c),e.crd.cell.ext.unshift(o),e.crd.cell.stdevtau.unshift(i),e.crd.cell.etau.unshift(u),e.crd.cell.max.push(d),e}angular.module("main").factory("Data",["$rootScope","$http","net","cvt",function(r,o,c,u){var d=["TestAlicat"],p=["pDryBlue"],f=["vDryRed","vDryBlue"],h={cTime:null,tObj:new Date,save:!0,o3cal:!1,Cabin:!1,time:[],msg:[],date:{}},m=300,v=!1;h.pas={},h.pas.cell=new a,h.pas.drive=!0,h.filter={state:!0,tremain:0},h.flowData=[new e],h.crd={},h.crd.cell=new l;var g=!1;return h.getData=function(){g||(g=!0,promise=o.get(c.address()+"General/Data").then(function(e){for(i=0;i<d.length;i++)d[i]in e.data&&(h[d[i]]=e.data[d[i]]);h.filter.state=e.data.Filter;var a=e.data.fcycle.tt-e.data.fcycle.te;for(h.filter.tremain=a>0?a:0,i=0;i<p.length;i++)p[i]in e.data&&(h[p[i]]=e.data[p[i]]);for(i=0;i<f.length;i++)f[i]in e.data&&(h[f[i]]=e.data[f[i]]);h.time.length-1>=m&&(h.time.pop(),v=!0),h.tObj=t(Number(e.data.Time));var l=h.tObj.getTime();h.time.unshift(l),h=n(e.data,h,v),h=s(e.data,h,v),h.Cabin=e.data.Cabin,h.msg=e.data.Msg,h.data=e.data,r.$broadcast("dataAvailable"),g=!1},function(t){r.$broadcast("dataNotAvailable")})["finally"](function(){g=!1}))},h}])}(),function(){function t(t,e){function a(){if(e.msg.length>0){var a="<span>";for(i=0;i<e.msg.length;i++)a=e.msg[i].search("ERROR")>0?'<span class="cui-msg-error">':(e.msg[i].search("WARNING")>0,'<span class="cui-msg-info">'),l.msgs+=a+e.msg[i]+"</span><br>";for(i=0;i<e.msg.length;i++)e.msg[i].search("ERROR")>0?l.numType[2]+=1:e.msg[i].search("WARNING")>0?l.numType[1]+=1:l.numType[0]+=1;t.$broadcast("msgAvailable")}}var l={numType:[0,0,0],msgs:"",clearMsgArray:function(){this.msgs=""},resetCount:function(){this.numType=[0,0,0]}};return t.$on("dataAvailable",a),l}angular.module("main").factory("ExMsgSvc",t),t.$inject=["$rootScope","Data"]}(),function(){function t(){return{restrict:"E",scope:{},templateUrl:"app/Messages/msg.html"}}angular.module("main").directive("exMsgDirective",t)}(),function(){angular.module("main").controller("ExMsgCtl",["$scope","ExMsgSvc",function(t,e){t.msgs=e.msgs,t.$on("msgAvailable",function(){t.msgs=e.msgs}),t.clrMsgs=function(){t.msgs="",e.clearMsgArray()}}])}(),function(){angular.module("main").controller("Sidebar",["$scope","$http","Data","net","cvt",function(t,e,a,l,n){t.save=1,t.filter=a.filter.state,t.time="Not connected",t.connected=!1,t.o3On=!1,t.cabin=!1,t.pumpBlocked=!1,t.impBlocked=!1,t.interlock=!1,t.time="Not Connected",t.connected=!1,t.$on("dataAvailable",function(){t.filter=a.filter.state,t.cabin=a.Cabin,t.connected=!0}),t.$on("cvtUpdated",function(){}),t.$on("dataNotAvailable",function(){t.connected=!1}),t.saveData=function(){t.save=!t.save;var a=t.save?1:0;e.get(l.address()+"General/Save?save="+a.toString())},t.setFilter=function(){t.filter=!t.filter;var a=t.filter?1:0;e.get(l.address()+"General/UpdateFilter?State="+a)},t.setCabin=function(){t.cabin=!t.cabin;var a=t.cabin?1:0;e.get(l.address()+"General/Cabin?Cabin="+a)},t.stop=function(){e.get(l.address()+"General/Stop")}}])}(),function(){function t(t,e){t.optPData={ylabel:"tau (us)",labels:["t","Cell 1","Cell 2","Cell 3","Cell 4","Cell 5"],legend:"always"},t.pDataCMOptions=[["tau",function(){t.optPData.ylabel="tau (us)",objectData="tau"}],["tau'",function(){t.optPData.ylabel="tau' (us)",objectData="taucorr"}],["stdev",function(){t.optPData.ylabel="std. tau (us)",objectData="stdevtau"}],["max",function(){t.optPData.ylabel="max",objectData="max"}]],t.pData=[[0,0/0,0/0,0/0,0/0,0/0]]}angular.module("main").controller("ExMainCtl",t),t.$inject=["$scope","Data"]}(),function(){angular.module("main").controller("mrAlicatConfigCtlr",["$scope",function(t){function e(t,e){this.address=t,this.id=e}t.entry=new e("A","default"),t.devices=[],t.addDevice=function(){t.devices.push(new e(t.entry.address,t.entry.id))},t.rmDevice=function(){}}])}(),function(){function t(t,e){function a(){this.Q=0,this.P=0,this.T=0,this.Q0=0,this.isController=!1,this.Qsp=0,this.label=""}function l(t,a,l){a?(s.push(u.data[t].P),r.push(u.data[t].T),o.push(u.data[t].Q),c.push(u.data[t].Q0)):(s=[e.tObj,u.data[t].P],r=[e.tObj,u.data[t].T],o=[e.tObj,u.data[t].Q],c=[e.tObj,u.data[t].Q0])}function n(){var n="";for(i=0;i<h.length;i++)h[i]in e.data&&(n=h[i],n in u.data||(u.data[n]=new a,0===u.IDs.length?u.IDs=[n]:u.IDs.push(n),e.data[n].Type.search("C")>=0&&(u.data[n].isController=!0,u.data[n].Qsp=e.data[n].Qsp)),u.data[n].P=e.data[n].P,u.data[n].T=e.data[n].T,u.data[n].Q=e.data[n].Q);h.forEach(l),p?(u.P.shift(),u.T.shift(),u.Q.shift(),u.Q0.shift()):f+=1,u.P.unshift(s),u.T.unshift(r),u.Q.unshift(o),u.Q0.unshift(c),p=f>=d?!0:!1,t.$broadcast("FlowDataAvailable")}var s,r,o,c,u={IDs:[],Q:[],P:[],T:[],Q0:[],data:{}},d=300,p=!1,f=0,h=["TestAlicat"];return t.$on("dataAvailable",n),u}angular.module("main").factory("ExFlowSvc",t),t.$inject=["$rootScope","Data"]}(),function(){angular.module("main").controller("ExFooterCtl",["$scope","ExMsgSvc","Data",function(t,e,a){t.filter=!0,t.time="Not connected",t.connected=!1,t.o3On=!1,t.cabin=!1,t.pumpBlocked=!1,t.impBlocked=!1,t.interlock=!1,t.num_codes=[0,0,0],t.time="Not Connected",t.$on("dataAvailable",function(){t.time=a.tObj.toLocaleTimeString("en-US",{hour12:!1}),t.filter=a.filter,t.cabin=a.Cabin,t.connected=!0}),t.$on("msgAvailable",function(){t.num_codes=e.numType}),t.$on("dataNotAvailable",function(){t.connected=!1})}])}(),function(){angular.module("main").controller("ExPowerCtl",["$scope","cvt",function(t,e){t.power=e.power,t.order=["Pump","O3Gen","Denuder","Laser","TEC"],e.first_call=1,t.toggle=function(a){t.power[a]=!t.power[a];for(var l=0,n=0,i=0;i<t.order.length;i++)t.power.hasOwnProperty(t.order[i])&&(n=t.power[t.order[i]]?1:0,l+=Math.pow(2,i)*n);e.updatePS(l)}}])}(),function(){angular.module("main").controller("mrConfigCtlr",["$scope","$http","Data","net","cvt",function(t,e,a,l,n){n.first_call=1,t.network={ip:l.ip,port:l.port},t.changeIP=function(){l.setIP(t.network.ip)},t.changePort=function(){l.setPort(t.network.port)},t.filter={pos:!0,auto:!0,len:30,per:360,updatePos:function(){this.pos=!this.pos,console.log("updating filter position")},updateAuto:function(){auto=!auto,console.log("update filter auto")}},t.file={folder:"exscalabar\\data",main:"u:\\",mirror:"v:\\",prefix:"ex_",ext:".txt",max:10,save:!0}}])}(),function(){angular.module("main").controller("ExFilterCtl",["$scope","net","$http","cvt","Data",function(t,e,a,l,n){l.first_call=1,t.filter={cycle:l.filter.cycle,position:l.filter.position,updateCycle:function(){l.filter.updateCycle(this.cycle)},updateAuto:function(){this.cycle.auto=!this.cycle.auto,this.updateCycle()},updatePos:function(){l.filter.updatePos(this.position)}},t.tremain=n.filter.tremain,t.state=n.filter.state,t.updateAuto=function(){t.cycle.auto=!t.cycle.auto,t.updateCycle()},t.$on("dataAvailable",function(){t.tremain=n.filter.tremain,t.state=n.filter.state}),t.$on("cvtUpdated",function(){t.filter.cycle=l.filter.cycle})}])}(),function(){function t(t){var e={tauData:[],rdFit:[],rdAvg:[]};for(i=1;i<t.cell.tau[0].length;i++)e.tauData.push([t.cell.tau[0][i],t.cell.tau0[0][i],t.cell.taucorr[0][i],t.cell.tau0corr[0][i],t.cell.ext[0][i]]);return e.rdAvg=t.cell.avg_rd,e}angular.module("main").controller("ExCrdCtl",["$scope","cvt","Data",function(e,a,l){a.firstcall=1;var n=function(t,e,a,l,n){this.rate=t,this.DC=e,this.k=a,this.en=l,this.id=n},i="tau";e.setRate=function(){var t=arguments[0],e=arguments[1];a.crd.setLaserRate(t,e)},e.setEn=function(){var t=arguments[0];e.laser_ctl[t].en=!e.laser_ctl[t].en,a.crd.setEnable([e.laser_ctl[0].en,e.laser_ctl[1].en])},e.laser_ctl=[new n(a.crd.fblue,a.crd.dcblue,a.crd.kblue,a.crd.eblue,"Blue Laser"),new n(a.crd.fred,a.crd.dcred,a.crd.kred,a.crd.ered,"Red Laser")],e.pmt=a.crd.kpmt,e.setGain=function(){a.crd.setGain(e.pmt)},e.setLaserGain=function(){a.crd.setLaserGain([e.laser_ctl[0].k,e.laser_ctl[1].k])},e.purge={pos:!1,flow:.16,setValve:function(){this.pos=!this.pos,a.purge.setSw(this.pos)},setFlow:function(){}},e.data=l.crd,e.setEnable=function(t){e.laser_ctl[t].en=!e.laser_ctl[t].en;var l=e.laser_ctl[t].en;switch(t){case 0:a.crd.eblue=l;break;case 1:a.crd.ered=l}},e.ringdownAvg=[[0,0/0,0/0,0/0,0/0,0/0]],e.pData=[[0,0/0,0/0,0/0,0/0,0/0]],e.options={title:"Ringdown Data",ylabel:"Ringdown Magnitude (au)",labels:["t","Cell 1","Cell 2","Cell 3","Cell 4","Cell 5"],legend:"always"},e.optPData={ylabel:"tau (us)",labels:["t","Cell 1","Cell 2","Cell 3","Cell 4","Cell 5"],legend:"always"},e.pDataCMOptions=[["tau",function(){e.optPData.ylabel="tau (us)",i="tau"}],["tau'",function(){e.optPData.ylabel="tau' (us)",i="taucorr"}],["stdev",function(){e.optPData.ylabel="std. tau (us)",i="stdevtau"}],["max",function(){e.optPData.ylabel="max",i="max"}]],e.$on("dataAvailable",function(){e.data=l.crd;var a=t(l.crd);e.ringdownAvg=a.rdAvg,e.pData=l.crd.cell[i]}),e.$on("cvtUpdated",function(){e.laser_ctl[0].rate=a.crd.fblue,e.laser_ctl[0].DC=a.crd.dcblue,e.laser_ctl[0].k=a.crd.kblue,e.laser_ctl[0].enabled=a.crd.eblue,e.laser_ctl[1].rate=a.crd.fred,e.laser_ctl[1].DC=a.crd.dcred,e.laser_ctl[1].k=a.crd.kred,e.laser_ctl[1].enabled=a.crd.ered,e.pmt=a.crd.kpmt})}])}(),function(){angular.module("main").controller("pas",["$scope","net","$http","cvt","Data","$log",function(t,e,a,l,n,i){t.data=n.pas;var s=0;l.first_call=1,t.pData=[[0,0/0,0/0,0/0,0/0,0/0]],t.options={title:"PAS Data",ylabel:"IA",labels:["t","Cell 1","Cell 2","Cell 3","Cell 4","Cell 5"],legend:"always"},t.pDataCMOptions=[["IA",function(){t.options.ylabel="IA",s=0}],["f0",function(){t.options.ylabel="f0 (Hz)",s=1}],["Q",function(){t.options.ylabel="Q",s=2}]],t.$on("dataAvailable",function(){switch(t.data=n.pas,s){case 0:t.pData=t.data.cell.IA;break;case 1:t.pData=t.data.cell.f0;break;case 2:t.pData=t.data.cell.Q;break;case 3:t.pData=t.data.cell.p;break;case 4:t.pData=t.data.cell.abs}})}])}(),function(){angular.module("main").controller("pasSpk",["$scope","cvt","Data",function(t,e,a){var l=10,n=5;t.speaker=e.pas.spk;var i={high:3e3,low:500};t.$on("cvtUpdated",function(){t.speaker=e.pas.spk}),t.setPos=function(){t.speaker.pos=!t.speaker.pos,e.pas.spk.updateCtl(t.speaker)},t.updateSpkV=function(){t.speaker.vrange>l?t.speaker.vrange=l:t.speaker.vrange<0&&(t.speaker.vrange=0),t.speaker.voffset>n?t.speaker.voffset=n:t.speaker.voffset<0&&(t.speaker.voffset=0),e.pas.spk.updateCtl(t.speaker)},t.updateSpkF=function(){t.speaker.f0>i.high?t.speaker.f0=i.high:t.speaker.f0<i.low&&(t.speaker.f0=i.low),e.pas.spk.updateCtl(t.speaker)},t.updateCycle=function(){e.pas.spk.updateCycle(t.speaker.auto,t.speaker.period,t.speaker.length)},t.updateAuto=function(){t.speaker.auto=!t.speaker.auto,t.updateCycle()}}])}(),function(){function t(t,e,a,l,n){this.Vrange=t,this.Voffset=e,this.f0=a,this.modulation=l,this.lasEn=!1}angular.module("main").controller("pasLas",["$scope","cvt","Data",function(e,a,l){for(e.lasCtl=[],i=0;i<a.pas.las.vr.length;i++)e.lasCtl.push(new t(a.pas.las.vr[i],a.pas.las.voffset[i],a.pas.las.f0[i],a.pas.las.modulation[i],a.pas.las.enable[i]));e.$on("dataAvailable",function(){if(l.pas.drive)for(i=0;i<l.pas.cell.length;i++)e.lasCtl[i].f0=e.data.cell[i].f0[0].y}),e.$on("cvtUpdated",function(){for(i=0;i<a.pas.las.vr.length;i++)e.lasCtl[i].vr=a.pas.las.vr[i],e.lasCtl[i].vo=a.pas.las.voffset[i],e.lasCtl[i].f0=a.pas.las.f0[i],e.lasCtl[i].mod=a.pas.las.modulation[i],e.lasCtl[i].en=a.pas.las.enable[i]}),e.updateMod=function(t){e.lasCtl[t].modulation=!e.lasCtl[t].modulation;var l=[];for(j=0;j<e.lasCtl.length;j++)l.push(e.lasCtl[j].modulation);a.pas.las.updateMod(l)},e.updateVr=function(){var t=[];for(i=0;i<e.lasCtl.length;i++)t.push(e.lasCtl[i].Vrange);a.pas.las.setVr(t)},e.updateVo=function(){var t=[];for(i=0;i<e.lasCtl.length;i++)t.push(e.lasCtl[i].Voffset);a.pas.las.setVo(t)},e.updatef0=function(){var t=[];for(i=0;i<e.lasCtl.length;i++)t.push(e.lasCtl[i].f0);a.pas.las.setf0(t)},e.updateEnable=function(t){e.lasCtl[t].lasEn=!e.lasCtl[t].lasEn;var l=[];for(t=0;t<e.lasCtl.length;t++)l.push(e.lasCtl[t].lasEn);a.pas.las.updateEnable(l)}}])}(),function(){angular.module("main").controller("ExFlowCtl",["$scope","Data","cvt","ExFlowSvc",function(t,e,a,l){function n(){this.P=0,this.T=0,this.Q=0,this.Q0=0,this.Q=0}function i(e,a,l,i,r){this.label=e,this.ID=a,this.type=l,this.isController=i,this.data=new n,this.sp=r,this.index=-1,i&&(t.setpoints.push(r),s+=1,this.index=s)}var s=-1;a.first_call=1,t.setpoints=[],t.Devices=[new i("Dry Red","TestAlicat","mflow",!0,0),new i("Dry Blue","dryBlue","mflow",!1,0),new i("Denuded Blue","deBlue","mflow",!1,0),new i("Denuded Red","deRed","mflow",!0,0),new i("PAS Green","pGreen","mflow",!1,0),new i("CRD High Humidified","crdHighHum","mflow",!1,0),new i("CRD Low Humidified","crdLowHum","mflow",!1,0),new i("Mirror Purge Flow","crdMirror","mflow",!1,0),new i("Pressure Controller","pCtl","pressure",!1,0),new i("O3 Bypass","o3Bypass","mflow",!0,0)],t.updateSP=function(){var t=arguments[0];a.flows.updateSP(t.ID,t.sp)},t.$on("dataAvailable",function(){for(j=0;j<t.Devices.length;j++)t.Devices[j].ID in e&&(t.Devices[j].P=e[t.Devices[j].ID].P,t.Devices[j].T=e[t.Devices[j].ID].T,t.Devices[j].Q=e[t.Devices[j].ID].Q,t.Devices[j].Q0=e[t.Devices[j].ID].Q0,t.Devices[j].Qsp=e[t.Devices[j].ID].Qsp)})}])}(),function(){function t(){var t=function(t,e){function a(){l.data=e[n]}var l=this,n="P";l.cm=[["P",function(){n="P",console.log("Select P."),l.options.ylabel="P (mb)"}],["T",function(){n="T",console.log("Select T."),l.options.ylabel="T (degC)"}],["Q",function(){n="Q",console.log("Select Q."),l.options.ylabel="Q (lpm)"}],["Q0",function(){n="Q0",console.log("Select Q0."),l.options.ylabel="T (degC)",l.options.ylabel="Q0 (slpm)"}]],l.options={ylabel:"Q (lpm)",labels:["t","Alicat0"],legend:"always"},l.data=[[0,0/0]],t.$on("FlowDataAvailable",a),console.log("Load controller for flow plot director.")};return t.$inject=["$rootScope","ExFlowSvc"],{restrict:"E",scope:{},controller:t,controllerAs:"vm",bindToController:!0,template:'<dy-graph options="vm.options" data="vm.data" context-menu="vm.cm"></dy-graph>'}}angular.module("main").directive("exFlowplot",t)}(),function(){angular.module("main").controller("ExHumidityCtl",["$scope","cvt","Data",function(t,e,a){e.first_call=1,t.h=e.humidifier,t.setEnable=function(e){t.h[e].en=!t.h[e].en,t.updateHum(e)},t.updateHum=function(){var a=arguments[0];e.humidifier[a].updateParams(t.h)},t.ctlrOutData=[[0,0/0,0/0]],t.RH=[[0,0/0,0/0]],t.optCtlOut={ylabel:"Controller Output",labels:["t","med","high"],legend:"always"},t.optRH={ylabel:"RH (%)",labels:["t","med","high"],legend:"always"}}])}(),function(){angular.module("main").controller("startCal",["$scope","$http","net","cvt",function(t,e,a,l){t.cal=l.ozone,t.startCalibration=function(){t.cal=!t.cal;var n=t.cal?1:0;l.ozone=t.cal,e.get(a.address()+"General/ozone?start="+n.toString())}}])}(),function(){angular.module("main").controller("O3Table",["$scope","tableService",function(t,e){t.table_vals=[{id:"Wait",step:"Wait",descr:"Set a wait time in the ozone cal in seconds"},{id:"Filter",step:"Filter",descr:"Boolean that sets the filter state."},{id:"Speaker",step:"Speaker",descr:"Boolean that sets the speaker state."},{id:"O2-Valve",step:"O2 Valve",descr:"Boolean that sets the O2 valve position."},{id:"O3-Valve",step:"O3 Valve",descr:"Boolean that sets the O3 valve state."},{id:"O3-Generator",step:"O3 Generator",descr:"Boolean that sets the O3 generator state."},{id:"QO2",step:"QO2",descr:"Numeric to set the oxygen flow rate"}],t.clickRow=function(t){e.setTab(t.id.toString())}}])}(),function(){angular.module("main").factory("tableService",["$rootScope",function(t){var e={curTab:"",getTab:function(){return this.curTab},setTab:function(e){this.curTab=e,t.$broadcast("handleBroadcast")}};return e}])}(),function(){angular.module("main").factory("SaveData",function(){var t={data:[],setData:function(t){this.data=t},getData:function(){return this.data}};return t})}(),function(){angular.module("main").controller("Save",["$scope","SaveData","$http","net",function(t,e,a,l){t.cal_file="default",t.save=function(){var n='<?xml version="1.0" encoding="utf-8"?>\r\n<OZONE>\r\n';e.getData().forEach(function(t){n+="	<"+t.id+">"+t.val+"</"+t.id+">\r\n"}),n+="</OZONE>",a({method:"POST",url:l.address()+"Calibration/saveCalFile?file_name="+t.cal_file+".xml",data:n,headers:{"Content-Type":"application/x-www-form-urlencoded"}})}}])}(),function(){angular.module("main").controller("InputTable",["$scope","tableService","SaveData",function(t,e,a){t.data=[],t.$on("handleBroadcast",function(){var l=e.getTab(),n="";switch(l){case"O3-Valve":case"O2-Valve":case"O3-Generator":case"Filter":n="FALSE";break;case"Wait":case"Speaker":n="20";break;case"QO2":n="100"}t.data.push({id:l,val:n}),a.setData(t.data)})}])}(),function(){function t(){return{restrict:"E",scope:{},templateUrl:"sidebar/side.html"}}angular.module("main").directive("sidebar",t)}(),function(){angular.module("main").factory("navservice",["$http","net","cvt",function(t,e,a){var l={};return l.stop=function(){t.get(e.address()+"General/Stop")},l.save=function(a){var l=a?1:0;t.get(e.address()+"General/Save?save="+l.toString())},l}])}(),function(){function t(){return{restrict:"E",scope:{},templateUrl:"nav/navi.html"}}angular.module("main").directive("navi",t)}(),function(){angular.module("main").controller("navctlr",["$scope","navservice",function(t,e){t.save=!0,t.updateSave=function(){t.save=!t.save,e.save(t.save)},t.stop=function(){e.stop()}}])}();