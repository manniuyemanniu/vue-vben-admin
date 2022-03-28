<template>
  <div class="devextreme-wapper" ref="wapperRef">
    <transition>
      <!-- 正文 -->
      <!-- <DxDataGrid
        ref="dataGridRefKey"
        class="devextreme-wapper-dataGrid"
        :show-borders="true"
        :dataSource="dataSource"
        :columns="columns"
        :columnMinWidth="150"
        :columnAutoWidth="true"
        :remote-operations="true"
        :allow-column-reordering="true"
        :allow-column-resizing="true"
        :remoteOperations="remoteOperations"
        :filterRow="filterRow"
        :headerFilter="headerFilter"
        :scrolling="scrolling"
        :cacheEnabled="true"
        :disabled="disabled"
        :selection="selection"
        :showColumnLines="showColumnLines"
        :showRowLines="showRowLines"
        :visible="visible"
        :width="width"
        :paging="paging"
        :pager="pager"
      /> -->

      <!-- 通过v-bing来转化定义props等数据 -->
      <DxDataGrid ref="dataGridRefKey" class="devextreme-wapper-dataGrid" v-bind="getBindValues" />
    </transition>
    <DxSelectBox
      v-model="selectPage"
      class="devextreme-wapper-selectBox"
      :items="pager.allowedPageSizes"
      :onValueChanged="onValueChanged"
    />
  </div>
</template>

<script lang="ts">
  import {
    computed,
    defineComponent,
    onMounted,
    reactive,
    ref,
    unref,
    // isReactive,
    watchEffect,
  } from 'vue';
  import { datagridProps } from './props';
  import { DxDataGrid } from 'devextreme-vue/data-grid';
  import DxSelectBox from 'devextreme-vue/select-box';
  import { DevExtremeDataGridProps, DataGridActionType } from './types/data-grid';
  import { useRowSelection } from './hooks/useRowSelection';
  import { createTableContext } from './hooks/useDataGridContext';
  import { omit } from 'lodash-es';
  import { useCustomizeMethods } from './hooks/useCustomizeMethods';
  export default defineComponent({
    name: 'DevExtremeDataGrid',
    components: { DxDataGrid, DxSelectBox },
    props: datagridProps,
    emits: ['register'],
    // emits: ['onRowDblClick'],
    // setup(props, { attrs, emit, slots, expose }) {
    setup(props, context) {
      const wapperRef = ref<HTMLElement | null>(null);
      const dataGridRefKey = ref<HTMLElement | any | null>(null);
      //#region 【computed计算属性】
      /**
       * 计算DataGrid的instance属性便于使用
       */
      const dataGridInstance = computed(() => {
        return dataGridRefKey.value.instance;
      });
      // console.log('DevExtremeDataGrid=>dataGridInstance', dataGridInstance);

      const innerPropsRef = ref<Partial<DevExtremeDataGridProps>>();
      // 获取Props
      const getProps = computed(() => {
        return { ...props, ...context.attrs, ...unref(innerPropsRef) } as DevExtremeDataGridProps;
      });

      //#endregion

      //#region 【hooks函数处理】

      const { getSelectedRowsData, getInstance } = useRowSelection(dataGridInstance);

      const dataGridAction: DataGridActionType = {
        getSelectedRowsData,
        getInstance,
      };

      const { onCustomizeContentReady } = useCustomizeMethods(getProps);

      // const { customRow } = useCustomRow(getProps, {
      //   emit,
      // });

      //#endregion

      //#region 【处理Props中onContentReady渲染后是否清除勾选框】
      // getProps.value.isCloseEidtClearSelection = false;
      // if (getProps.value.isCloseEidtClearSelection) {
      //   if (typeof getProps.value.onContentReady == 'function') {
      //     const oldContentReady = getProps.value.onContentReady;
      //     console.log('oldContentReady', oldContentReady);

      //     const newonContentReady = (e: ContentReadyEvent) => {
      //       console.log('newonContentReady');
      //       //分页、查询、筛选、刷新后清空选中
      //       e.component.clearSelection();
      //       //调用原方法
      //       oldContentReady(e);
      //     };
      //     getProps.value.onContentReady = newonContentReady;
      //     console.log('getProps.value.onContentReady', getProps.value.onContentReady);
      //   } else {
      //     function newonContentReady(e: ContentReadyEvent) {
      //       console.log('newonContentReady');
      //       //分页、查询、筛选、刷新后清空选中
      //       e.component.clearSelection();
      //     }
      //     getProps.value.onInitialized = newonContentReady;
      //   }
      // }

      //#endregion

      //#region 【处理v-bind绑定数据】
      /**
       * 处理绑定数据
       */
      const getBindValues = computed(() => {
        let propsData: Recordable = {
          // customRow,
          ...unref(getProps),
          onContentReady: onCustomizeContentReady(),
        };
        // console.log(propsData);
        propsData = omit(propsData);
        return propsData;
      });
      // console.log('getBindValues.value.onContentReady', getBindValues.value.onContentReady);
      // console.log('DevExtremeDataGrid=>getBindValues', getBindValues.value);

      //#endregion

      //#region 【自定义部分方法的暴露】
      /**
       * createTableContext主要是依赖注入方法
       * exposr=>主要实现暴露方法
       */
      createTableContext({ ...dataGridAction, getBindValues });
      context.expose(dataGridAction);
      //#endregion

      //#region 【emit操作】

      //#endregion

      //#region 【生命周期函数】

      onMounted(() => {
        // console.log('dataGridInstance', dataGridInstance.value);
      });

      //#endregion

      //#region 【vue(watch)|(watchEffect)事件监听事件】
      /**
       * 监听事件
       */
      watchEffect(() => {});

      //#endregion

      //#region 【内部事件，不暴露】
      // 设置默认条数
      const selectPage = getProps.value.paging.pageSize;
      const onValueChanged = (e: any) => {
        dataGridInstance.value.pageSize(e.value);
      };

      const filterRow = reactive({
        applyFilter: 'auto', // 指定何时应用过滤器。
        applyFilterText: 'Apply filter', // 指定当用户在应用过滤器的按钮上暂停时显示的提示文本。
        betweenEndText: 'End', // 为编辑器指定一个占位符，该占位符在用户选择“介于”过滤器操作时指定范围的结尾。 默认值|ENd
        betweenStartText: 'Start', // 为编辑器指定一个占位符，该占位符在用户选择“介于”过滤器操作时指定范围的开始。 默认值|Start
        operationDescriptions: {},
        resetOperationText: 'Reset', // 在过滤器列表上指定用于重置操作的文本。
        showAllText: '(All)', // 为清除已应用的过滤器的项目指定文本。仅在过滤器行的单元格包含选择框时使用。
        showOperationChooser: true, // 指定打开过滤器列表的图标是否可见。
        visible: true, // 指定过滤器行是否可见。
      });
      //#endregion

      return {
        wapperRef,
        selectPage,
        onValueChanged,
        dataGridRefKey,
        dataGridAction,
        getBindValues,
        filterRow,
      };
    },
  });
