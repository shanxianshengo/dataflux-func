(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-838685b6"],{"131a":function(e,t){e.exports=function(e){e.options.__i18n=e.options.__i18n||[],e.options.__i18n.push('{"zh-CN":{"File Tool":"文件管理器","Go Top":"返回顶层","Go Up":"向上","File size limit":"文件大小限制","Path":"路径","Create time":"创建时间","Update time":"更新时间","Package":"Wheel包","Mirror":"PIP镜像","File uploaded":"文件已上传","Wheel package installed: {name}":"Wheel包已安装：{name}","Please input destination path":"请输入目标路径","File <code class=\\"text-main\\">{name}</code> already existed, please input a new name":"文件 <code class=\\"text-main\\">{name}</code> 已经存在，请输入新文件名","Install Wheel package":"安装Wheel包","Are you sure you want to delete the content?":"是否确定删除此内容？","Delete file":"删除文件","File already existed":"文件已经存在","File too large (size limit: {size})":"文件过大（大小限制：{size}）","Uploading {filename}":"正在上传 {filename}","Processing...":"正在处理..."}}'),delete e.options._Ctor}},3258:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("transition",{attrs:{name:"fade"}},[a("el-container",{directives:[{name:"show",rawName:"v-show",value:e.$store.state.isLoaded,expression:"$store.state.isLoaded"},{name:"loading",rawName:"v-loading.fullscreen.lock",value:e.fullScreenLoading,expression:"fullScreenLoading",modifiers:{fullscreen:!0,lock:!0}}],attrs:{direction:"vertical","element-loading-spinner":"el-icon-loading","element-loading-text":e.progressTip||e.$t("Processing...")}},[a("el-header",{attrs:{height:"60px"}},[a("h1",[e._v("\n        "+e._s(e.$t("File Tool"))+"\n\n        　\n        "),a("el-tooltip",{attrs:{content:e.$t("Go Up")}},[a("el-button",{attrs:{disabled:"/"===e.currentFolder,size:"small"},on:{click:function(t){return e.enterFolder("..")}}},[a("i",{staticClass:"fa fa-fw fa-arrow-up"})])],1),e._v(" "),a("el-tooltip",{attrs:{content:e.$t("Refresh")}},[a("el-button",{staticClass:"fix-compact-button",attrs:{size:"small"},on:{click:function(t){return e.loadData({isRefresh:!0})}}},[a("i",{staticClass:"fa fa-fw fa-refresh"})])],1),e._v("\n\n        　\n        "),a("el-popover",{attrs:{placement:"bottom",width:"240"},model:{value:e.showMkdirPopover,callback:function(t){e.showMkdirPopover=t},expression:"showMkdirPopover"}},[a("div",{staticClass:"popover-input"},[a("el-input",{ref:"mkdirName",attrs:{size:"small"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.resourceOperation(e.mkdirName,"mkdir")}},model:{value:e.mkdirName,callback:function(t){e.mkdirName=t},expression:"mkdirName"}}),e._v(" "),a("el-button",{attrs:{type:"text"},on:{click:function(t){return e.resourceOperation(e.mkdirName,"mkdir")}}},[e._v(e._s(e.$t("Add")))])],1),e._v(" "),a("el-button",{attrs:{slot:"reference",size:"small"},slot:"reference"},[a("i",{staticClass:"fa fa-fw fa-plus"}),e._v("\n            "+e._s(e.$t("Folder"))+"\n          ")])],1),e._v(" "),a("el-tooltip",{attrs:{content:""+e.$t("File size limit")+e.$t(":")+" "+e.T.byteSizeHuman(e.$store.getters.CONFIG("_EX_UPLOAD_RESOURCE_FILE_SIZE_LIMIT")),placement:"bottom"}},[a("el-upload",{ref:"upload",staticClass:"upload-button",attrs:{limit:2,multiple:!1,"auto-upload":!0,"show-file-list":!1,"http-request":e.handleUpload,"on-change":e.onUploadFileChange,action:""}},[a("el-button",{attrs:{size:"small"}},[a("i",{staticClass:"fa fa-fw fa-cloud-upload"}),e._v("\n              "+e._s(e.$t("Upload"))+"\n            ")])],1)],1),e._v("\n\n        　\n        "),"/"!==e.currentFolder?a("code",{staticClass:"resource-navi"},[a("small",[e._v(e._s(e.$t("Path"))+e._s(e.$t(":")))]),e._v(" "),a("el-button",{attrs:{size:"small"},on:{click:function(t){return e.enterFolder()}}},[a("i",{staticClass:"fa fa-fw fa-home"})]),e._l(e.currentFolder.slice(1).split("/"),(function(t,r){return[a("div",{staticClass:"path-sep"},[a("i",{staticClass:"fa fa-angle-right"})]),a("el-button",{key:r,attrs:{size:"small"},on:{click:function(t){e.enterFolder(e.currentFolder.split("/").slice(0,r+2).join("/"),!0)}}},[e._v("\n              "+e._s(t)+"\n            ")])]}))],2):e._e(),e._v(" "),a("div",{staticClass:"header-control"})],1)]),e._v(" "),a("el-main",{staticClass:"common-table-container"},[a("el-table",{staticClass:"common-table",attrs:{height:"100%",data:e.files}},[a("el-table-column",{attrs:{label:e.$t("Name"),sortable:"","sort-by":"name"},scopedSlots:e._u([{key:"default",fn:function(t){return["folder"===t.row.type?a("el-button",{attrs:{type:"text"},on:{click:function(a){return e.enterFolder(t.row.name)}}},[a("i",{class:"fa fa-fw fa-"+t.row.icon}),e._v(" "),a("code",[e._v(e._s(t.row.name)+"/")])]):[a("i",{class:"fa fa-fw fa-"+t.row.icon}),e._v(" "),a("code",[e._v(e._s(t.row.name))])]]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Create time"),sortable:"","sort-by":"createTime",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("datetime")(t.row.createTime)))]),e._v(" "),a("br"),e._v(" "),a("span",{staticClass:"text-info"},[e._v(e._s(e._f("fromNow")(t.row.createTime)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Update time"),sortable:"","sort-by":"updateTime",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("datetime")(t.row.updateTime)))]),e._v(" "),a("br"),e._v(" "),a("span",{staticClass:"text-info"},[e._v(e._s(e._f("fromNow")(t.row.updateTime)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Size"),sortable:"","sort-by":"size",align:"right",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.size?a("code",[e._v(e._s(t.row.sizeHuman))]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"right",width:"260","class-name":"fix-list-button"},scopedSlots:e._u([{key:"default",fn:function(t){return["folder"===t.row.type?a("el-button",{attrs:{type:"text"},on:{click:function(a){return e.enterFolder(t.row.name)}}},[e._v(e._s(e.$t("Enter")))]):"file"===t.row.type?[e.previewExtMap[t.row.ext]?a("el-link",{attrs:{type:"primary",href:t.row.previewURL,underline:!1,target:"_blank"}},[e._v(e._s(e.$t("Open")))]):e._e(),e._v(" "),"whl"===t.row.ext?a("el-button",{attrs:{type:"text"},on:{click:function(a){return e.openInstallWheel(t.row.name)}}},[e._v(e._s(e.$t("Install")))]):e._e(),e._v(" "),a("el-link",{attrs:{type:"primary",href:t.row.downloadURL,download:t.row.name,underline:!1,target:"_blank"}},[e._v(e._s(e.$t("Download")))])]:e._e(),e._v(" "),a("el-dropdown",{on:{command:e.resourceOperationCmd}},[a("el-button",{attrs:{type:"text"}},[e._v("\n                "+e._s(e.$t("More"))),a("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),e._v(" "),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[e.zipExtMap[t.row.ext]?a("el-dropdown-item",{attrs:{command:{data:t.row,operation:"unzip"}}},[e._v(e._s(e.$t("Unzip")))]):a("el-dropdown-item",{attrs:{command:{data:t.row,operation:"zip"}}},[e._v(e._s(e.$t("Zip")))]),e._v(" "),a("el-dropdown-item",{attrs:{command:{data:t.row,operation:"cp"}}},[e._v(e._s(e.$t("Copy")))]),e._v(" "),a("el-dropdown-item",{attrs:{command:{data:t.row,operation:"mv"}}},[e._v(e._s(e.$t("Move")))]),e._v(" "),a("el-dropdown-item",{attrs:{command:{data:t.row,operation:"rm"}}},[e._v(e._s(e.$t("Delete")))])],1)],1)]}}])})],1)],1),e._v(" "),a("el-dialog",{attrs:{title:e.$t("Install Wheel package"),width:"30%",visible:e.showInstallWheel},on:{"update:visible":function(t){e.showInstallWheel=t}}},[a("div",[a("el-form",{ref:"form",attrs:{"label-width":"80px"}},[a("el-form-item",{attrs:{label:e.$t("Package")}},[a("el-input",{attrs:{disabled:!0,value:e.wheelToInstall}})],1),e._v(" "),a("el-form-item",{attrs:{label:e.$t("Mirror")}},[a("el-select",{model:{value:e.pypiMirror,callback:function(t){e.pypiMirror=t},expression:"pypiMirror"}},e._l(e.C.PIP_MIRROR,(function(e){return a("el-option",{key:e.key,attrs:{label:e.name,value:e.value}})})),1)],1)],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.showInstallWheel=!1}}},[e._v(e._s(e.$t("Cancel")))]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.installWheel}},[e._v(e._s(e.$t("Install")))])],1)])],1)],1)},n=[],o=a("1da1"),i=(a("d3b7"),a("159b"),a("b0c0"),a("ac1f"),a("1276"),a("4e82"),a("a15b"),a("99af"),a("b680"),a("a434"),a("96cf"),a("fb6a"),47),l=92,s=46;function c(e){return e===i||e===l}function u(e){return e===i}function d(e){if(0===e.length)return".";var t=e.charCodeAt(0)===i,a=e.charCodeAt(e.length-1)===i;return e=p(e,!t,"/",u),0!==e.length||t||(e="."),e.length>0&&a&&(e+="/"),t?"/"+e:e}function p(e,t,a,r){for(var n,o="",l=0,c=-1,u=0,d=0;d<=e.length;++d){if(d<e.length)n=e.charCodeAt(d);else{if(r(n))break;n=i}if(r(n)){if(c===d-1||1===u);else if(c!==d-1&&2===u){if(o.length<2||2!==l||o.charCodeAt(o.length-1)!==s||o.charCodeAt(o.length-2)!==s)if(o.length>2){var p=o.lastIndexOf(a);if(p!==o.length-1){-1===p?(o="",l=0):(o=o.slice(0,p),l=o.length-1-o.lastIndexOf(a)),c=d,u=0;continue}}else if(2===o.length||1===o.length){o="",l=0,c=d,u=0;continue}t&&(o.length>0?o+="".concat(a,".."):o="..",l=2)}else o.length>0?o+=a+e.slice(c+1,d):o=e.slice(c+1,d),l=d-c-1;c=d,u=0}else n===s&&-1!==u?++u:u=-1}return o}function f(){if(0===arguments.length)return".";for(var e,t,a=arguments[0].indexOf("/")>-1?"/":"\\",r=0;r<arguments.length;++r){var n=arguments[r];n.length>0&&(void 0===e?e=t=n:e+=a+n)}if(void 0===e)return".";var o=!0,i=0;if(c(t.charCodeAt(0))){++i;var l=t.length;l>1&&c(t.charCodeAt(1))&&(++i,l>2&&(c(t.charCodeAt(2))?++i:o=!1))}if(o){for(;i<e.length;++i)if(!c(e.charCodeAt(i)))break;i>=2&&(e=a+e.slice(i))}return d(e)}var m={name:"FileManager",components:{},watch:{$route:{immediate:!0,handler:function(e,t){var a=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,a.loadData();case 2:case"end":return e.stop()}}),e)})))()}},showMkdirPopover:function(e){var t=this;e?this.$nextTick((function(){t.$refs.mkdirName.focus()})):this.mkdirName=""}},methods:{loadData:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){var r,n,o,i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return e=e||{},e.isRefresh&&t.$store.commit("updateLoadStatus",!1),r=t.dataFilter=t.T.createListQuery(),a.next=6,t.T.callAPI_get("/api/v1/resources/dir",{query:r});case 6:if(n=a.sent,n.ok){a.next=9;break}return a.abrupt("return");case 9:o=n.data,i={},o.forEach((function(e){switch(i[e.name]=!0,e.type){case"folder":e.icon="folder-o";break;case"file":e.icon="file-o",e.ext=e.name.split(".").pop(),e.size&&(e.sizeHuman=t.T.byteSizeHuman(e.size)),e.previewURL=t.T.formatURL("/api/v1/resources",{baseURL:!0,auth:!0,query:{preview:!0,filePath:t.getPath(e.name)}}),e.downloadURL=t.T.formatURL("/api/v1/resources",{baseURL:!0,auth:!0,query:{filePath:t.getPath(e.name)}});break}switch(e.ext){case"zip":case"rar":case"7z":case"tar":case"bz":case"gz":e.icon="file-archive-o";break;case"htm":case"html":case"js":case"css":case"yaml":case"json":case"py":e.icon="file-code-o";break;case"jpg":case"jpeg":case"png":case"gif":case"bmp":e.icon="file-image-o";break;case"pdf":e.icon="file-pdf-o";break;case"txt":case"csv":case"md":case"markdown":e.icon="file-text-o";break;case"avi":case"mp4":case"mkv":e.icon="file-video-o";break;case"doc":case"docx":e.icon="file-word-o";break;case"xls":case"xlsx":e.icon="file-excel-o";break;case"ppt":case"pptx":e.icon="file-powerpoint-o";break}})),o.sort((function(e,t){return e.type!==t.type?"folder"===e.type?-1:1:e.name!==t.name?e.name<t.name?-1:1:0})),t.files=o,t.fileNameMap=i,t.$store.commit("updateLoadStatus",!0);case 16:case"end":return a.stop()}}),a)})))()},getPath:function(e){return f(this.currentFolder,e)},enterFolder:function(e,t){this.dataFilter.folder=e?t?e:this.getPath(e):"/",this.T.changePageFilter(this.dataFilter)},resourceOperationCmd:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){var r,n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(e){a.next=2;break}return a.abrupt("return");case 2:return r=e.data.name,n=e.operation,a.next=6,t.resourceOperation(r,n);case 6:return a.abrupt("return",a.sent);case 7:case"end":return a.stop()}}),a)})))()},resourceOperation:function(e,t){var a=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){var n,o,i;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:n=null,r.t0=t,r.next="cp"===r.t0?4:"mv"===r.t0?10:"rm"===r.t0?16:21;break;case 4:return r.next=6,a.T.prompt(a.$t("Please input destination path"),e);case 6:if(n=r.sent,n){r.next=9;break}return r.abrupt("return");case 9:return r.abrupt("break",21);case 10:return r.next=12,a.T.prompt(a.$t("Please input destination path"),"./".concat(e));case 12:if(n=r.sent,n){r.next=15;break}return r.abrupt("return");case 15:return r.abrupt("break",21);case 16:return r.next=18,a.T.confirm(a.$t("Are you sure you want to delete the content?"));case 18:if(r.sent){r.next=20;break}return r.abrupt("return");case 20:return r.abrupt("break",21);case 21:return o=setTimeout((function(){a.fullScreenLoading=!0}),200),r.next=24,a.T.callAPI("post","/api/v1/resources/operate",{body:{targetPath:a.getPath(e),operation:t,operationArgument:n}});case 24:if(i=r.sent,clearTimeout(o),a.fullScreenLoading=!1,i.ok){r.next=29;break}return r.abrupt("return",a.loadData());case 29:r.t1=t,r.next="mkdir"===r.t1?32:37;break;case 32:return a.showMkdirPopover=!1,a.mkdirName="",r.next=36,a.enterFolder(e);case 36:return r.abrupt("break",40);case 37:return r.next=39,a.loadData();case 39:return r.abrupt("break",40);case 40:case"end":return r.stop()}}),r)})))()},handleUpload:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){var r,n,o,i,l,s,c,u,d,p,f,m,h,v,b;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(r=t.$store.getters.CONFIG("_EX_UPLOAD_RESOURCE_FILE_SIZE_LIMIT"),!(e.file.size>r)){a.next=4;break}return n=t.T.byteSizeHuman(r),a.abrupt("return",t.T.alert(t.$t("File too large (size limit: {size})",{size:n})));case 4:if(o=e.file.name,i=null,!t.fileNameMap[o]){a.next=32;break}l=null,a.prev=8,s=o.split("."),c="",s.length>1&&(c=".".concat(s.pop())),u=s.join("."),d=null,p=2;case 15:if(d="".concat(u,"-").concat(p).concat(c),t.fileNameMap[d]){a.next=19;break}return a.abrupt("break",22);case 19:p++,a.next=15;break;case 22:return a.next=24,t.$prompt(t.$t('File <code class="text-main">{name}</code> already existed, please input a new name',{name:o}),t.$t("Upload"),{customClass:"uploadRename",inputValue:d,dangerouslyUseHTMLString:!0,closeOnClickModal:!1,confirmButtonText:t.$t("Upload"),cancelButtonText:t.$t("Cancel"),inputValidator:function(e){if(t.fileNameMap[e])return t.$t("File already existed")}});case 24:l=a.sent,a.next=31;break;case 27:return a.prev=27,a.t0=a["catch"](8),t.$refs.upload.clearFiles(),a.abrupt("return");case 31:i=l.value;case 32:return f=new FormData,f.append("files",e.file),f.append("folder",t.dataFilter.folder||"."),i&&f.append("rename",i),m=setTimeout((function(){t.fullScreenLoading=!0}),200),h=null,v=null,b=t.T.throttle((function(e){t.progressTip=e}),500),a.next=42,t.T.callAPI("post","/api/v1/resources",{body:f,alert:{okMessage:t.$t("File uploaded")},onUploadProgress:function(e){var a="".concat(t.$t("Uploading {filename}",{filename:i||o}));if(h&&v){var r=(e.loaded/e.total*100).toFixed(2),n=(e.loaded-v)/(e.timeStamp-h)*1e3;a+=" (".concat(r,"%, ").concat(t.T.byteSizeHuman(e.loaded),"/").concat(t.T.byteSizeHuman(e.total),", ").concat(t.T.byteSizeHuman(n),"/s)")}h=e.timeStamp,v=e.loaded,b(a)}});case 42:return a.sent,clearTimeout(m),t.fullScreenLoading=!1,t.progressTip="",a.next=48,t.loadData();case 48:t.$refs.upload.clearFiles();case 49:case"end":return a.stop()}}),a,null,[[8,27]])})))()},onUploadFileChange:function(e,t){t.length>1&&t.splice(0,1)},openInstallWheel:function(e){this.wheelToInstall=e,this.pypiMirror=this.C.PIP_MIRROR_DEFAULT.value,this.showInstallWheel=!0},installWheel:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=e.wheelToInstall,r=setTimeout((function(){e.fullScreenLoading=!0}),200),t.next=4,e.T.callAPI("post","/api/v1/python-packages/install",{body:{mirror:e.pypiMirror,pkg:e.getPath(a)},alert:{okMessage:e.$t("Wheel package installed: {name}",{name:a})}});case 4:t.sent,clearTimeout(r),e.fullScreenLoading=!1,e.showInstallWheel=!1;case 8:case"end":return t.stop()}}),t)})))()}},computed:{previewExtMap:function(){return{jpg:!0,jpeg:!0,png:!0,bmp:!0,gif:!0,mp4:!0,pdf:!0,txt:!0,json:!0,md:!0}},zipExtMap:function(){return{zip:!0,tar:!0,gz:!0,bz:!0,"7z":!0}},currentFolder:function(){return this.dataFilter.folder||"/"}},props:{},data:function(){var e=this.T.createListQuery();return{files:[],fileNameMap:{},showMkdirPopover:!1,mkdirName:"",showInstallWheel:!1,wheelToInstall:"",pypiMirror:"",fullScreenLoading:!1,progressTip:"",dataFilter:{folder:e.folder}}}},h=m,v=(a("a6ad"),a("eb89"),a("2877")),b=a("8fd5"),_=Object(v["a"])(h,r,n,!1,null,"e2442036",null);"function"===typeof b["default"]&&Object(b["default"])(_);t["default"]=_.exports},"54a2":function(e,t,a){},"8fd5":function(e,t,a){"use strict";var r=a("131a"),n=a.n(r);t["default"]=n.a},a434:function(e,t,a){"use strict";var r=a("23e7"),n=a("da84"),o=a("23cb"),i=a("5926"),l=a("07fa"),s=a("7b0b"),c=a("65f0"),u=a("8418"),d=a("1dde"),p=d("splice"),f=n.TypeError,m=Math.max,h=Math.min,v=9007199254740991,b="Maximum allowed length exceeded";r({target:"Array",proto:!0,forced:!p},{splice:function(e,t){var a,r,n,d,p,_,w=s(this),g=l(w),k=o(e,g),x=arguments.length;if(0===x?a=r=0:1===x?(a=0,r=g-k):(a=x-2,r=h(m(i(t),0),g-k)),g+a-r>v)throw f(b);for(n=c(w,r),d=0;d<r;d++)p=k+d,p in w&&u(n,d,w[p]);if(n.length=r,a<r){for(d=k;d<g-r;d++)p=d+r,_=d+a,p in w?w[_]=w[p]:delete w[_];for(d=g;d>g-r+a;d--)delete w[d-1]}else if(a>r)for(d=g-r;d>k;d--)p=d+r-1,_=d+a-1,p in w?w[_]=w[p]:delete w[_];for(d=0;d<a;d++)w[d+k]=arguments[d+2];return w.length=g-r+a,n}})},a6ad:function(e,t,a){"use strict";a("ece2")},eb89:function(e,t,a){"use strict";a("54a2")},ece2:function(e,t,a){}}]);