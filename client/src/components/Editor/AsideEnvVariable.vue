<i18n locale="zh-CN" lang="yaml">
Jump to...    : 跳转到...
Refresh       : 刷新列表
Add ENV       : 添加环境变量
Setup         : 配置
Example       : 示例
Copy example  : 复制示例
Copy {name} ID: 复制{name}ID

ENV Variable pinned  : 环境变量已置顶
ENV Variable unpinned: 环境变量已取消
</i18n>

<template>
  <div id="aside-env-variable-content">
    <el-select class="jump-to-select"
      :placeholder="$t('Jump to...')"
      :no-data-text="$t('No Data')"
      size="small"
      :filterable="true"
      :clearable="true"
      :filter-method="doFilter"
      v-model="selectFilterText">
      <el-option
        v-for="item in selectShowOptions"
        :key="item.id"
        :label="item.label"
        :value="item.id">
        <span class="select-item-name">
          {{ item.label }}
        </span>
        <code class="select-item-id">ID: {{ item.id }}</code>
      </el-option>
    </el-select>

    <el-tree class="aside-tree"
      v-loading="loading"
      :data="data"
      :highlight-current="true"
      :indent="10"
      node-key="id"
      v-on:current-change="onSelectNode"
      ref="tree">

      <span
        slot-scope="{node, data}"
        class="aside-tree-node"
        :entry-id="data.id"
        @click="openEntity(node, data)">

        <!-- 菜单 -->
        <el-popover
          placement="right-start"
          trigger="hover"
          popper-class="aside-tip"
          :disabled="!!!data.id"
          :value="showPopoverId === data.id">

          <!-- 基本信息 -->
          <div class="aside-tree-node-description">
            <CopyButton :content="data.id" tip-placement="left"></CopyButton>
            ID{{ $t(':') }}<code class="text-code">{{ data.id }}</code>

            <pre v-if="data.description">{{ data.description }}</pre>
          </div>

          <!-- 示例代码 -->
          <template v-if="data.sampleCode">
            <div class="aside-tree-node-sample-code">
              <CopyButton v-if="data.sampleCode" :content="data.sampleCode" tip-placement="left"></CopyButton>
              {{ $t('Example') }}{{ $t(':') }}

              <pre>{{ data.sampleCode }}</pre>
            </div>
          </template>

          <!-- 操作 -->
          <br>
          <el-button-group>
            <!-- 置顶 -->
            <el-button
              size="small"
              @click="pinData(data.type, data.id, !data.isPinned)">
              <i class="fa fa-fw" :class="[data.isPinned ? 'fa-thumb-tack fa-rotate-270' : 'fa-thumb-tack']"></i>
              {{ data.isPinned ? $t('Unpin') : $t('Pin') }}
            </el-button>

            <!-- 配置/查看 -->
            <el-button
              size="small"
              @click="openEntity(node, data, 'setup')">
              <i class="fa fa-fw fa-wrench"></i>
              {{ $t('Setup') }}
            </el-button>
          </el-button-group>

          <div slot="reference" class="aside-item">
            <!-- 项目内容 -->
            <span :class="{'text-bad': data.isPinned}">
              <el-link v-if="data.type === 'refresh'" type="primary">
                <i class="fa fa-fw fa-refresh"></i> {{ $t('Refresh') }}
              </el-link>
              <el-link v-else-if="data.type === 'addEnvVariable'" type="primary">
                <i class="fa fa-fw fa-plus"></i> {{ $t('Add ENV') }}
              </el-link>
              <div v-else>
                <span>{{ node.label }}</span>
              </div>
            </span>

            <!-- 状态图标 -->
            <div>
              <el-tooltip effect="dark" :content="$t('Pinned')" placement="top" :enterable="false">
                <i class="fa fa-fw text-bad" :class="[ data.isPinned ? 'fa-thumb-tack':'' ]"></i>
              </el-tooltip>
            </div>
          </div>
        </el-popover>
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  name: 'AsideEnvVariable',
  components: {
  },
  watch: {
    $route() {
      this.showPopoverId = null;
    },
    selectFilterText(val) {
      if (!val) return;
      if (!this.$refs.tree) return;

      let node = this.$refs.tree.getNode(val);

      this.onSelectNode(node.data);
    },
    '$store.state.envVariableListSyncTime': function() {
      this.loadData();
    },
  },
  methods: {
    doFilter(q) {
      q = (q || '').trim();
      if (!q) {
        this.selectShowOptions = this.selectOptions.filter(x => x.type === 'scriptSet');
      } else {
        this.selectShowOptions = this.selectOptions.filter(x => x.searchTEXT.indexOf(q) >= 0);
      }
    },
    onSelectNode(data, node) {
      if (!data) return;
      if (!this.$refs.tree) return;

      this.$nextTick(() => {
        var entryId = data.id || data;
        if (!entryId) return;

        // 选中
        this.$refs.tree.setCurrentKey(entryId);

        // 滚动到目标位置
        let $asideContent = document.getElementById('aside-env-variable-content');
        let $target = document.querySelector(`[entry-id="${entryId}"]`);

        let scrollTop = 0;
        let topPadding = 35;
        if ($asideContent.scrollTop + topPadding > $target.offsetTop) {
          scrollTop = $target.offsetTop - topPadding;
        } else if ($asideContent.scrollTop + $asideContent.offsetHeight < $target.offsetTop) {
          scrollTop = $target.offsetTop - $asideContent.offsetHeight + $target.offsetHeight;
        } else {
          return;
        }
        $asideContent.scrollTo({ top: scrollTop, behavior: 'smooth' });
      });
    },
    async loadData() {
      this.loading = true;

      let apiRes = await this.T.callAPI_getAll('/api/v1/env-variables/do/list', {
        query: { fields: ['id', 'title', 'description', 'isPinned', 'pinTime'] },
      });
      if (!apiRes.ok) return;

      let treeData = [];
      window._DFF_envVariableIds = [];
      apiRes.data.forEach(d => {
        window._DFF_envVariableIds.push(d.id);

        // 缩减描述行数
        d.description = this.T.limitLines(d.description);

        // 示例代码
        let sampleCode = `${d.id} = DFF.ENV('${d.id}')`

        // 创建数据节点
        treeData.push({
          id        : d.id,
          label     : d.title || d.id,
          type      : 'envVariable',
          isPinned  : d.isPinned,
          pinTime   : d.pinTime,
          searchTEXT: `${d.title} ${d.id}`,

          title      : d.title,
          description: d.description,
          sampleCode : sampleCode,
        });
      });
      treeData.sort(this.T.asideItemSorter);
      treeData.unshift({type: 'addEnvVariable'});
      treeData.unshift({type: 'refresh'});

      // 生成选择器选项
      let selectOptions = treeData.filter(x => x.type === 'envVariable');

      // 加载数据
      this.loading           = false;
      this.data              = treeData;
      this.selectOptions     = selectOptions;
      this.selectShowOptions = selectOptions;
    },
    async pinData(dataType, dataId, isPinned) {
      let apiPath   = null;
      let okMessage = null;
      switch(dataType) {
        case 'envVariable':
          apiPath   = '/api/v1/env-variables/:id/do/modify';
          okMessage = isPinned
                    ? this.$t('ENV Variable pinned')
                    : this.$t('ENV Variable unpinned');
          break;

        default:
          return;
      }
      let apiRes = await this.T.callAPI('post', apiPath, {
        params: { id: dataId },
        body  : { data: { isPinned: isPinned } },
        alert : { okMessage: okMessage },
      });
      if (!apiRes.ok) return;

      this.$store.commit('updateEnvVariableListSyncTime');
    },
    openEntity(node, data, target) {
      switch(data.type) {
        // 刷新
        case 'refresh':
          this.loadData();
          break;

        // 「添加环境变量」节点
        case 'addEnvVariable':
          this.$router.push({
            name: 'env-variable-add',
          });
          break;

        // 环境变量节点
        case 'envVariable':
          this.$router.push({
            name  : 'env-variable-setup',
            params: {id: data.id},
          })
          break;

        default:
          console.error(`Unexcepted data type: ${data.type}`);
          break;
      }

      this.onSelectNode(data);
    },
  },
  props: {
  },
  data() {
    return {
      loading: false,
      data   : [],

      selectFilterText : '',
      selectOptions    : [],
      selectShowOptions: [],

      showPopoverId: null,
    };
  },
  created() {
    this.loadData();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.jump-to-select {
  position: absolute;
  left: 5px;
  right: 9px;
  z-index: 9;
}
.select-item-name {
  float: left;
}
.select-item-id {
  float: right;
  padding-left: 30px;
  font-size: 12px;
}

.aside-tree {
  padding-top: 35px;
}
.aside-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  padding-right: 8px;
  height: 31px;
}
.aside-tree-node i.fa {
  font-size: 14px;
}
.aside-tip pre {
  padding: 0 0 0 10px;
  margin: 0;
  font-size: 14px;
}
.aside-tree-node-description {

}
.aside-tree-node-sample-code {
  padding-top: 10px;
  text-align: left;
}

.aside-tree-node > span {
  display: block;
  width: 100%;
}
.aside-item {
  height: 31px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
