(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-31476ad9"],{"3ed2":function(t,e,a){},"9f4a":function(t,e,a){"use strict";a("d860")},b3fd:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{title:t.title||"API调用示例",visible:t.show,"close-on-click-modal":!1,width:"750px"},on:{"update:visible":function(e){t.show=e}}},[a("span",[a("span",{class:t.descriptionClass},[t._v(t._s(t.description))]),t._v(" "),t.showOptions?[a("el-divider",{attrs:{"content-position":"left"}},[t._v("请求选项")]),t._v(" "),a("el-form",{staticClass:"call-options",attrs:{"label-width":"80px"}},[t.showExecModeOption?a("el-form-item",{attrs:{label:"异步执行"}},[a("el-switch",{attrs:{"inactive-value":"sync","active-value":"async"},model:{value:t.callOptions.execMode,callback:function(e){t.$set(t.callOptions,"execMode",e)},expression:"callOptions.execMode"}})],1):t._e(),t._v(" "),t.showSaveResultOption?a("el-form-item",{attrs:{label:"保留结果"}},[a("el-switch",{attrs:{"inactive-value":!1,"active-value":!0},model:{value:t.callOptions.saveResult,callback:function(e){t.$set(t.callOptions,"saveResult",e)},expression:"callOptions.saveResult"}})],1):t._e(),t._v(" "),t.showTimeoutOption?a("el-form-item",{attrs:{label:"执行超时"}},[a("el-input-number",{attrs:{size:"mini","step-strictly":"",step:1,precision:0,min:t.$store.getters.CONFIG("_FUNC_TASK_MIN_TIMEOUT"),max:t.$store.getters.CONFIG("_FUNC_TASK_MAX_TIMEOUT")},model:{value:t.callOptions.timeout,callback:function(e){t.$set(t.callOptions,"timeout",e)},expression:"callOptions.timeout"}}),t._v("　秒\n        ")],1):t._e(),t._v(" "),t.showAPITimeoutOption?a("el-form-item",{attrs:{label:"API超时"}},[a("el-input-number",{attrs:{size:"mini","step-strictly":"",step:1,precision:0,min:t.$store.getters.CONFIG("_FUNC_TASK_MIN_API_TIMEOUT"),max:t.$store.getters.CONFIG("_FUNC_TASK_MAX_API_TIMEOUT")},model:{value:t.callOptions.apiTimeout,callback:function(e){t.$set(t.callOptions,"apiTimeout",e)},expression:"callOptions.apiTimeout"}}),t._v("　秒\n        ")],1):t._e()],1)]:t._e(),t._v(" "),a("el-divider",{attrs:{"content-position":"left"}},[t._v("编辑请求")]),t._v(" "),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:22}},[a("el-input",{attrs:{type:"textarea",readonly:"",autosize:"",resize:"none"},model:{value:t.apiURLExample,callback:function(e){t.apiURLExample=e},expression:"apiURLExample"}})],1),t._v(" "),a("el-col",{attrs:{span:2}},[a("CopyButton",{attrs:{content:t.apiURLExample}})],1)],1),t._v(" "),t.apiBodyExample?a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:22}},[a("el-input",{attrs:{type:"textarea",autosize:"",resize:"none"},model:{value:t.apiBodyExample,callback:function(e){t.apiBodyExample=e},expression:"apiBodyExample"}}),t._v(" "),a("InfoBlock",{attrs:{type:"info",title:"POST请求时，Content-Type 应设置为 application/json"}}),t._v(" "),t.apiBodyExample&&t.common.containsFuncArgumentPlaceholder(t.apiBodyExample)>=0?a("InfoBlock",{attrs:{type:"info",title:'"INPUT_BY_CALLER"为需要填写的参数，请根据需要进行修改'}}):t._e(),t._v(" "),t.supportCustomKwargs?a("InfoBlock",{attrs:{type:"success",title:"本函数允许传递额外的自定义函数参数"}}):t._e(),t._v(" "),t.supportFileUpload?a("InfoBlock",{attrs:{type:"success",title:'本函数支持文件上传，文件字段名为"files"'}}):t._e()],1),t._v(" "),a("el-col",{attrs:{span:2}},[a("CopyButton",{attrs:{content:t.apiBodyExample}})],1)],1):t._e(),t._v(" "),t.apiBody?[t.showGetExampleSimplified?[a("el-divider",{attrs:{"content-position":"left"}},[t._v("GET 简化形式请求")]),t._v(" "),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:22}},[t.stringParametersOnly?a("el-link",{staticClass:"api-url-with-query",attrs:{type:"primary",underline:!0,href:t.apiURLWithQueryExample_simplified,target:"_blank"}},[a("code",{domProps:{innerHTML:t._s(t.apiURLWithQueryExampleText_simplified)}})]):t._e(),t._v(" "),a("InfoBlock",{attrs:{type:t.stringParametersOnly?"info":"error",title:"此方式参数值只支持字符串，且不支持 options 参数"}})],1),t._v(" "),a("el-col",{attrs:{span:2}},[t.stringParametersOnly?a("CopyButton",{attrs:{content:t.apiURLWithQueryExample_simplified}}):t._e()],1)],1)]:t._e(),t._v(" "),t.showGetExample?[a("el-divider",{attrs:{"content-position":"left"}},[t._v("GET 标准形式请求")]),t._v(" "),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:22}},[a("el-link",{staticClass:"api-url-with-query",attrs:{type:"primary",underline:!0,href:t.apiURLWithQueryExample,target:"_blank"}},[a("code",{domProps:{innerHTML:t._s(t.apiURLWithQueryExampleText)}})]),t._v(" "),a("InfoBlock",{attrs:{type:"info",title:"kwargs 参数为 POST 方式中对 kwargs 参数进行 JSON 序列化，再进行 URL 编码后的字符串"}}),t._v(" "),a("InfoBlock",{attrs:{type:"info",title:"kwargs 参数处理代码参考：encodeURIComponent(JSON.stringify(kwargs))"}})],1),t._v(" "),a("el-col",{attrs:{span:2}},[a("CopyButton",{attrs:{content:t.apiURLWithQueryExample}})],1)],1)]:t._e(),t._v(" "),t.showGetExampleFlattened?[a("el-divider",{attrs:{"content-position":"left"}},[t._v("GET 扁平形式请求")]),t._v(" "),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:22}},[t.stringParametersOnly?a("el-link",{staticClass:"api-url-with-query",attrs:{type:"primary",underline:!0,href:t.apiURLWithQueryExample_flattened,target:"_blank"}},[a("code",{domProps:{innerHTML:t._s(t.apiURLWithQueryExampleText_flattened)}})]):t._e(),t._v(" "),a("InfoBlock",{attrs:{type:t.stringParametersOnly?"info":"error",title:"此方式参数值只支持字符串"}})],1),t._v(" "),a("el-col",{attrs:{span:2}},[t.stringParametersOnly?a("CopyButton",{attrs:{content:t.apiURLWithQueryExample_flattened}}):t._e()],1)],1)]:t._e(),t._v(" "),t.showPostExampleSimplified?[a("el-divider",{attrs:{"content-position":"left"}},[t._v("POST 简化形式请求")]),t._v(" "),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:22}},[t.stringParametersOnly?a("el-input",{attrs:{type:"textarea",readonly:"",autosize:"",resize:"none",value:t.apiCallByCurlExample_simplified}}):t._e(),t._v(" "),a("InfoBlock",{attrs:{type:t.stringParametersOnly?"info":"error",title:"此方式不支持 options 参数"}}),t._v(" "),a("InfoBlock",{attrs:{type:"info",title:'表单形式提交时，Content-Type 可以指定为 "multipart/form-data" 或 "application/x-www-form-urlencoded"，此时 Body 中参数值只支持字符串'}}),t._v(" "),a("InfoBlock",{attrs:{type:"info",title:'JSON 形式提交时，Content-Type 可以指定为 "application/json"，配合 def f(**kwargs) 形式的函数，此时 Body 可以为任意 JSON 数据'}}),t._v(" "),a("InfoBlock",{attrs:{type:"info",title:'上传文件时，Content-Type 需要指定为 "multipart/form-data"'}})],1),t._v(" "),a("el-col",{attrs:{span:2}},[t.stringParametersOnly?a("CopyButton",{attrs:{content:t.apiCallByCurlExample_simplified}}):t._e()],1)],1)]:t._e(),t._v(" "),t.showPostExample?[a("el-divider",{attrs:{"content-position":"left"}},[t._v("POST 标准形式请求")]),t._v(" "),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:22}},[a("el-input",{attrs:{type:"textarea",readonly:"",autosize:"",resize:"none",value:t.apiCallByCurlExample}}),t._v(" "),a("InfoBlock",{attrs:{type:"info",title:"此方式不支持文件上传"}})],1),t._v(" "),a("el-col",{attrs:{span:2}},[a("CopyButton",{attrs:{content:t.apiCallByCurlExample}})],1)],1)]:t._e(),t._v(" "),t.showPostExampleFlattened?[a("el-divider",{attrs:{"content-position":"left"}},[t._v("POST 扁平形式请求")]),t._v(" "),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:22}},[t.stringParametersOnly?a("el-input",{attrs:{type:"textarea",readonly:"",autosize:"",resize:"none",value:t.apiCallByCurlExample_flattened}}):t._e(),t._v(" "),a("InfoBlock",{attrs:{type:t.stringParametersOnly?"info":"error",title:"此方式参数值只支持字符串"}}),t._v(" "),a("InfoBlock",{attrs:{type:"info",title:'单纯提交数据时，Content-Type 可以指定为 "multipart/form-data" 或 "application/x-www-form-urlencoded"'}}),t._v(" "),a("InfoBlock",{attrs:{type:"info",title:'上传文件时，Content-Type 需要指定为 "multipart/form-data"'}})],1),t._v(" "),a("el-col",{attrs:{span:2}},[t.stringParametersOnly?a("CopyButton",{attrs:{content:t.apiCallByCurlExample_flattened}}):t._e()],1)],1)]:t._e()]:[a("span",{staticClass:"text-bad"},[t._v("Body内容填写存在错误，正确填写后将展示示例")])]],2)])},o=[],n=(a("e9c4"),a("ac1f"),a("1276"),a("a15b"),a("99af"),a("498a"),{name:"APIExampleDialog",components:{},watch:{callOptions:{deep:!0,handler:function(t){var e=null;try{e=JSON.parse(this.apiBodyExample)}catch(i){}if(e){for(var a in e.options=e.options||{},t)t[a]===this.DEFAULT_CALL_OPTIONS[a]?delete e.options[a]:e.options[a]=t[a];this.T.isNothing(e.options)&&delete e.options,this.apiBodyExample=JSON.stringify(e,null,2)}}}},methods:{prettyURLForHTML:function(t){if(!t)return"";try{var e=t.split("?");if(!e[1])return t;for(var a=e[1].split("&"),i=0;i<a.length;i++)a[i]=0===i?"?"+a[i]:"&"+a[i];var o=e[0]+"<br>"+a.join("<br>");return o}catch(n){return console.error(n),t}},washAPIBody:function(t){if(t=this.T.jsonCopy(t),this.T.isNothing(t))return t;if(!this.T.isNothing(t.kwargs))for(var e in t.kwargs)0!==e.indexOf("**")&&"files"!==e||delete t.kwargs[e];return this.T.isNothing(t.kwargs)&&delete t.kwargs,this.T.isNothing(t.options)&&delete t.options,t},update:function(t,e,a){for(var i in e=e||{},e.kwargs=e.kwargs||{},e.options=e.options||{},a=a||{},this.supportFileUpload=!1,this.supportCustomKwargs=!1,this.callOptions)this.callOptions[i]=this.DEFAULT_CALL_OPTIONS[i];for(var o in e.kwargs.files&&(this.supportFileUpload=this.common.isFuncArgumentPlaceholder(e.kwargs.files)),a)if(0===o.indexOf("**")){this.supportCustomKwargs=!0;break}e=this.washAPIBody(e),e=this.T.isNothing(e)?"":JSON.stringify(e,null,2),this.apiURLExample=t,this.apiBodyExample=e,this.show=!0},getAPIURLWithQueryExample:function(t,e,a){if(!this.apiBody)return null;var i=this.washAPIBody(this.apiBody);t=t||"normal",e=e||!1;var o=null,n={};switch(t){case"normal":n=i||n,o=this.T.formatURL(this.apiURLExample,{query:n});break;case"simplified":i&&i.kwargs&&(n=i.kwargs||n),o=this.T.formatURL("".concat(this.apiURLExample,"/simplified"),{query:n});break;case"flattened":if(i){if(i.kwargs)for(var s in i.kwargs)n["kwargs_".concat(s)]=i.kwargs[s];if(i.options)for(var r in i.options)n["options_".concat(r)]=i.options[r]}o=this.T.formatURL("".concat(this.apiURLExample,"/flattened"),{query:n});break}return e&&(o=this.prettyURLForHTML(o)),a&&(o=decodeURIComponent(o)),o},getAPICallByCurlPostExample:function(t){if(!this.apiBody)return null;var e=this.washAPIBody(this.apiBody);t=t||"normal";var a="",i="",o="";switch(t){case"normal":a=this.apiURLExample,i='-H "Content-Type: application/json"',this.T.isNothing(e)||(o="-d '".concat(JSON.stringify(e),"'"));break;case"simplified":if(a="".concat(this.apiURLExample,"/").concat(t),!this.T.isNothing(e.kwargs))for(var n in e.kwargs)o+=" -F ".concat(n,"=").concat(e.kwargs[n]);this.supportFileUpload?(i='-H "multipart/form-data"',o+=" -F files=@FILE_TO_UPLOAD"):i='-H "application/x-www-form-urlencoded"';break;case"flattened":if(a="".concat(this.apiURLExample,"/").concat(t),i='-H "application/x-www-form-urlencoded"',!this.T.isNothing(e.kwargs))for(var s in e.kwargs)o+=" -F kwargs_".concat(s,"=").concat(e.kwargs[s]);if(!this.T.isNothing(e.options))for(var r in e.options)o+=" -F options_".concat(r,"=").concat(e.options[r]);this.supportFileUpload&&(o+=" -F kwargs_files=@FILE_TO_UPLOAD");break}var l="curl -X POST";return i&&(l+=" ".concat(i.trim())),o&&(l+=" ".concat(o.trim())),a&&(l+=" ".concat(a.trim())),l}},computed:{DEFAULT_CALL_OPTIONS:function(){return{execMode:"sync",saveResult:!1,timeout:this.$store.getters.CONFIG("_FUNC_TASK_DEFAULT_TIMEOUT"),apiTimeout:this.$store.getters.CONFIG("_FUNC_TASK_DEFAULT_API_TIMEOUT")}},showOptions:function(){return this.showExecModeOption||this.showSaveResultOption||this.showTimeoutOption||this.showAPITimeoutOption},apiBody:function(){if(!this.apiBodyExample)return{};var t=null;try{t=JSON.parse(this.apiBodyExample)}catch(e){return null}return t},apiURLWithQueryExample:function(){return this.getAPIURLWithQueryExample("normal")},apiURLWithQueryExample_flattened:function(){return this.getAPIURLWithQueryExample("flattened")},apiURLWithQueryExample_simplified:function(){return this.getAPIURLWithQueryExample("simplified")},apiURLWithQueryExampleText:function(){return this.getAPIURLWithQueryExample("normal",!0,!0)},apiURLWithQueryExampleText_simplified:function(){return this.getAPIURLWithQueryExample("simplified",!0,!0)},apiURLWithQueryExampleText_flattened:function(){return this.getAPIURLWithQueryExample("flattened",!0,!0)},apiCallByCurlExample:function(){return this.getAPICallByCurlPostExample("normal")},apiCallByCurlExample_simplified:function(){return this.getAPICallByCurlPostExample("simplified")},apiCallByCurlExample_flattened:function(){return this.getAPICallByCurlPostExample("flattened")},stringParametersOnly:function(){if(!this.apiBody)return!1;var t=this.apiBody.kwargs||{};for(var e in t)if("string"!==typeof t[e])return!1;return!0}},props:{title:String,description:String,descriptionClass:Object,showExecModeOption:{type:Boolean,default:!1},showSaveResultOption:{type:Boolean,default:!1},showTimeoutOption:{type:Boolean,default:!1},showAPITimeoutOption:{type:Boolean,default:!1},showGetExample:{type:Boolean,default:!0},showGetExampleSimplified:{type:Boolean,default:!1},showGetExampleFlattened:{type:Boolean,default:!1},showPostExample:{type:Boolean,default:!0},showPostExampleSimplified:{type:Boolean,default:!1},showPostExampleFlattened:{type:Boolean,default:!1}},data:function(){return{show:!1,supportFileUpload:!1,supportCustomKwargs:!1,apiURLExample:null,apiBodyExample:null,funcKwargs:null,callOptions:{execMode:null,saveResult:null,timeout:null,apiTimeout:null}}}}),s=n,r=(a("9f4a"),a("2877")),l=Object(r["a"])(s,i,o,!1,null,"18b3b9af",null);e["a"]=l.exports},c7be:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("transition",{attrs:{name:"fade"}},[a("el-container",{directives:[{name:"show",rawName:"v-show",value:t.$store.state.isLoaded,expression:"$store.state.isLoaded"}],attrs:{direction:"vertical"}},[a("el-header",{attrs:{height:"60px"}},[a("h1",[a("Logo",{staticStyle:{margin:"auto 10px -8px 5px"},attrs:{type:"auto"}}),t._v("\n        函数文档\n        "),a("small",[t._v("仅限内部调用的函数")]),t._v(" "),a("span",{staticClass:"text-info title-tip"},[t._v("本文档没有翻页，按 "),a("kbd",[t._v(t._s(t.T.getSuperKeyName()))]),t._v(" + "),a("kbd",[t._v("F")]),t._v(" 开始搜索")])],1)]),t._v(" "),a("el-main",{staticClass:"common-table-container"},[a("el-table",{staticClass:"common-table",attrs:{height:"100%",data:t.data}},[a("el-table-column",{attrs:{label:"函数"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("FuncInfo",{attrs:{id:e.row.id,definition:e.row.definition,title:e.row.title}}),t._v(" "),t.T.isNothing(e.row.category)&&t.T.isNothing(e.row.integration)&&t.T.isNothing(e.row.tagsJSON)?t._e():a("div",[t.T.isNothing(e.row.category)?t._e():[a("span",{staticClass:"text-info"},[t._v("　分类:")]),t._v(" "),a("el-tag",{attrs:{size:"mini"}},[a("code",[t._v(t._s(e.row.category))])])],t._v(" "),t.T.isNothing(e.row.integration)?t._e():[a("br"),t._v(" "),a("span",{staticClass:"text-info"},[t._v("　集成:")]),t._v(" "),a("el-tag",{attrs:{size:"mini",type:"success"}},[t.C.FUNC_INTEGRATION_MAP.get(e.row.integration)?a("code",[t._v(t._s(t.C.FUNC_INTEGRATION_MAP.get(e.row.integration).name))]):a("code",[t._v(t._s(e.row.integration))])])],t._v(" "),t.T.isNothing(e.row.tagsJSON)?t._e():[a("br"),t._v(" "),a("span",{staticClass:"text-info"},[t._v("　标签:")]),t._v(" "),t._l(e.row.tagsJSON,(function(e){return a("el-tag",{key:e,attrs:{size:"mini",type:"info"}},[a("code",[t._v(t._s(e))])])}))]],2)]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"函数文档"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("pre",{staticClass:"func-doc"},[t._v(t._s(t.T.limitLines(e.row.description,10)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"right",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-link",{on:{click:function(a){return t.showAPI(e.row)}}},[t._v("API调用示例")])]}}])})],1)],1),t._v(" "),a("APIExampleDialog",{ref:"apiExampleDialog",attrs:{description:"直接调用函数仅支持使用POST方式通过内部接口调用，不允许公开调用",descriptionClass:{"text-bad":!0},showExecModeOption:!0,showSaveResultOption:!0,showAPITimeoutOption:!0,showPostExample:!0,showGetExample:!1}})],1)],1)},o=[],n=a("1da1"),s=(a("96cf"),a("b3fd")),r={name:"FuncDoc",components:{APIExampleDialog:s["a"]},watch:{$route:{immediate:!0,handler:function(t,e){var a=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,a.loadData();case 2:case"end":return t.stop()}}),t)})))()}}},methods:{loadData:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.T.callAPI_get("/api/v1/func-list");case 2:if(a=e.sent,a.ok){e.next=5;break}return e.abrupt("return");case 5:t.data=a.data,t.$store.commit("updateLoadStatus",!0);case 7:case"end":return e.stop()}}),e)})))()},showAPI:function(t){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var i,o,n,s,r,l;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,e.T.callAPI_getOne("/api/v1/funcs/do/list",t.id);case 2:if(i=a.sent,i.ok){a.next=5;break}return a.abrupt("return");case 5:for(r in o=i.data.kwargsJSON,n=e.T.formatURL("/api/v1/func/:funcId",{baseURL:e.$store.getters.CONFIG("WEB_INNER_BASE_URL"),params:{funcId:t.id}}),s={},t.kwargsJSON)t.kwargsJSON.hasOwnProperty(r)&&(s[r]=e.$store.getters.CONFIG("_FUNC_ARGUMENT_PLACEHOLDER_LIST")[0]);l={kwargs:s},e.$refs.apiExampleDialog.update(n,l,o);case 11:case"end":return a.stop()}}),a)})))()}},computed:{},props:{},data:function(){return{data:[]}}},l=r,p=(a("e302"),a("2877")),c=Object(p["a"])(l,i,o,!1,null,"6dc42a5c",null);e["default"]=c.exports},d860:function(t,e,a){},e302:function(t,e,a){"use strict";a("3ed2")}}]);