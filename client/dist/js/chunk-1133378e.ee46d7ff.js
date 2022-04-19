(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1133378e"],{"0797":function(t,e){t.exports=function(t){t.options.__i18n=t.options.__i18n||[],t.options.__i18n.push('{"zh-CN":{"Download as text file":"作为文本文件下载"}}'),delete t.options._Ctor}},"0896":function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("transition",{attrs:{name:"fade"}},[a("el-container",{directives:[{name:"show",rawName:"v-show",value:t.$store.state.isLoaded,expression:"$store.state.isLoaded"}],attrs:{direction:"vertical"}},[a("el-header",{attrs:{height:"60px"}},[a("div",{staticClass:"page-header"},[a("span",[t._v(t._s(t.isMainTaskInfoList?t.$t("Recent Task Info"):t.$t("Related Task Info")))]),t._v(" "),a("div",{staticClass:"header-control"},[a("FuzzySearchInput",{attrs:{dataFilter:t.dataFilter}}),t._v(" "),a("el-tooltip",{attrs:{content:t.$t("Only main tasks are listed"),placement:"bottom",enterable:!1}},[t.isMainTaskInfoList?a("el-checkbox",{attrs:{border:!0,size:"small","true-label":"ROOT","false-label":""},on:{change:function(e){return t.T.changePageFilter(t.dataFilter)}},model:{value:t.dataFilter.rootTaskId,callback:function(e){t.$set(t.dataFilter,"rootTaskId",e)},expression:"dataFilter.rootTaskId"}},[t._v(t._s(t.$t("Only Main Task")))]):t._e()],1),t._v("\n\n          　\n          "),a("el-tooltip",{attrs:{content:t.$t("Clear"),placement:"bottom",enterable:!1}},[t.isMainTaskInfoList?a("el-button",{attrs:{size:"small"},on:{click:t.clear}},[a("i",{staticClass:"fa fa-fw fa-trash-o"})]):t._e()],1)],1)])]),t._v(" "),a("el-main",{staticClass:"common-table-container"},[t.T.isNothing(t.data)?a("div",{staticClass:"no-data-area"},[t.T.isPageFiltered()?a("h1",{staticClass:"no-data-title"},[t._v("当前过滤条件无匹配数据")]):a("h1",{staticClass:"no-data-title"},[t._v("尚无任何近期任务信息")]),t._v(" "),a("p",{staticClass:"no-data-tip"},[t._v("\n          执行的任务信息会被系统搜集，并展示在此\n        ")])]):a("el-table",{staticClass:"common-table",attrs:{height:"100%",data:t.data,"row-class-name":t.T.getHighlightRowCSS}},[a("el-table-column",{attrs:{label:t.$t("Status"),width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.C.TASK_STATUS_MAP.get(e.row.status)?a("el-tag",{attrs:{type:t.C.TASK_STATUS_MAP.get(e.row.status).tagType}},[a("i",{class:t.C.TASK_STATUS_MAP.get(e.row.status).icon}),t._v("\n              "+t._s(t.C.TASK_STATUS_MAP.get(e.row.status).name)+"\n            ")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:t.$t("Planned Time"),width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("datetime")(e.row.triggerTimeMs)))]),t._v(" "),a("br"),t._v(" "),a("span",{staticClass:"text-info"},[t._v(t._s(t._f("fromNow")(e.row.triggerTimeMs)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{width:"100",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.subTaskCount>0?a("el-tag",{attrs:{size:"medium",type:"primary"}},[t._v(t._s(t.$t("Main Task")))]):"ROOT"!==e.row.rootTaskId?a("el-tag",{attrs:{size:"small",type:"info"}},[t._v(t._s(t.$t("Sub Task")))]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:t.$t("Func"),"min-width":"300"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("FuncInfo",{attrs:{id:e.row.funcId,title:e.row.func_title,name:e.row.func_name}}),t._v(" "),e.row.edumpTEXT||e.row.einfoTEXT?a("InfoBlock",{attrs:{title:e.row.edumpTEXT||e.row.einfoTEXT.split("\n").pop(),type:"error"}}):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:t.$t("Wait Cost"),align:"right",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.waitCostMs&&e.row.waitCostMs>2e3?[a("span",{class:e.row.waitCostClass},[t._v(t._s(e.row.waitCostMs<1e4?e.row.waitCostMs:(e.row.waitCostMs/1e3).toFixed(1)))]),t._v(" "),a("span",{staticClass:"text-info"},[t._v(t._s(e.row.waitCostMs<1e4?t.$t("ms"):t.$t("s")))])]:[t._v("-")]]}}])}),t._v(" "),a("el-table-column",{attrs:{label:t.$t("Run Cost"),align:"right",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.runCostMs?[a("span",{class:e.row.runCostClass},[t._v(t._s(e.row.runCostMs<1e4?e.row.runCostMs:(e.row.runCostMs/1e3).toFixed(1)))]),t._v(" "),a("span",{staticClass:"text-info"},[t._v(t._s(e.row.runCostMs<1e4?t.$t("ms"):t.$t("s")))])]:[t._v("-")]]}}])}),t._v(" "),a("el-table-column",{attrs:{label:t.$t("Log Lines"),align:"right",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.logLines<10?a("span",{staticClass:"text-info"},[t._v(t._s(e.row.logLines))]):e.row.logLines<100?a("span",{staticClass:"text-good"},[t._v(t._s(e.row.logLines))]):e.row.logLines<1e3?a("span",{staticClass:"text-watch"},[t._v(t._s(e.row.logLines))]):a("span",{staticClass:"text-bad"},[t._v(t._s(e.row.logLines))])]}}])}),t._v(" "),a("el-table-column",{attrs:{width:"240",align:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.isMainTaskInfoList?[e.row.subTaskCount>0||"ROOT"!==e.row.rootTaskId?a("el-button",{attrs:{type:"text"},on:{click:function(a){return t.openSubTaskInfo(e.row)}}},[t._v(t._s(t.$t("Related Tasks")))]):t._e()]:t._e(),t._v(" "),a("el-button",{attrs:{type:"text"},on:{click:function(a){return t.showDetail(e.row)}}},[t._v(t._s(t.$t("Show Detail")))])]}}])})],1)],1),t._v(" "),a("Pager",{attrs:{pageInfo:t.pageInfo}}),t._v(" "),a("LongTextDialog",{ref:"longTextDialog",attrs:{title:"完整内容如下"}})],1)],1)},n=[],s=a("1da1"),i=(a("130f"),a("d3b7"),a("159b"),a("ac1f"),a("1276"),a("4de4"),a("99af"),a("a15b"),a("b0c0"),a("96cf"),a("b76c")),r={name:"TaskInfoList",components:{LongTextDialog:i["a"]},watch:{$route:{immediate:!0,handler:function(t,e){var a=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,a.loadData();case 2:case"end":return t.stop()}}),t)})))()}},"$store.state.isLoaded":function(t){var e=this;t&&setImmediate((function(){return e.T.autoScrollTable()}))}},methods:{loadData:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var a,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t.dataFilter=t.T.createListQuery(),a.originId=t.$route.params.id,e.next=4,t.T.callAPI_get("/api/v1/task-info/do/list",{query:a});case 4:if(o=e.sent,o.ok){e.next=7;break}return e.abrupt("return");case 7:o.data.forEach((function(t){t.logLines=0,t.logMessageTEXT&&(t.logLines=t.logMessageTEXT.split("\n").length),t.triggerTimeMs&&t.startTimeMs&&(t.waitCostMs=t.startTimeMs-t.triggerTimeMs,t.waitCostMs>18e4?t.waitCostClass="text-bad":t.waitCostMs>1e4?t.waitCostClass="text-watch":t.waitCostClass="text-good"),t.startTimeMs&&t.endTimeMs&&(t.runCostMs=t.endTimeMs-t.startTimeMs,t.runCostMs>3e5?t.runCostClass="text-bad":t.runCostMs>1e4?t.runCostClass="text-watch":t.runCostClass="text-good")})),t.data=o.data,t.pageInfo=o.pageInfo,t.$store.commit("updateLoadStatus",!0);case 11:case"end":return e.stop()}}),e)})))()},clear:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var a,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.T.confirm(t.$t("Are you sure you want to clear the Task Info?"));case 2:if(e.sent){e.next=4;break}return e.abrupt("return");case 4:return e.next=6,t.T.callAPI("/api/v1/task-info/:originId/do/clear",{params:{originId:t.$route.params.id},alert:{okMessage:t.$t("Task Info cleared")}});case 6:if(a=e.sent,a&&a.ok){e.next=9;break}return e.abrupt("return");case 9:o=null,e.t0=t.$route.params.id.split("-")[0],e.next="cron"===e.t0?13:"bat"===e.t0?15:17;break;case 13:return o="crontab-config-list",e.abrupt("break",19);case 15:return o="batch-list",e.abrupt("break",19);case 17:return o="overview",e.abrupt("break",19);case 19:t.$router.push({name:o});case 20:case"end":return e.stop()}}),e)})))()},openSubTaskInfo:function(t){var e=this.T.packRouteQuery();e.filter=this.T.createPageFilter({rootTaskId:"ROOT"===t.rootTaskId?t.id:t.rootTaskId}),this.$store.commit("updateHighlightedTableDataId",t.id),this.$store.commit("updateTableList_scrollY"),this.$router.push({name:"task-info-related-list",params:{id:this.$route.params.id},query:e})},showDetail:function(t){this.$store.commit("updateHighlightedTableDataId",t.id);var e=[];e.push("===== ".concat(this.$t("Task")," =====")),e.push("".concat(this.$t("Func ID"),": ").concat(this.$t(t.funcId))),e.push("".concat(this.$t("Func Name"),": ").concat(this.$t(t.func_name))),e.push("".concat(this.$t("Func Title"),": ").concat(this.$t(t.func_title))),t.waitCostMs>2e3?e.push("".concat(this.$t("Wait Time"),": ").concat(t.waitCostMs," ").concat(this.$t("ms"))):e.push("".concat(this.$t("Wait Time"),": -")),e.push("".concat(this.$t("Run Time"),": ").concat(t.runCostMs," ").concat(this.$t("ms"))),e.push("".concat(this.$t("Task Type"),": ").concat("ROOT"===t.rootTaskId?this.$t("Main Task"):this.$t("Sub Task"))),e.push("".concat(this.$t("Task Status"),": ").concat(this.$t(t.status))),e.push(""),e.push("===== ".concat(this.$t("Log")," =====")),t.logMessageTEXT?e.push(t.logMessageTEXT):e.push(this.$t("No log")),e.push(""),e.push("===== ".concat(this.$t("Exception")," =====")),t.einfoTEXT?e.push(t.einfoTEXT):e.push(this.$t("No exception"));var a=e.join("\n"),o=this.M(t.createTime).utcOffset(8).format("YYYYMMDD_HHmmss"),n="".concat(t.funcId,".log.").concat(o);this.$refs.longTextDialog.update(a,n)}},computed:{isMainTaskInfoList:function(){return"task-info-list"===this.$route.name}},props:{},data:function(){var t=this.T.createPageInfo(),e=this.T.createListQuery();return{data:[],pageInfo:t,dataFilter:{_fuzzySearch:e._fuzzySearch,rootTaskId:e.rootTaskId}}}},c=r,l=(a("6ec4"),a("2877")),u=a("b27f"),d=Object(l["a"])(c,o,n,!1,null,"4e07714f",null);"function"===typeof u["default"]&&Object(u["default"])(d);e["default"]=d.exports},"21a6":function(t,e,a){(function(a){var o,n,s;(function(a,i){n=[],o=i,s="function"===typeof o?o.apply(e,n):o,void 0===s||(t.exports=s)})(0,(function(){"use strict";function e(t,e){return"undefined"==typeof e?e={autoBom:!1}:"object"!=typeof e&&(console.warn("Deprecated: Expected third argument to be a object"),e={autoBom:!e}),e.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type)?new Blob(["\ufeff",t],{type:t.type}):t}function o(t,e,a){var o=new XMLHttpRequest;o.open("GET",t),o.responseType="blob",o.onload=function(){r(o.response,e,a)},o.onerror=function(){console.error("could not download file")},o.send()}function n(t){var e=new XMLHttpRequest;e.open("HEAD",t,!1);try{e.send()}catch(t){}return 200<=e.status&&299>=e.status}function s(t){try{t.dispatchEvent(new MouseEvent("click"))}catch(o){var e=document.createEvent("MouseEvents");e.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),t.dispatchEvent(e)}}var i="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof a&&a.global===a?a:void 0,r=i.saveAs||("object"!=typeof window||window!==i?function(){}:"download"in HTMLAnchorElement.prototype?function(t,e,a){var r=i.URL||i.webkitURL,c=document.createElement("a");e=e||t.name||"download",c.download=e,c.rel="noopener","string"==typeof t?(c.href=t,c.origin===location.origin?s(c):n(c.href)?o(t,e,a):s(c,c.target="_blank")):(c.href=r.createObjectURL(t),setTimeout((function(){r.revokeObjectURL(c.href)}),4e4),setTimeout((function(){s(c)}),0))}:"msSaveOrOpenBlob"in navigator?function(t,a,i){if(a=a||t.name||"download","string"!=typeof t)navigator.msSaveOrOpenBlob(e(t,i),a);else if(n(t))o(t,a,i);else{var r=document.createElement("a");r.href=t,r.target="_blank",setTimeout((function(){s(r)}))}}:function(t,e,a,n){if(n=n||open("","_blank"),n&&(n.document.title=n.document.body.innerText="downloading..."),"string"==typeof t)return o(t,e,a);var s="application/octet-stream"===t.type,r=/constructor/i.test(i.HTMLElement)||i.safari,c=/CriOS\/[\d]+/.test(navigator.userAgent);if((c||s&&r)&&"object"==typeof FileReader){var l=new FileReader;l.onloadend=function(){var t=l.result;t=c?t:t.replace(/^data:[^;]*;/,"data:attachment/file;"),n?n.location.href=t:location=t,n=null},l.readAsDataURL(t)}else{var u=i.URL||i.webkitURL,d=u.createObjectURL(t);n?n.location=d:location.href=d,n=null,setTimeout((function(){u.revokeObjectURL(d)}),4e4)}});i.saveAs=r.saveAs=r,t.exports=r}))}).call(this,a("c8ba"))},5174:function(t,e){t.exports=function(t){t.options.__i18n=t.options.__i18n||[],t.options.__i18n.push('{"zh-CN":{"s":"秒","ms":"毫秒","Planned Time":"计划时间","Task":"任务","Func ID":"函数ID","Func Name":"函数名","Func Title":"函数标题","Main Task":"主任务","Sub Task":"子任务","Wait Cost":"排队耗时","Run Cost":"执行耗时","Log Lines":"日志行数","Task Type":"任务类型","Task Status":"任务状态","Log":"日志","Exception":"异常","No log":"无日志","No exception":"无异常","Recent Task Info":"近期任务信息","Related Task Info":"相关任务信息","Only main tasks are listed":"在本页面只展示主任务","success":"成功","failure":"失败","Only Main Task":"仅主任务","Show Detail":"显示详情","Related Tasks":"相关任务","Task Info cleared":"任务信息已清空","Are you sure you want to clear the Task Info?":"是否确认清空任务信息？"}}'),delete t.options._Ctor}},"6ec4":function(t,e,a){"use strict";a("a2bc")},"7b0b4":function(t,e,a){"use strict";var o=a("0797"),n=a.n(o);e["default"]=n.a},a2bc:function(t,e,a){},a7e8:function(t,e,a){"use strict";a("b217")},b217:function(t,e,a){},b27f:function(t,e,a){"use strict";var o=a("5174"),n=a.n(o);e["default"]=n.a},b76c:function(t,e,a){"use strict";var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{id:"LongTextDialog",visible:t.show,"close-on-click-modal":!1,width:"70%"},on:{"update:visible":function(e){t.show=e}}},[a("template",{slot:"title"},[t.showDownload&&t.fileName&&t.content?a("el-link",{attrs:{type:"primary"},on:{click:t.download}},[t._v("\n      "+t._s(t.$t("Download as text file"))+"\n      "),a("i",{staticClass:"fa fa-fw fa-download"})]):t._e()],1),t._v(" "),a("div",[a("p",[t._v(t._s(t.title))]),t._v(" "),a("textarea",{attrs:{id:"longTextDialogContent"}})])],2)},n=[],s=(a("130f"),a("21a6")),i=a.n(s),r={name:"LongTextDialog",components:{},watch:{},methods:{update:function(t,e){var a=this;this.codeMirror&&this.codeMirror.setValue(""),this.content=t,this.fileName=(e||"dump")+".txt",this.show=!0,setImmediate((function(){a.codeMirror||(a.codeMirror=a.T.initCodeMirror("longTextDialogContent",a.mode||"text"),a.codeMirror.setOption("theme",a.T.getCodeMirrorThemeName()),a.T.setCodeMirrorReadOnly(a.codeMirror,!0)),a.codeMirror.setValue(a.content||""),a.codeMirror.refresh()}))},download:function(){var t=new Blob([this.content],{type:"text/plain"}),e=this.fileName;i.a.saveAs(t,e)}},computed:{},props:{title:String,mode:Boolean,showDownload:Boolean},data:function(){return{show:!1,fileName:null,content:null,codeMirror:null}},beforeDestroy:function(){this.T.destoryCodeMirror(this.codeMirror)}},c=r,l=(a("a7e8"),a("2877")),u=a("7b0b4"),d=Object(l["a"])(c,o,n,!1,null,"6cd179f4",null);"function"===typeof u["default"]&&Object(u["default"])(d);e["a"]=d.exports}}]);