<template>
  <div ref="wrapRef" :class="getDataGridClass">
    <!-- 正文 -->
    <!-- 通过v-bing来转化定义props等数据 -->
    <DxDataGrid ref="dxDataGridElRef" class="devextreme-wapper-dataGrid" v-bind="getBindValues">
      <!-- 处理列信息 开始 -->
      <template v-for="column in getViewColumns" :key="column.dataField">
        <DxColumn v-bind="column" />
      </template>
      <!-- 处理列信息 结束 -->

      <!-- 处理序号 开始 -->
      <template #indexCellTemplate="{ data }">
        <span>{{ data.rowIndex + 1 }}</span>
      </template>
      <!-- 处理序号 结束 -->

      <!-- 配置工具栏(即指按钮) 开始 -->
      <DxToolbar>
        <DxItem location="before" template="toolbarButtonTemplate" />
      </DxToolbar>
      <template #toolbarButtonTemplate>
        <div :class="`${getDataGridClass}__toolbar__button`">
          <DxButton v-for="button in getToolbarButton" :key="button.tabIndex" v-bind="button" />
        </div>
      </template>

      <DxColumnChooser :enabled="false" :allow-search="true" mode="dragAndDrop" />
      <!-- 配置工具栏 结束 -->
    </DxDataGrid>

    <DxSelectBox
      v-model="selectPage"
      class="devextreme-wapper-selectBox"
      :items="pager.allowedPageSizes"
      :onValueChanged="onValueChanged"
    />
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, onMounted, Ref, ref, unref } from 'vue';
  import { datagridProps } from './props';
  import {
    DxDataGrid,
    DxEditing,
    DxToolbar,
    DxItem,
    DxColumn,
    DxColumnChooser,
  } from 'devextreme-vue/data-grid';
  import DxButton from 'devextreme-vue/button';
  import DxSelectBox from 'devextreme-vue/select-box';
  import { dataGridActionOptions, dataGridPropsOptions } from './types/datagrid';
  import { useDxDataGridEvent } from './hooks/useDataGridEvent';
  import { omit } from 'lodash-es';
  import { createTableContext } from './hooks/useDataGridContext';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useCustomizeAttributes } from './hooks/useCustomizeAttributes';
  import { useDataGridColumns } from './hooks/useDataGridColumns';
  // import { useDataGridToolbar } from './hooks/useDataGridToolbar';
  export default defineComponent({
    name: 'DataGrid',
    components: {
      DxDataGrid,
      DxEditing,
      DxSelectBox,
      DxToolbar,
      DxItem,
      DxColumn,
      DxButton,
      DxColumnChooser,
    },
    props: datagridProps,
    emits: ['register'],
    setup(props, { attrs, emit, slots, expose }) {
      console.log('slots', slots);

      const wrapRef = ref(null);

      const dxDataGridElRef = ref<Nullable<dataGridActionOptions>>(null);

      const { prefixCls } = useDesign('datagrid');

      //#region 【computed计算属性[getProps|getDataGridClass]】

      // 获取Props
      const dataGridPropsRef = ref<Partial<dataGridPropsOptions>>();

      const getProps = computed(() => {
        return { ...props, ...attrs, ...unref(dataGridPropsRef) } as dataGridPropsOptions;
      });

      const getDataGridClass = computed(() => {
        return [prefixCls];
      });

      //#endregion

      //#region 【hooks函数处理】

      async function setProps(props: Partial<dataGridPropsOptions>): Promise<void> {
        dataGridPropsRef.value = { ...unref(dataGridPropsRef), ...props, ...attrs };
      }

      const {
        instance,
        getSelectedRowsData,
        onCustomizeContentReady,
        customExportAll,
        customExportSelect,
        customExportPage,
        clearFilter,
        showColumnChooser,
        getToolbarButton,
      } = useDxDataGridEvent({
        getProps,
        dxDataGridElRef: dxDataGridElRef as Ref<dataGridActionOptions>,
      });

      const { customizeEditingMethods } = useCustomizeAttributes(getProps);

      const { getViewColumns } = useDataGridColumns(getProps);

      // const { getToolbarButton } = useDataGridToolbar(getProps);

      console.log(getViewColumns.value);
      const dataGridAction: dataGridActionOptions = {
        setProps,
        instance,
        getSelectedRowsData,
        customExportAll,
        customExportSelect,
        customExportPage,
        clearFilter,
        showColumnChooser,
        // emit,
      };

      //#endregion

      //#region 【处理v-bind绑定数据】
      /**
       * 处理绑定数据
       */
      const getBindValues = computed(() => {
        let propsData: Recordable = {
          // customRow,
          ...unref(getProps),
          ...customizeEditingMethods(),
          onContentReady: onCustomizeContentReady(),
        };
        // console.log(propsData);
        propsData = omit(propsData);
        return propsData;
      });
      const getBindEditValues = computed(() => {
        let propsData: Recordable = {
          ...customizeEditingMethods(),
        };
        propsData = omit(propsData);
        return propsData;
      });

      //#endregion

      //#region 【expose暴露方法】

      /**
       * createTableContext主要是依赖注入方法
       * exposr=>主要实现暴露方法
       */
      createTableContext({ ...dataGridAction, wrapRef, getBindValues });

      expose(dataGridAction);
      //#endregion

      //#region 【Emit处理】

      // emit('register', dataGridAction, formActions);

      emit('register', dataGridAction);
      //#endregion

      //#region 【生命周期函数】

      onMounted(() => {
        console.log('getToolbarButton', getToolbarButton);
      });

      //#endregion

      //#region 【内部事件，不暴露】
      // 设置默认条数
      const selectPage = getProps.value.paging.pageSize;
      const onValueChanged = (e: any) => {
        const dataGridInstance = instance();
        dataGridInstance.pageSize(e.value);
      };
      //#endregion

      return {
        dxDataGridElRef,
        selectPage,
        onValueChanged,
        wrapRef,
        getDataGridClass,
        getBindValues,
        getBindEditValues,
        getViewColumns,
        getToolbarButton,
      };
    },
  });
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-datagrid';

  .@{prefix-cls} {
    // .devextreme-wapper {
    width: 100%;
    height: 100%;

    ::v-deep(.devextreme-wapper-dataGrid) {
      height: 100%;

      .dx-scrollable-scrollbars-alwaysvisible.dx-scrollable-both
        > .dx-scrollable-wrapper
        > .dx-scrollable-container
        > .dx-scrollable-content,
      .dx-scrollable-scrollbars-alwaysvisible.dx-scrollable-horizontal
        > .dx-scrollable-wrapper
        > .dx-scrollable-container
        > .dx-scrollable-content {
        padding-bottom: 0px !important;
      }

      .dx-datagrid-header-panel .dx-toolbar {
        // margin-bottom: 5px;
        margin-top: 5px;
        height: 32px;
        line-height: 32px;

        .dx-toolbar-items-container {
          height: 32px;
          line-height: 32px;
        }
      }

      .dx-datagrid-content .dx-datagrid-table .dx-row .dx-editor-cell .dx-texteditor,
      .dx-datagrid-content .dx-datagrid-table .dx-row .dx-editor-cell .dx-texteditor-container {
        margin: 0;
        font-size: 12px;
      }

      .dx-datagrid-content .dx-datagrid-table .dx-row .dx-command-select {
        padding: 0;
        width: 40px !important;
        min-width: 40px !important;
        max-width: 40px !important;
      }

      .dx-datagrid-rowsview {
        .dx-row {
          line-height: 15px;
          max-height: 30px;
          min-height: 30px;
          height: 30px;
          font-size: 12px;
        }
      }

      .dx-datagrid-headers td {
        text-align: center !important;
        font-size: 12px;
      }

      .dx-datagrid-headers .dx-column-indicators {
        float: right !important;
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

    &__toolbar__button {
      height: 32px;
      line-height: 32px;

      ::v-deep(.dx-button) {
        margin-right: 5px;
        padding: 0px 1px;

        .dx-button-content {
          padding: 0px 18px;

          .dx-icon {
            margin-right: 5px;
            font-size: 16px;
          }

          .dx-button-text {
            height: 30px;
            line-height: 30px;
          }
        }
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