</script>

<style lang="less" scoped>
  .devextreme-wapper {
    width: 100%;
    height: 100%;

    ::v-deep(.devextreme-wapper-dataGrid) {
      height: 100%;

      .dx-scrollable-scroll {
        height: 15px;
        width: 15px;
      }
      //x 轴
      .dx-scrollbar-horizontal.dx-scrollbar-hoverable {
        height: 15px;
      }
      //y 轴
      .dx-scrollbar-vertical.dx-scrollbar-hoverable {
        width: 15px;
      }
    }

    ::v-deep(.devextreme-wapper-selectBox) {
      width: 79px;
      height: 26px;
      line-height: 26px;
      bottom: 30px;
      position: absolute;

      .dx-texteditor-input {
        height: 24px;
        line-height: 24px;
        min-height: 24px;
      }
    }
  }

  ::v-deep(.dx-popup-wrapper > .dx-overlay-content) {
    border: 1px solid #ddd;
    background: #fff;
    -webkit-box-shadow: 0 6px 12px rgb(0 0 0 / 18%);
    box-shadow: 0 6px 12px rgb(0 0 0 / 18%);
    border-radius: 6px;
    width: 252px;
    height: 325px;
    z-index: 1501;
    margin: 0px;
    left: 0px;
    top: 0px;
    transform: translate(380px, 72px) scale(1);
    transition: none 0s ease 0s;
    opacity: 1;
  }
</style>
