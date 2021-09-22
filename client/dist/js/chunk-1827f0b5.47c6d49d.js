(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1827f0b5"],{1578:function(t,e,n){"use strict";var o=n("6198"),s=n.n(o);e["default"]=s.a},"2af4":function(t,e,n){},"4d09":function(t,e,n){"use strict";var o=n("c54a"),s=n.n(o);e["default"]=s.a},6198:function(t,e){t.exports=function(t){t.options.__i18n=t.options.__i18n||[],t.options.__i18n.push('{"en":{"overviewCountUnit":"","workerCount":"{n} worker | {n} workers","taskCount":"{n} task | {n} tasks","scriptOverviewCount":"({n} script) | ({n} scripts)","recentOperationCount":"(latest {n} operation) | (latest {n} operations)"}}'),delete t.options._Ctor}},"7a6f":function(t,e,n){},"7b0b":function(t,e,n){"use strict";var o=n("8679"),s=n.n(o);e["default"]=s.a},8157:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"fade"}},[t.$store.state.isLoaded?n("el-container",{attrs:{direction:"vertical"}},[n("el-header",{attrs:{height:"60px"}},[n("h1",[t._v(t._s(t.$t("Overview")))])]),t._v(" "),n("el-main",[n("el-divider",{attrs:{"content-position":"left"}},[n("h1",[t._v(t._s(t.$t("Data Count")))])]),t._v(" "),t._l(t.bizEntityCount,(function(e){return n("el-card",{key:e.name,staticClass:"overview-card",attrs:{shadow:"hover"}},[t.C.OVERVIEW_ENTITY_MAP.get(e.name).icon?n("i",{staticClass:"fa fa-fw overview-icon",class:t.C.OVERVIEW_ENTITY_MAP.get(e.name).icon}):t.C.OVERVIEW_ENTITY_MAP.get(e.name).tagText?n("i",{staticClass:"overview-icon overview-icon-text",attrs:{type:"info"}},[n("code",[t._v(t._s(t.C.OVERVIEW_ENTITY_MAP.get(e.name).tagText))])]):t._e(),t._v(" "),n("span",{staticClass:"overview-name"},[t._v(t._s(t.C.OVERVIEW_ENTITY_MAP.get(e.name).name))]),t._v(" "),n("span",{staticClass:"overview-count",style:{"font-size":t.overviewCountFontSize(e.count)+"px"}},[t._v("\n          "+t._s(e.count)+"\n          "),n("span",{staticClass:"overview-count-unit"},[t._v(t._s(t.$t("overviewCountUnit")))])])])})),t._v(" "),n("el-divider",{attrs:{"content-position":"left"}},[n("h1",[t._v(t._s(t.$t("Worker Queue Info")))])]),t._v(" "),t._l(t.workerQueueInfo,(function(e,o){return n("el-card",{key:o,staticClass:"worker-queue-card",attrs:{shadow:"hover"}},[n("el-progress",{attrs:{type:"dashboard",width:"100",percentage:t.workerQueuePressurePercentage(e.pressure,e.maxPressure),format:t.workerQueuePressureFormat,color:t.WORKER_QUEUE_PRESSURE_COLORS}}),t._v(" "),n("span",{staticClass:"worker-queue-info"},[n("span",{staticClass:"worker-queue-number"},[t._v("#"+t._s(o))]),t._v(" "+t._s(t.$t("Queue"))+"\n          "),n("br"),t._v(t._s(t.$tc("workerCount",e.workerCount||0))+"\n          "),n("br"),t._v(t._s(t.$tc("taskCount",t.T.numberPlus(e.taskCount)))+"\n        ")])],1)})),t._v(" "),n("el-divider",{staticClass:"overview-divider",attrs:{"content-position":"left"}},[n("h1",[t._v(t._s(t.$t("Script overview"))+" "+t._s(t.$tc("scriptOverviewCount",t.scriptOverview.length)))])]),t._v(" "),n("el-table",{attrs:{data:t.scriptOverview,stripe:""}},[n("el-table-column",{attrs:{label:t.$t("Script Set"),sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.scriptSetTitle||e.row.scriptSetId))])]}}],null,!1,924199659)}),t._v(" "),n("el-table-column",{attrs:{label:t.$t("Script"),sortable:"","sort-by":["title","id"]},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.title||e.row.id))])]}}],null,!1,3036302123)}),t._v(" "),n("el-table-column",{attrs:{label:t.$t("Func"),sortable:"","sort-by":"funcCount",align:"right",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.funcCount?n("code",[t._v(t._s(e.row.funcCount))]):n("code",[t._v("-")])]}}],null,!1,307296925)}),t._v(" "),n("el-table-column",{attrs:{label:t.$t("Code size"),sortable:"","sort-by":"codeSize",align:"right",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.codeSize?n("code",[t._v(t._s(e.row.codeSizeHuman))]):t._e()]}}],null,!1,2168609287)}),t._v(" "),n("el-table-column",{attrs:{label:t.$t("Publish ver."),sortable:"","sort-by":"publishVersion",align:"right",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.publishVersion?n("code",[t._v("v"+t._s(""+e.row.publishVersion))]):n("code",[t._v("-")])]}}],null,!1,4192420482)}),t._v(" "),n("el-table-column",{attrs:{label:t.$t("Publish time"),sortable:"","sort-by":"latestPublishTimestamp",align:"right",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.latestPublishTime?[n("span",[t._v(t._s(t._f("datetime")(e.row.latestPublishTime)))]),t._v(" "),n("br"),t._v(" "),n("span",{staticClass:"text-info"},[t._v(t._s(t._f("fromNow")(e.row.latestPublishTime)))])]:[0===e.row.publishVersion?n("span",{staticClass:"text-info"},[t._v(t._s(t.$t("Never published")))]):n("span",{staticClass:"text-info"},[t._v(t._s(t.$t("System builtin")))])]]}}],null,!1,639056162)})],1),t._v(" "),n("el-divider",{staticClass:"overview-divider",attrs:{"content-position":"left"}},[n("h1",[t._v(t._s(t.$t("Recent operations"))+" "+t._s(t.$tc("recentOperationCount",t.latestOperations.length)))])]),t._v(" "),n("el-table",{attrs:{data:t.latestOperations,stripe:""}},[n("el-table-column",{attrs:{label:t.$t("Time"),width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(t._f("datetime")(e.row.createTime)))]),t._v(" "),n("br"),t._v(" "),n("span",{staticClass:"text-info"},[t._v(t._s(t._f("fromNow")(e.row.createTime)))])]}}],null,!1,273918412)}),t._v(" "),n("el-table-column",{attrs:{label:t.$t("Client")},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",{staticClass:"text-info"},[t._v(t._s(t.$t("Client ID"))+t._s(t.$t(":")))]),t._v(" "),n("code",{staticClass:"text-code text-small"},[t._v(t._s(e.row.clientId))]),n("CopyButton",{attrs:{content:e.row.clientId}}),t._v(" "),t.T.isNothing(e.row.clientIPsJSON)?t._e():[n("br"),t._v(" "),n("span",{staticClass:"text-info"},[t._v(t._s(t.$t("IP Address"))+t._s(t.$t(":")))]),t._v(" "),n("code",{staticClass:"text-code text-small"},[t._v(t._s(e.row.clientIPsJSON.join(", ")))]),n("CopyButton",{attrs:{content:e.row.clientIPsJSON.join(", ")}})]]}}],null,!1,2897190753)}),t._v(" "),n("el-table-column",{attrs:{label:t.$t("User")},scopedSlots:t._u([{key:"default",fn:function(e){return[n("strong",[t._v(t._s(e.row.username))]),t._v(" "),e.row.userId?[n("br"),t._v(" "),n("span",{staticClass:"text-info"},[t._v(t._s(t.$t("User ID"))+t._s(t.$t(":")))]),t._v(" "),n("code",{staticClass:"text-code text-small"},[t._v(t._s(e.row.userId))]),n("CopyButton",{attrs:{content:e.row.userId}})]:t._e()]}}],null,!1,3293282501)}),t._v(" "),n("el-table-column",{attrs:{label:t.$t("Operation")},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.respStatusCode>=200&&e.row.respStatusCode<400?n("span",{staticClass:"text-good"},[n("i",{staticClass:"fa fa-fw fa-check-circle"})]):n("span",{staticClass:"text-bad"},[n("i",{staticClass:"fa fa-fw fa-times-circle"})]),t._v(" "),n("span",[t._v(t._s(e.row._operationDescribe))]),t._v(" "),e.row._operationEntityId?[n("br"),t._v(" "),n("span",{staticClass:"text-info"},[t._v(t._s(t.$t("Data ID"))+t._s(t.$t(":")))]),t._v(" "),n("code",{staticClass:"text-code text-small"},[t._v(t._s(e.row._operationEntityId))]),n("CopyButton",{attrs:{content:e.row._operationEntityId}})]:t._e()]}}],null,!1,3045676411)}),t._v(" "),n("el-table-column",{attrs:{width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.T.endsWith(e.row.reqRoute,"/do/modify")?n("strong",{staticClass:"text-watch"},[n("i",{staticClass:"fa fa-fw fa-exclamation-triangle"}),t._v("\n              "+t._s(t.$t("MODIFY"))+"\n            ")]):t._e(),t._v(" "),t.T.endsWith(e.row.reqRoute,"/do/delete")?n("strong",{staticClass:"text-bad"},[n("i",{staticClass:"fa fa-fw fa-exclamation-circle"}),t._v("\n              "+t._s(t.$t("DELETE"))+"\n            ")]):t._e()]}}],null,!1,2782373890)}),t._v(" "),n("el-table-column",{attrs:{label:t.$t("Cost"),align:"right",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n            "+t._s(e.row.reqCost)+" "),n("span",{staticClass:"text-info"},[t._v(t._s(t.$t("ms")))])]}}],null,!1,409322375)}),t._v(" "),n("el-table-column",{attrs:{align:"right",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"text"},on:{click:function(n){return t.showDetail(e.row)}}},[t._v(t._s(t.$t("Show detail")))])]}}],null,!1,3868636333)})],1)],2),t._v(" "),n("LongTextDialog",{ref:"longTextDialog",attrs:{title:t.$t("The full content is as follows"),showDownload:!0}})],1):t._e()],1)},s=[],r=n("a6db"),a=(n("bd06"),n("e756"),n("fbe6"),n("e5ac"),n("672e"),n("b76c")),i={name:"Overview",components:{LongTextDialog:a["a"]},watch:{$route:{immediate:!0,handler:function(t,e){var n=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,n.loadData();case 2:case"end":return t.stop()}}),t)})))()}}},methods:{loadData:function(t,e){var n=this;return Object(r["a"])(regeneratorRuntime.mark((function o(){var s,r;return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return e=e||{},s=null,n.T.isNothing(t)||(s={sections:t.join(",")}),o.next=5,n.T.callAPI_get("/api/v1/func/overview",{query:s,alert:{muteError:e.mute}});case 5:if(r=o.sent,r.ok){o.next=8;break}return o.abrupt("return");case 8:r.data.scriptOverview&&r.data.scriptOverview.forEach((function(t){t.latestPublishTimestamp=0,t.latestPublishTime&&(t.latestPublishTimestamp=new Date(t.latestPublishTime).getTime())})),(t||n.OVERVIEW_SECTIONS).forEach((function(t){n[t]=r.data[t]})),n.scriptOverview.forEach((function(t){t.codeSize&&(t.codeSizeHuman=n.T.byteSizeHuman(t.codeSize))})),n.$store.commit("updateLoadStatus",!0);case 12:case"end":return o.stop()}}),o)})))()},showDetail:function(t){this.$store.commit("updateHighlightedTableDataId",t.id);var e=[];e.push("===== ".concat(this.$t("Request")," =====")),e.push("".concat(t.reqMethod.toUpperCase()," ").concat(this.T.formatURL(t.reqRoute,{params:t.reqParamsJSON,query:t.reqQueryJSON}))),t.reqBodyJSON&&e.push(JSON.stringify(t.reqBodyJSON,null,2)),e.push("\n===== ".concat(this.$t("Response")," =====")),e.push("Status Code: ".concat(t.respStatusCode)),t.respBodyJSON&&e.push(JSON.stringify(t.respBodyJSON,null,2));var n=e.join("\n"),o=this.M(t.createTime).utcOffset(8).format("YYYYMMDD_HHmmss"),s="http-dump.".concat(o);this.$refs.longTextDialog.update(n,s)},overviewCountFontSize:function(t){var e=(""+t).length;return Math.min(80-15*(e-4),80)},workerQueuePressurePercentage:function(t,e){var n=100*t/(2*e);return n<0?n=0:n>100&&(n=100),n},workerQueuePressureFormat:function(t){return"".concat(this.$t("Pressure")).concat(this.$t(":")," ").concat(parseInt(2*t))}},computed:{OVERVIEW_SECTIONS:function(){return["bizEntityCount","workerQueueInfo","scriptOverview","latestOperations"]},WORKER_QUEUE_PRESSURE_COLORS:function(){return[{color:"#00aa00",percentage:50},{color:"#ff6600",percentage:80},{color:"#ff0000",percentage:100}]}},props:{},data:function(){return{bizEntityCount:[],workerQueueInfo:[],scriptOverview:[],latestOperations:[],overviewInterval:null}},mounted:function(){var t=this;this.overviewInterval||(this.overviewInterval=setInterval((function(){"overview"!==t.$route.name&&(clearInterval(t.overviewInterval),t.overviewInterval=null),t.loadData(["workerQueueInfo"],{mute:!0})}),3e4))}},l=i,u=(n("e35f"),n("0620")),c=n("1578"),_=n("4d09"),d=Object(u["a"])(l,o,s,!1,null,"476ca2bc",null);"function"===typeof c["default"]&&Object(c["default"])(d),"function"===typeof _["default"]&&Object(_["default"])(d);e["default"]=d.exports},8679:function(t,e){t.exports=function(t){t.options.__i18n=t.options.__i18n||[],t.options.__i18n.push('{"zh-CN":{"Download as text file":"作为文本文件下载"}}'),delete t.options._Ctor}},a7e8:function(t,e,n){"use strict";n("7a6f")},b76c:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-dialog",{attrs:{id:"LongTextDialog",visible:t.show,width:"70%"},on:{"update:visible":function(e){t.show=e}}},[n("template",{slot:"title"},[t.showDownload&&t.fileName&&t.content?n("el-link",{attrs:{type:"primary"},on:{click:t.download}},[t._v("\n      "+t._s(t.$t("Download as text file"))+"\n      "),n("i",{staticClass:"fa fa-fw fa-download"})]):t._e()],1),t._v(" "),n("div",[n("p",[t._v(t._s(t.title))]),t._v(" "),n("textarea",{attrs:{id:"longTextDialogContent"}})])],2)},s=[],r=(n("8d65"),n("cc27")),a=n.n(r),i={name:"LongTextDialog",components:{},watch:{},methods:{update:function(t,e){var n=this;this.codeMirror&&this.codeMirror.setValue(""),this.content=t,this.fileName=(e||"dump")+".txt",this.show=!0,setImmediate((function(){n.codeMirror||(n.codeMirror=n.T.initCodeMirror("longTextDialogContent"),n.codeMirror.setOption("theme",n.T.getCodeMirrorThemeName()),n.T.setCodeMirrorReadOnly(n.codeMirror,!0)),n.codeMirror.setValue(n.content||""),n.T.setCodeMirrorMode(n.codeMirror,n.mode||null),n.codeMirror.refresh()}))},download:function(){var t=new Blob([this.content],{type:"text/plain"}),e=this.fileName;a.a.saveAs(t,e)}},computed:{},props:{title:String,mode:Boolean,showDownload:Boolean},data:function(){return{show:!1,fileName:null,content:null,codeMirror:null}}},l=i,u=(n("a7e8"),n("0620")),c=n("7b0b"),_=Object(u["a"])(l,o,s,!1,null,"c79a0cc4",null);"function"===typeof c["default"]&&Object(c["default"])(_);e["a"]=_.exports},c54a:function(t,e){t.exports=function(t){t.options.__i18n=t.options.__i18n||[],t.options.__i18n.push('{"zh-CN":{"Overview":"总览","Data Count":"数据计数","Worker Queue Info":"队列信息","Queue":"队列","overviewCountUnit":"个","workerCount":"工作单元 {n} 个","taskCount":"请求排队 {n} 个","Script overview":"脚本总览","scriptOverviewCount":"{n} 个","Code size":"代码大小","Publish ver.":"发布版本","Publish time":"发布时间","Never published":"从未发布","System builtin":"系统内置","Recent operations":"最近操作记录","recentOperationCount":"最近{n}条","Time":"时间","Client":"客户端","Client ID":"客户端ID","IP Address":"IP地址","User":"用户","User ID":"用户ID","Operation":"操作","Data ID":"数据ID","MODIFY":"修改操作","DELETE":"删除操作","Cost":"耗时","ms":"毫秒","Show detail":"显示HTTP请求详情","The full content is as follows":"完整内容如下","Request":"请求","Response":"响应","Pressure":"压力"}}'),delete t.options._Ctor}},cc27:function(t,e,n){t.exports=n("407a")(1513)},e35f:function(t,e,n){"use strict";n("2af4")}}]);