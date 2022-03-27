<!-- 过滤行 -->
<template>
  <DxFilterRow
    :applyFilter="applyFilter"
    :applyFilterText="applyFilterText"
    :betweenEndText="betweenEndText"
    :betweenStartText="betweenStartText"
    :resetOperationText="resetOperationText"
    :showAllText="showAllText"
    :showOperationChooser="showOperationChooser"
    :visible="visible"
  />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { DxFilterRow } from 'devextreme-vue/data-grid';
  // import type { PropType } from 'vue';
  import { propTypes } from '/@/utils/propTypes';
  export default defineComponent({
    name: 'FilterRow',
    components: { DxFilterRow },
    props: {
      applyFilter: propTypes.oneOf(['auto', 'onClick']).def('auto'), // 指定何时应用过滤器。
      applyFilterText: { type: String, default: 'Apply filter' }, // 指定当用户在应用过滤器的按钮上暂停时显示的提示文本。
      betweenEndText: { type: String, default: 'End' }, // 为编辑器指定一个占位符，该占位符在用户选择“介于”过滤器操作时指定范围的结尾。 默认值|ENd
      betweenStartText: { type: String, default: 'Start' }, // 为编辑器指定一个占位符，该占位符在用户选择“介于”过滤器操作时指定范围的开始。 默认值|Start
      // operationDescriptions: {},
      resetOperationText: { type: String, default: 'Reset' }, // 在过滤器列表上指定用于重置操作的文本。
      showAllText: { type: String, default: '(All)' }, // 为清除已应用的过滤器的项目指定文本。仅在过滤器行的单元格包含选择框时使用。
      showOperationChooser: propTypes.bool.def(true), // 指定打开过滤器列表的图标是否可见。
      visible: propTypes.bool.def(true), // 指定过滤器行是否可见。
    },
    setup(props) {
      console.log('FilterRow=>props', props);
      return {};
    },
  });
</script>
