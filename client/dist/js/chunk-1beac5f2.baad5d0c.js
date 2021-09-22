(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1beac5f2"],{"308d":function(t,e){t.exports=function(t){t.options.__i18n=t.options.__i18n||[],t.options.__i18n.push('{"zh-CN":{"Info":"信息","Recent Response":"响应","Expires":"有效期","Never":"长期有效","Limiting":"限流","No limit":"无限制","Shown in doc":"在文档中显示","Hidden in doc":"在文档中隐藏","Recent":"近日调用","Today":"今天","-1 Day":"昨天","-2 Day":"前天","Times":"次","Response":"响应速度","No info":"暂无信息","ms":"毫秒","Percentage":"比例","Result":"执行结果","Success":"成功执行","Cached":"命中缓存","Func Error":"函数报错","Func Timeout":"函数超时","API Timeout":"接口超时","Bad return":"非法结果","Unknow Error":"未知错误","Auth Link disabled":"授权链接已禁用","Auth Link enabled":"授权链接已启用","Auth Link deleted":"授权链接已删除","Search Auth Link(ID, tags, note), Func(ID, kwargs, title, description, tags)":"搜索授权链接（ID、标签、备注），函数（ID、参数、标题、描述、标签）","Check to show the contents created by outside systems":"勾选后展示由其他系统自动创建的内容","No Auth Link has ever been added":"从未添加过任何授权链接","Auth Link only supports synchronous calling":"授权链接只支持同步调用","Are you sure you want to disable the Auth Link?":"是否确认禁用此授权链接？","Are you sure you want to delete the Auth Link?":"是否确认删除此授权链接？"}}'),delete t.options._Ctor}},"58d3":function(t,e,a){"use strict";var n=a("308d"),s=a.n(n);e["default"]=s.a},"5aca":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("transition",{attrs:{name:"fade"}},[t.$store.state.isLoaded?a("el-container",{attrs:{direction:"vertical"}},[a("el-header",{attrs:{height:"60px"}},[a("h1",[t._v("\n        "+t._s(t.$t("Auth Link"))+"\n        "),a("div",{staticClass:"header-control"},[a("el-switch",{attrs:{"inactive-text":t.$t("Info"),"active-text":t.$t("Recent Response")},model:{value:t.showCountCost,callback:function(e){t.showCountCost=e},expression:"showCountCost"}}),t._v("\n          　\n\n          "),a("FuzzySearchInput",{attrs:{dataFilter:t.dataFilter,searchTip:t.$t("Search Auth Link(ID, tags, note), Func(ID, kwargs, title, description, tags)")}}),t._v(" "),a("el-tooltip",{attrs:{content:t.$t("Check to show the contents created by outside systems"),placement:"bottom",enterable:!1}},[a("el-checkbox",{attrs:{border:!0,size:"small","true-label":"API,UI","false-label":""},on:{change:function(e){return t.T.changePageFilter(t.dataFilter)}},model:{value:t.dataFilter.origin,callback:function(e){t.$set(t.dataFilter,"origin",e)},expression:"dataFilter.origin"}},[t._v(t._s(t.$t("Show all")))])],1),t._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return t.openSetup(null,"add")}}},[a("i",{staticClass:"fa fa-fw fa-plus"}),t._v("\n            "+t._s(t.$t("New"))+"\n          ")])],1)])]),t._v(" "),a("el-main",{staticClass:"common-table-container"},[t.T.isNothing(t.data)?a("div",{staticClass:"no-data-area"},[t.T.isPageFiltered({ignore:{origin:"API,UI"}})?a("h1",{staticClass:"no-data-title"},[t._v(t._s(t.$t("No matched data found")))]):a("h1",{staticClass:"no-data-title"},[t._v(t._s(t.$t("No Auth Link has ever been added")))]),t._v(" "),a("p",{staticClass:"no-data-tip"},[t._v("\n          出于安全性考虑，函数默认只能从内部网络访问\n          "),a("br"),t._v("如需从外部访问，必须先为函数创建授权链接，通过授权链接访问函数\n        ")])]):a("el-table",{staticClass:"common-table",attrs:{height:"100%",data:t.data,"row-class-name":t.highlightRow}},[a("el-table-column",{attrs:{label:t.$t("Func")},scopedSlots:t._u([{key:"default",fn:function(e){return[a("FuncInfo",{attrs:{id:e.row.func_id,title:e.row.func_title,name:e.row.func_name,kwargsJSON:e.row.funcCallKwargsJSON}}),t._v(" "),a("div",[a("span",{staticClass:"text-info"},[t._v("　ID")]),t._v(" "),a("code",{staticClass:"text-code"},[t._v(t._s(e.row.id))]),a("CopyButton",{attrs:{content:e.row.id}}),t._v(" "),t.T.isNothing(e.row.tagsJSON)&&t.T.isNothing(e.row.func_tagsJSON)?t._e():[a("br"),t._v(" "),a("span",{staticClass:"text-info"},[t._v("　"+t._s(t.$t("Tags")))]),t._v(" "),t._l(e.row.func_tagsJSON,(function(e){return a("el-tag",{key:e,attrs:{size:"mini",type:"info"}},[t._v(t._s(e))])})),t._v(" "),t._l(e.row.tagsJSON,(function(e){return a("el-tag",{key:e,attrs:{size:"mini",type:"warning"}},[t._v(t._s(e))])}))]],2)]}}],null,!1,250145672)}),t._v(" "),t.showCountCost?[a("el-table-column",{attrs:{label:t.$t("Recent"),align:"right",width:"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._l(e.row.recentRunningCount.slice(0,3),(function(e,n){return[a("code",[t._v(t._s([t.$t("Today"),t.$t("-1 Day"),t.$t("-2 Day")][n])+":")]),t._v(" "),a("code",{staticClass:"count-cost-value"},[t._v(t._s(e.count))]),t._v(" "+t._s(t.$t("Times"))),a("br")]}))]}}],null,!1,3478583821)}),t._v(" "),a("el-table-column",{attrs:{label:t.$t("Response"),align:"right",width:"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.recentRunningCost.samples<=0?a("span",{staticClass:"text-info"},[t._v(t._s(t.$t("No info")))]):[a("code",[t._v("MIN:")]),t._v(" "),a("code",{staticClass:"count-cost-value",class:t.getCostClass(e.row.recentRunningCost.min)},[t._v(t._s(e.row.recentRunningCost.min))]),t._v(" "+t._s(t.$t("ms"))),a("br"),t._v(" "),a("code",[t._v("MAX:")]),t._v(" "),a("code",{staticClass:"count-cost-value",class:t.getCostClass(e.row.recentRunningCost.max)},[t._v(t._s(e.row.recentRunningCost.max))]),t._v(" "+t._s(t.$t("ms"))),a("br"),t._v(" "),a("code",[t._v("AVG:")]),t._v(" "),a("code",{staticClass:"count-cost-value",class:t.getCostClass(e.row.recentRunningCost.avg)},[t._v(t._s(e.row.recentRunningCost.avg))]),t._v(" "+t._s(t.$t("ms"))),a("br"),t._v(" "),a("code",[t._v("MID:")]),t._v(" "),a("code",{staticClass:"count-cost-value",class:t.getCostClass(e.row.recentRunningCost.mid)},[t._v(t._s(e.row.recentRunningCost.mid))]),t._v(" "+t._s(t.$t("ms"))),a("br")]]}}],null,!1,2368370985)}),t._v(" "),a("el-table-column",{attrs:{label:t.$t("Percentage"),align:"right",width:"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.recentRunningCost.samples<=0?a("span",{staticClass:"text-info"},[t._v(t._s(t.$t("No info")))]):[a("code",[t._v("P75:")]),t._v(" "),a("code",{staticClass:"count-cost-value",class:t.getCostClass(e.row.recentRunningCost.p75)},[t._v(t._s(e.row.recentRunningCost.p75))]),t._v(" "+t._s(t.$t("ms"))),a("br"),t._v(" "),a("code",[t._v("P95:")]),t._v(" "),a("code",{staticClass:"count-cost-value",class:t.getCostClass(e.row.recentRunningCost.p95)},[t._v(t._s(e.row.recentRunningCost.p95))]),t._v(" "+t._s(t.$t("ms"))),a("br"),t._v(" "),a("code",[t._v("P99:")]),t._v(" "),a("code",{staticClass:"count-cost-value",class:t.getCostClass(e.row.recentRunningCost.p99)},[t._v(t._s(e.row.recentRunningCost.p99))]),t._v(" "+t._s(t.$t("ms"))),a("br")]]}}],null,!1,1947534317)}),t._v(" "),a("el-table-column",{attrs:{label:t.$t("Result"),align:"right",width:"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.recentRunningStatus.total<=0?a("span",{staticClass:"text-info"},[t._v(t._s(t.$t("No info")))]):[t._l(t.RUNNING_STATUS_MAP,(function(n,s){return[e.row.recentRunningStatus[s]?[a("code",[t._v(t._s(n.title)+":")]),t._v(" "),a("code",{staticClass:"count-cost-value",class:n.class},[t._v(t._s((e.row.recentRunningStatus[s]/e.row.recentRunningStatus.total*100).toFixed(1)))]),t._v(" %"),a("br")]:t._e()]}))]]}}],null,!1,3699745843)})]:[a("el-table-column",{attrs:{label:t.$t("Expires"),width:"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.expireTime?[a("span",{class:t.T.isExpired(e.row.expireTime)?"text-bad":"text-good"},[t._v(t._s(t._f("datetime")(e.row.expireTime)))]),t._v(" "),a("br"),t._v(" "),a("span",{staticClass:"text-info"},[t._v(t._s(t._f("fromNow")(e.row.expireTime)))])]:a("span",{staticClass:"text-good"},[t._v(t._s(t.$t("Never")))])]}}],null,!1,2465564630)}),t._v(" "),a("el-table-column",{attrs:{label:t.$t("Limiting"),width:"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.T.isNothing(e.row.throttlingJSON)?a("span",{staticClass:"text-good"},[t._v(t._s(t.$t("No limit")))]):[t._l(t.C.AUTH_LINK_THROTTLING,(function(n){return[e.row.throttlingJSON[n.key]?a("span",[t._v(t._s(t.$tc(n.name,e.row.throttlingJSON[n.key]))),a("br")]):t._e()]}))]]}}],null,!1,889067924)}),t._v(" "),a("el-table-column",{attrs:{label:t.$t("Status"),width:"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.isDisabled?a("span",{staticClass:"text-bad"},[t._v(t._s(t.$t("Disabled")))]):a("span",{staticClass:"text-good"},[t._v(t._s(t.$t("Enabled")))]),t._v(" "),a("br"),t._v(" "),e.row.showInDoc?a("span",{staticClass:"text-good"},[t._v(t._s(t.$t("Shown in doc")))]):a("span",{staticClass:"text-bad"},[t._v(t._s(t.$t("Hidden in doc")))])]}}],null,!1,1957040833)}),t._v(" "),a("el-table-column",{attrs:{label:t.$t("Note"),width:"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.note?a("span",{staticClass:"text-info"},[t._v(t._s(e.row.note))]):t._e()]}}],null,!1,2537589345)})],t._v(" "),a("el-table-column",{attrs:{align:"right",width:"300"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{disabled:t.T.isNothing(e.row.func_id),type:"text"},on:{click:function(a){return t.showAPI(e.row)}}},[t._v(t._s(t.$t("API Example")))]),t._v(" "),e.row.isDisabled?a("el-button",{attrs:{disabled:t.T.isNothing(e.row.func_id),type:"text"},on:{click:function(a){return t.quickSubmitData(e.row,"enable")}}},[t._v(t._s(t.$t("Enable")))]):a("el-button",{attrs:{disabled:t.T.isNothing(e.row.func_id),type:"text"},on:{click:function(a){return t.quickSubmitData(e.row,"disable")}}},[t._v(t._s(t.$t("Disable")))]),t._v(" "),a("el-button",{attrs:{disabled:t.T.isNothing(e.row.func_id),type:"text"},on:{click:function(a){return t.openSetup(e.row,"setup")}}},[t._v(t._s(t.$t("Setup")))]),t._v(" "),a("el-button",{attrs:{type:"text"},on:{click:function(a){return t.quickSubmitData(e.row,"delete")}}},[t._v(t._s(t.$t("Delete")))])]}}],null,!1,3111007282)})],2)],1),t._v(" "),a("Pager",{attrs:{pageInfo:t.pageInfo}}),t._v(" "),a("APIExampleDialog",{ref:"apiExampleDialog",attrs:{description:t.$t("Auth Link only supports synchronous calling"),showPostExample:!0,showPostExampleSimplified:!0,showGetExample:!0,showGetExampleSimplified:!0}})],1):t._e()],1)},s=[],i=a("a6db"),o=(a("8d65"),a("672e"),a("b3fd")),r={name:"AuthLinkList",components:{APIExampleDialog:o["a"]},watch:{$route:{immediate:!0,handler:function(t,e){var a=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,a.loadData();case 2:case"end":return t.stop()}}),t)})))()}},"$store.state.isLoaded":function(t){var e=this;t&&setImmediate((function(){e.T.autoScrollTable(e.$store.state.AuthLinkList_scrollY)}))}},methods:{highlightRow:function(t){var e=t.row;t.rowIndex;return this.$store.state.highlightedTableDataId===e.id?"hl-row":""},loadData:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var a,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t.T.createListQuery(),t.T.isNothing(t.dataFilter.origin)&&(a.origin="UI"),e.next=4,t.T.callAPI_get("/api/v1/auth-links/do/list",{query:a});case 4:if(n=e.sent,n.ok){e.next=7;break}return e.abrupt("return");case 7:t.data=n.data,t.pageInfo=n.pageInfo,t.$store.commit("updateLoadStatus",!0);case 10:case"end":return e.stop()}}),e)})))()},quickSubmitData:function(t,e){var a=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var s;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:n.t0=e,n.next="disable"===n.t0?3:"delete"===n.t0?8:13;break;case 3:return n.next=5,a.T.confirm(a.$t("Are you sure you want to disable the Auth Link?"));case 5:if(n.sent){n.next=7;break}return n.abrupt("return");case 7:return n.abrupt("break",13);case 8:return n.next=10,a.T.confirm(a.$t("Are you sure you want to delete the Auth Link?"));case 10:if(n.sent){n.next=12;break}return n.abrupt("return");case 12:return n.abrupt("break",13);case 13:s=null,n.t1=e,n.next="disable"===n.t1?17:"enable"===n.t1?21:"delete"===n.t1?25:29;break;case 17:return n.next=19,a.T.callAPI("post","/api/v1/auth-links/:id/do/modify",{params:{id:t.id},body:{data:{isDisabled:!0}},alert:{okMessage:a.$t("Auth Link disabled")}});case 19:return s=n.sent,n.abrupt("break",29);case 21:return n.next=23,a.T.callAPI("post","/api/v1/auth-links/:id/do/modify",{params:{id:t.id},body:{data:{isDisabled:!1}},alert:{okMessage:a.$t("Auth Link enabled")}});case 23:return s=n.sent,n.abrupt("break",29);case 25:return n.next=27,a.T.callAPI("/api/v1/auth-links/:id/do/delete",{params:{id:t.id},alert:{okMessage:a.$t("Auth Link deleted")}});case 27:return s=n.sent,n.abrupt("break",29);case 29:if(s&&s.ok){n.next=31;break}return n.abrupt("return");case 31:return a.$store.commit("updateHighlightedTableDataId",t.id),n.next=34,a.loadData();case 34:case"end":return n.stop()}}),n)})))()},openSetup:function(t,e){var a=this.T.packRouteQuery();switch(this.$store.commit("updateAuthLinkList_scrollY",this.T.getTableScrollY()),e){case"add":this.$router.push({name:"auth-link-add",query:a});break;case"setup":this.$store.commit("updateHighlightedTableDataId",t.id),this.$router.push({name:"auth-link-setup",params:{id:t.id},query:a});break}},showAPI:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var n,s,i,o,r,l;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,e.T.callAPI_getOne("/api/v1/funcs/do/list",t.funcId);case 2:if(n=a.sent,n.ok){a.next=5;break}return a.abrupt("return");case 5:for(r in s=n.data.kwargsJSON,i=e.T.formatURL("/api/v1/al/:id",{baseURL:!0,params:{id:t.id}}),o={},t.funcCallKwargsJSON)t.funcCallKwargsJSON.hasOwnProperty(r)&&e.common.isFuncArgumentPlaceholder(t.funcCallKwargsJSON[r])&&(o[r]=t.funcCallKwargsJSON[r]);l={kwargs:o},e.$store.commit("updateHighlightedTableDataId",t.id),e.$refs.apiExampleDialog.update(i,l,s);case 12:case"end":return a.stop()}}),a)})))()},getCostClass:function(t){return t<3e3?"text-good":t<1e4?"text-watch":"text-bad"}},computed:{RUNNING_STATUS_MAP:function(){return{OK:{title:this.$t("Success"),class:"text-good"},cached:{title:this.$t("Cached"),class:"text-good"},EFuncFailed:{title:this.$t("Func Error"),class:"text-bad"},EFuncTimeout:{title:this.$t("Func Timeout"),class:"text-bad"},EAPITimeout:{title:this.$t("API Timeout"),class:"text-bad"},EFuncResultParsingFailed:{title:this.$t("Bad return"),class:"text-bad"},UnknowError:{title:this.$t("Unknow Error"),class:"text-bad"}}}},props:{},data:function(){var t=this.T.createPageInfo(),e=this.T.createListQuery();return{data:[],pageInfo:t,dataFilter:{_fuzzySearch:e._fuzzySearch,origin:e.origin},showCountCost:!1}}},l=r,u=(a("88d0"),a("0620")),c=a("58d3"),p=Object(u["a"])(l,n,s,!1,null,"2cb6cba9",null);"function"===typeof c["default"]&&Object(c["default"])(p);e["default"]=p.exports},"62ca":function(t,e,a){"use strict";a("b974")},8383:function(t,e,a){},"88d0":function(t,e,a){"use strict";a("8383")},b3fd:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{title:t.title||"API调用示例",visible:t.show,width:"750px"},on:{"update:visible":function(e){t.show=e}}},[a("span",[a("span",{class:t.descriptionClass},[t._v(t._s(t.description))]),t._v(" "),t.showOptions?[a("el-divider",{attrs:{"content-position":"left"}},[t._v("请求选项")]),t._v(" "),a("el-form",{staticClass:"call-options",attrs:{"label-width":"80px"}},[t.showExecModeOption?a("el-form-item",{attrs:{label:"异步执行"}},[a("el-switch",{attrs:{"inactive-value":"sync","active-value":"async"},model:{value:t.callOptions.execMode,callback:function(e){t.$set(t.callOptions,"execMode",e)},expression:"callOptions.execMode"}})],1):t._e(),t._v(" "),t.showSaveResultOption?a("el-form-item",{attrs:{label:"保留结果"}},[a("el-switch",{attrs:{"inactive-value":!1,"active-value":!0},model:{value:t.callOptions.saveResult,callback:function(e){t.$set(t.callOptions,"saveResult",e)},expression:"callOptions.saveResult"}})],1):t._e(),t._v(" "),t.showTimeoutOption?a("el-form-item",{attrs:{label:"执行超时"}},[a("el-input-number",{attrs:{size:"mini","step-strictly":"",step:1,min:t.$store.getters.CONFIG("_FUNC_TASK_MIN_TIMEOUT"),max:t.$store.getters.CONFIG("_FUNC_TASK_MAX_TIMEOUT")},model:{value:t.callOptions.timeout,callback:function(e){t.$set(t.callOptions,"timeout",e)},expression:"callOptions.timeout"}}),t._v("　秒\n        ")],1):t._e(),t._v(" "),t.showAPITimeoutOption?a("el-form-item",{attrs:{label:"API超时"}},[a("el-input-number",{attrs:{size:"mini","step-strictly":"",step:1,min:t.$store.getters.CONFIG("_FUNC_TASK_MIN_API_TIMEOUT"),max:t.$store.getters.CONFIG("_FUNC_TASK_MAX_API_TIMEOUT")},model:{value:t.callOptions.apiTimeout,callback:function(e){t.$set(t.callOptions,"apiTimeout",e)},expression:"callOptions.apiTimeout"}}),t._v("　秒\n        ")],1):t._e()],1)]:t._e(),t._v(" "),a("el-divider",{attrs:{"content-position":"left"}},[t._v("编辑请求")]),t._v(" "),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:22}},[a("el-input",{attrs:{type:"textarea",readonly:"",autosize:"",resize:"none"},model:{value:t.apiURLExample,callback:function(e){t.apiURLExample=e},expression:"apiURLExample"}})],1),t._v(" "),a("el-col",{attrs:{span:2}},[a("CopyButton",{attrs:{content:t.apiURLExample}})],1)],1),t._v(" "),t.apiBodyExample?a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:22}},[a("el-input",{attrs:{type:"textarea",autosize:"",resize:"none"},model:{value:t.apiBodyExample,callback:function(e){t.apiBodyExample=e},expression:"apiBodyExample"}}),t._v(" "),a("InfoBlock",{attrs:{type:"info",title:"POST请求时，Content-Type 应设置为 application/json"}}),t._v(" "),t.apiBodyExample&&t.common.containsFuncArgumentPlaceholder(t.apiBodyExample)>=0?a("InfoBlock",{attrs:{type:"info",title:'"INPUT_BY_CALLER"为需要填写的参数，请根据需要进行修改'}}):t._e(),t._v(" "),t.supportCustomKwargs?a("InfoBlock",{attrs:{type:"success",title:"本函数允许传递额外的自定义函数参数"}}):t._e(),t._v(" "),t.supportFileUpload?a("InfoBlock",{attrs:{type:"success",title:'本函数支持文件上传，文件字段名为"files"'}}):t._e()],1),t._v(" "),a("el-col",{attrs:{span:2}},[a("CopyButton",{attrs:{content:t.apiBodyExample}})],1)],1):t._e(),t._v(" "),t.apiBody?[t.showGetExampleSimplified?[a("el-divider",{attrs:{"content-position":"left"}},[t._v("GET 简化形式请求")]),t._v(" "),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:22}},[t.stringParametersOnly?a("el-link",{staticClass:"api-url-with-query",attrs:{type:"primary",href:t.apiURLWithQueryExample_simplified,target:"_blank"}},[a("code",{domProps:{innerHTML:t._s(t.apiURLWithQueryExampleText_simplified)}})]):t._e(),t._v(" "),a("InfoBlock",{attrs:{type:t.stringParametersOnly?"info":"error",title:"此方式参数值只支持字符串，且不支持 options 参数"}})],1),t._v(" "),a("el-col",{attrs:{span:2}},[t.stringParametersOnly?a("CopyButton",{attrs:{content:t.apiURLWithQueryExample_simplified}}):t._e()],1)],1)]:t._e(),t._v(" "),t.showGetExample?[a("el-divider",{attrs:{"content-position":"left"}},[t._v("GET 标准形式请求")]),t._v(" "),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:22}},[a("el-link",{staticClass:"api-url-with-query",attrs:{type:"primary",href:t.apiURLWithQueryExample,target:"_blank"}},[a("code",{domProps:{innerHTML:t._s(t.apiURLWithQueryExampleText)}})]),t._v(" "),a("InfoBlock",{attrs:{type:"info",title:"kwargs 参数为 POST 方式中对 kwargs 参数进行 JSON 序列化，再进行 URL 编码后的字符串"}}),t._v(" "),a("InfoBlock",{attrs:{type:"info",title:"kwargs 参数处理代码参考：encodeURIComponent(JSON.stringify(kwargs))"}})],1),t._v(" "),a("el-col",{attrs:{span:2}},[a("CopyButton",{attrs:{content:t.apiURLWithQueryExample}})],1)],1)]:t._e(),t._v(" "),t.showGetExampleFlattened?[a("el-divider",{attrs:{"content-position":"left"}},[t._v("GET 扁平形式请求")]),t._v(" "),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:22}},[t.stringParametersOnly?a("el-link",{staticClass:"api-url-with-query",attrs:{type:"primary",href:t.apiURLWithQueryExample_flattened,target:"_blank"}},[a("code",{domProps:{innerHTML:t._s(t.apiURLWithQueryExampleText_flattened)}})]):t._e(),t._v(" "),a("InfoBlock",{attrs:{type:t.stringParametersOnly?"info":"error",title:"此方式参数值只支持字符串"}})],1),t._v(" "),a("el-col",{attrs:{span:2}},[t.stringParametersOnly?a("CopyButton",{attrs:{content:t.apiURLWithQueryExample_flattened}}):t._e()],1)],1)]:t._e(),t._v(" "),t.showPostExampleSimplified?[a("el-divider",{attrs:{"content-position":"left"}},[t._v("POST 简化形式请求")]),t._v(" "),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:22}},[t.stringParametersOnly?a("el-input",{attrs:{type:"textarea",readonly:"",autosize:"",resize:"none",value:t.apiCallByCurlExample_simplified}}):t._e(),t._v(" "),a("InfoBlock",{attrs:{type:t.stringParametersOnly?"info":"error",title:"此方式参数值只支持字符串，且不支持 options 参数"}}),t._v(" "),a("InfoBlock",{attrs:{type:"info",title:'单纯提交数据时，Content-Type 可以指定为 "multipart/form-data" 或 "application/x-www-form-urlencoded"'}}),t._v(" "),a("InfoBlock",{attrs:{type:"info",title:'上传文件时，Content-Type 需要指定为 "multipart/form-data"'}})],1),t._v(" "),a("el-col",{attrs:{span:2}},[t.stringParametersOnly?a("CopyButton",{attrs:{content:t.apiCallByCurlExample_simplified}}):t._e()],1)],1)]:t._e(),t._v(" "),t.showPostExample?[a("el-divider",{attrs:{"content-position":"left"}},[t._v("POST 标准形式请求")]),t._v(" "),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:22}},[a("el-input",{attrs:{type:"textarea",readonly:"",autosize:"",resize:"none",value:t.apiCallByCurlExample}}),t._v(" "),a("InfoBlock",{attrs:{type:"info",title:"此方式不支持文件上传"}})],1),t._v(" "),a("el-col",{attrs:{span:2}},[a("CopyButton",{attrs:{content:t.apiCallByCurlExample}})],1)],1)]:t._e(),t._v(" "),t.showPostExampleFlattened?[a("el-divider",{attrs:{"content-position":"left"}},[t._v("POST 扁平形式请求")]),t._v(" "),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:22}},[t.stringParametersOnly?a("el-input",{attrs:{type:"textarea",readonly:"",autosize:"",resize:"none",value:t.apiCallByCurlExample_flattened}}):t._e(),t._v(" "),a("InfoBlock",{attrs:{type:t.stringParametersOnly?"info":"error",title:"此方式参数值只支持字符串"}}),t._v(" "),a("InfoBlock",{attrs:{type:"info",title:'单纯提交数据时，Content-Type 可以指定为 "multipart/form-data" 或 "application/x-www-form-urlencoded"'}}),t._v(" "),a("InfoBlock",{attrs:{type:"info",title:'上传文件时，Content-Type 需要指定为 "multipart/form-data"'}})],1),t._v(" "),a("el-col",{attrs:{span:2}},[t.stringParametersOnly?a("CopyButton",{attrs:{content:t.apiCallByCurlExample_flattened}}):t._e()],1)],1)]:t._e()]:[a("span",{staticClass:"text-bad"},[t._v("Body内容填写存在错误，正确填写后将展示示例")])]],2)])},s=[],i=(a("60da"),a("977b"),a("bd06"),a("fbe6"),a("81df"),{name:"APIExampleDialog",components:{},watch:{callOptions:{deep:!0,handler:function(t){var e=null;try{e=JSON.parse(this.apiBodyExample)}catch(n){}if(e){for(var a in e.options=e.options||{},t)t[a]===this.DEFAULT_CALL_OPTIONS[a]?delete e.options[a]:e.options[a]=t[a];this.T.isNothing(e.options)&&delete e.options,this.apiBodyExample=JSON.stringify(e,null,2)}}}},methods:{prettyURLForHTML:function(t){if(!t)return"";try{var e=t.split("?");if(!e[1])return t;for(var a=e[1].split("&"),n=0;n<a.length;n++)a[n]=0===n?"?"+a[n]:"&"+a[n];var s=e[0]+"<br>"+a.join("<br>");return s}catch(i){return console.error(i),t}},washAPIBody:function(t){if(t=this.T.jsonCopy(t),this.T.isNothing(t))return t;if(!this.T.isNothing(t.kwargs))for(var e in t.kwargs)0!==e.indexOf("**")&&"files"!==e||delete t.kwargs[e];return this.T.isNothing(t.kwargs)&&delete t.kwargs,this.T.isNothing(t.options)&&delete t.options,t},update:function(t,e,a){for(var n in e=e||{},e.kwargs=e.kwargs||{},e.options=e.options||{},a=a||{},this.supportFileUpload=!1,this.supportCustomKwargs=!1,this.callOptions)this.callOptions[n]=this.DEFAULT_CALL_OPTIONS[n];for(var s in e.kwargs.files&&(this.supportFileUpload=this.common.isFuncArgumentPlaceholder(e.kwargs.files)),a)if(0===s.indexOf("**")){this.supportCustomKwargs=!0;break}e=this.washAPIBody(e),e=this.T.isNothing(e)?"":JSON.stringify(e,null,2),this.apiURLExample=t,this.apiBodyExample=e,this.show=!0},getAPIURLWithQueryExample:function(t,e,a){if(!this.apiBody)return null;var n=this.washAPIBody(this.apiBody);t=t||"normal",e=e||!1;var s=null,i={};switch(t){case"normal":i=n||i,s=this.T.formatURL(this.apiURLExample,{query:i});break;case"simplified":n&&n.kwargs&&(i=n.kwargs||i),s=this.T.formatURL("".concat(this.apiURLExample,"/simplified"),{query:i});break;case"flattened":if(n){if(n.kwargs)for(var o in n.kwargs)i["kwargs_".concat(o)]=n.kwargs[o];if(n.options)for(var r in n.options)i["options_".concat(r)]=n.options[r]}s=this.T.formatURL("".concat(this.apiURLExample,"/flattened"),{query:i});break}return e&&(s=this.prettyURLForHTML(s)),a&&(s=decodeURIComponent(s)),s},getAPICallByCurlPostExample:function(t){if(!this.apiBody)return null;var e=this.washAPIBody(this.apiBody);t=t||"normal";var a="",n="",s="";switch(t){case"normal":a=this.apiURLExample,n='-H "Content-Type: application/json"',this.T.isNothing(e)||(s="-d '".concat(JSON.stringify(e),"'"));break;case"simplified":if(a="".concat(this.apiURLExample,"/").concat(t),!this.T.isNothing(e.kwargs))for(var i in e.kwargs)s+=" -F ".concat(i,"=").concat(e.kwargs[i]);this.supportFileUpload?(n='-H "multipart/form-data"',s+=" -F files=@FILE_TO_UPLOAD"):n='-H "application/x-www-form-urlencoded"';break;case"flattened":if(a="".concat(this.apiURLExample,"/").concat(t),n='-H "application/x-www-form-urlencoded"',!this.T.isNothing(e.kwargs))for(var o in e.kwargs)s+=" -F kwargs_".concat(o,"=").concat(e.kwargs[o]);if(!this.T.isNothing(e.options))for(var r in e.options)s+=" -F options_".concat(r,"=").concat(e.options[r]);this.supportFileUpload&&(s+=" -F kwargs_files=@FILE_TO_UPLOAD");break}var l="curl -X POST";return n&&(l+=" ".concat(n.trim())),s&&(l+=" ".concat(s.trim())),a&&(l+=" ".concat(a.trim())),l}},computed:{DEFAULT_CALL_OPTIONS:function(){return{execMode:"sync",saveResult:!1,timeout:this.$store.getters.CONFIG("_FUNC_TASK_DEFAULT_TIMEOUT"),apiTimeout:this.$store.getters.CONFIG("_FUNC_TASK_DEFAULT_API_TIMEOUT")}},showOptions:function(){return this.showExecModeOption||this.showSaveResultOption||this.showTimeoutOption||this.showAPITimeoutOption},apiBody:function(){if(!this.apiBodyExample)return{};var t=null;try{t=JSON.parse(this.apiBodyExample)}catch(e){return null}return t},apiURLWithQueryExample:function(){return this.getAPIURLWithQueryExample("normal")},apiURLWithQueryExample_flattened:function(){return this.getAPIURLWithQueryExample("flattened")},apiURLWithQueryExample_simplified:function(){return this.getAPIURLWithQueryExample("simplified")},apiURLWithQueryExampleText:function(){return this.getAPIURLWithQueryExample("normal",!0,!0)},apiURLWithQueryExampleText_simplified:function(){return this.getAPIURLWithQueryExample("simplified",!0,!0)},apiURLWithQueryExampleText_flattened:function(){return this.getAPIURLWithQueryExample("flattened",!0,!0)},apiCallByCurlExample:function(){return this.getAPICallByCurlPostExample("normal")},apiCallByCurlExample_simplified:function(){return this.getAPICallByCurlPostExample("simplified")},apiCallByCurlExample_flattened:function(){return this.getAPICallByCurlPostExample("flattened")},stringParametersOnly:function(){if(!this.apiBody)return!1;var t=this.apiBody.kwargs||{};for(var e in t)if("string"!==typeof t[e])return!1;return!0}},props:{title:String,description:String,descriptionClass:Object,showExecModeOption:{type:Boolean,default:!1},showSaveResultOption:{type:Boolean,default:!1},showTimeoutOption:{type:Boolean,default:!1},showAPITimeoutOption:{type:Boolean,default:!1},showGetExample:{type:Boolean,default:!0},showGetExampleSimplified:{type:Boolean,default:!1},showGetExampleFlattened:{type:Boolean,default:!1},showPostExample:{type:Boolean,default:!0},showPostExampleSimplified:{type:Boolean,default:!1},showPostExampleFlattened:{type:Boolean,default:!1}},data:function(){return{show:!1,supportFileUpload:!1,supportCustomKwargs:!1,apiURLExample:null,apiBodyExample:null,funcKwargs:null,callOptions:{execMode:null,saveResult:null,timeout:null,apiTimeout:null}}}}),o=i,r=(a("62ca"),a("0620")),l=Object(r["a"])(o,n,s,!1,null,"6613d2ee",null);e["a"]=l.exports},b974:function(t,e,a){}}]);