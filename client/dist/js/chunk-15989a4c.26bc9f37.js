(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-15989a4c"],{"1ae3":function(t,e,a){"use strict";a("9c66")},2105:function(t,e,a){},8684:function(t,e){t.exports=function(t){t.options.__i18n=t.options.__i18n||[],t.options.__i18n.push('{"zh-CN":{"Script Market":"脚本市场","Install":"安装","Script Package Detail":"脚本包详情","Description":"描述","Requirements":"依赖","Are you sure you want to install the Script?":"是否确认安装此脚本？","Script installed, new Script is in effect immediately":"脚本已安装，新脚本立即生效","The following Script Set IDs already exists, do you want to overwrite?":"下列脚本集ID已经存在，是否覆盖？","Installed Script Set requires 3rd party packages, do you want to open PIP tool now?":"安装的脚本集需要第三方包，是否现在前往PIP工具"}}'),delete t.options._Ctor}},"8cfd":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("transition",{attrs:{name:"fade"}},[t.$store.state.isLoaded?a("el-container",{attrs:{direction:"vertical"}},[a("el-header",{attrs:{height:"60px"}},[a("h1",[t._v(t._s(t.$t("Script Market")))])]),t._v(" "),a("el-main",t._l(t.packageList,(function(e){return a("a",{key:e.package,staticClass:"package-card-wrap",on:{click:function(a){return t.openDetail(e)}}},[a("el-card",{staticClass:"package-card",attrs:{shadow:"hover"}},[a("i",{staticClass:"fa fa-fw fa-file-code-o package-icon"}),t._v(" "),a("span",{staticClass:"package-name"},[t._v(t._s(e.name))]),t._v(" "),a("code",{staticClass:"package-id"},[t._v("ID: "+t._s(e.package))]),t._v(" "),a("div",{staticClass:"package-release-time"},[a("span",[t._v(t._s(t._f("datetime")(e.releaseTime)))]),t._v(" "),a("br"),t._v(" "),a("span",{staticClass:"text-info"},[t._v(t._s(t._f("fromNow")(e.releaseTime)))])])])],1)})),0),t._v(" "),a("el-dialog",{staticClass:"package-detail",attrs:{title:t.$t("Script Package Detail"),visible:t.showDetail},on:{"update:visible":function(e){t.showDetail=e}}},[a("el-form",{attrs:{"label-width":"100px"}},[a("el-form-item",{attrs:{label:t.$t("Name")}},[a("el-input",{attrs:{readonly:"",value:t.detail.name}})],1),t._v(" "),a("el-form-item",{attrs:{label:"ID"}},[a("el-input",{attrs:{readonly:"",value:t.detail.package}})],1),t._v(" "),t.T.isNothing(t.detail.description)?t._e():a("el-form-item",{attrs:{label:t.$t("Description")}},[a("el-input",{attrs:{readonly:"",type:"textarea",resize:"none",autosize:!0,value:t.detail.description}})],1),t._v(" "),t.T.isNothing(t.detail.requirements)?t._e():a("el-form-item",{attrs:{label:t.$t("Requirements")}},[a("el-input",{attrs:{readonly:"",type:"textarea",resize:"none",autosize:!0,value:t.detail.requirements}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:function(e){t.showDetail=!1}}},[t._v(t._s(t.$t("Cancel")))]),t._v(" "),a("el-button",{attrs:{size:"small",type:"primary",loading:t.isInstalling},on:{click:function(e){return t.installPackage(t.detail)}}},[t._v(t._s(t.$t("Install")))])],1)],1)],1):t._e()],1)},r=[],i=a("a6db"),s=(a("bd06"),a("fbe6"),a("672e"),{name:"ScriptMarket",components:{},watch:{$route:{immediate:!0,handler:function(t,e){var a=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,a.loadData();case 2:case"end":return t.stop()}}),t)})))()}}},methods:{loadData:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var a,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=null,t.T.isNothing(null),e.next=4,t.T.callAPI_get("/api/v1/script-packages/index",{query:a});case 4:if(n=e.sent,n.ok){e.next=7;break}return e.abrupt("return");case 7:t.packageList=n.data,t.$store.commit("updateLoadStatus",!0);case 9:case"end":return e.stop()}}),e)})))()},openDetail:function(t){this.detail=t,this.showDetail=!0},installPackage:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var n,r,i,s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n=t.scriptSets.reduce((function(t,e){return t.push(e.id),t}),[]),a.next=3,e.T.callAPI_getAll("/api/v1/script-sets/do/list",{query:{id:n.join(","),fields:["id"]}});case 3:if(r=a.sent,r.ok){a.next=6;break}return a.abrupt("return");case 6:if(i=[],e.T.isNothing(r.data)||(i=r.data.reduce((function(t,e){return t.push(e.id),t}),[])),!(i.length>0)){a.next=16;break}return a.next=12,e.T.confirm("".concat(e.$t("The following Script Set IDs already exists, do you want to overwrite?"),"<br>").concat(i.join("<br>")));case 12:if(a.sent){a.next=14;break}return a.abrupt("return");case 14:a.next=20;break;case 16:return a.next=18,e.T.confirm(e.$t("Are you sure you want to install the Script?"));case 18:if(a.sent){a.next=20;break}return a.abrupt("return");case 20:return e.isInstalling=!0,a.next=23,e.T.callAPI("post","/api/v1/script-sets/do/import",{body:{packageInstallURL:t.downloadURL,packageInstallId:t.package},alert:{okMessage:e.$t("Script installed, new Script is in effect immediately")}});case 23:if(r=a.sent,e.isInstalling=!1,r.ok){a.next=27;break}return a.abrupt("return",e.alertOnError(r));case 27:if(e.showDetail=!1,!e.T.isNothing(r.data.pkgs)){a.next=31;break}a.next=36;break;case 31:return a.next=33,e.T.confirm(e.$t("Installed Script Set requires 3rd party packages, do you want to open PIP tool now?"));case 33:if(!a.sent){a.next=36;break}s=r.data.pkgs.join(" "),e.$router.push({name:"pip-tool",query:{pkgs:e.T.getBase64(s)}});case 36:case"end":return a.stop()}}),a)})))()}},computed:{},props:{},data:function(){return{detail:{},packageList:[],showDetail:!1,isInstalling:!1}}}),o=s,c=(a("1ae3"),a("fd1c"),a("0620")),l=a("f487"),u=Object(c["a"])(o,n,r,!1,null,"5825e0c8",null);"function"===typeof l["default"]&&Object(l["default"])(u);e["default"]=u.exports},"9c66":function(t,e,a){},f487:function(t,e,a){"use strict";var n=a("8684"),r=a.n(n);e["default"]=r.a},fd1c:function(t,e,a){"use strict";a("2105")}}]);