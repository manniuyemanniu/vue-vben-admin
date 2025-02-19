<template>
  <div ref="wrapRef" :class="getEditRowDataGridClass">
    <!-- 通过v-bing来转化定义props等数据 -->
    <DxDataGrid ref="dxDataGridElRef" class="devextreme-wapper-dataGrid" v-bind="getBindValues">
      <DxEditing
        v-if="getBindValues.customizeEnableEditing"
        v-bind="getBindEditValues.customizeEditing"
      />

      <template
        v-if="getBindValues.customizeEnableEditing && getBindEditValues.customizeEditing.useIcons"
      >
        <DxColumn
          type="buttons"
          width="80"
          :allowReordering="false"
          fixedPosition="right"
          :fixed="true"
          :caption="t('routes.demo.devextreme.dataGrid.action')"
        >
          <DxButton name="edit" />
          <DxButton name="delete" />
        </DxColumn>
      </template>

      <!-- 插槽的最低级处理方式,后续优化 -->
      <!-- 处理列信息 -->
      <template v-for="column in getViewColumns" :key="column.dataField">
        <DxColumn v-bind="column" />
      </template>

      <!-- 处理序号-开始 -->
      <template #indexCellTemplate="{ data: IndexData }">
        <span>{{ IndexData.rowIndex + 1 }}</span>
      </template>
      <!-- 处理序号-结束 -->

      <!-- 处理Boolean类型的数据显示-开始 -->
      <template #booleanCellTemplate="{ data: BooleanData }">
        <span v-if="BooleanData.value">{{ BooleanData.column.trueText }}</span>
        <span v-else>{{ BooleanData.column.falseText }}</span>
      </template>
      <!-- 处理Boolean类型的数据显示-结束 -->

      <!-- 动态加载列上的cellTemplate|editCellTemplate -->
      <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
      <!-- 处理头部按钮 -->
      <!-- <DxToolbar>
        <DxItem name="addRowButton" show-text="always" />
      </DxToolbar> -->
    </DxDataGrid>

    <!-- <template v-for="column in getViewColumns" :key="column.dataField">
      {{ column }}
    </template> -->
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, onMounted, Ref, ref, unref } from 'vue';
  import { datagridProps } from '../props';
  import { DxDataGrid, DxEditing, DxToolbar, DxItem, DxColumn } from 'devextreme-vue/data-grid';
  import DxButton from 'devextreme-vue/button';
  import { dataGridActionOptions, dataGridPropsOptions } from '../types/datagrid';
  import { useDxDataGridEvent } from '../hooks/useDataGridEvent';
  import { omit } from 'lodash-es';
  import { createTableContext } from '../hooks/useDataGridContext';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useCustomizeAttributes } from '../hooks/useCustomizeAttributes';
  import { useDataGridColumns } from '../hooks/useDataGridColumns';
  import { useI18n } from '/@/hooks/web/useI18n';
  export default defineComponent({
    name: 'EditDataGrid',
    components: { DxDataGrid, DxEditing, DxToolbar, DxItem, DxColumn, DxButton },
    props: datagridProps,
    emits: ['register'],
    setup(props, { attrs, emit, slots, expose }) {
      const { t } = useI18n();
      console.log('slots', slots);
      for (var item in Object.keys(slots)) {
        console.log('slots==>key', item);
      }

      const wrapRef = ref(null);

      const dxDataGridElRef = ref<Nullable<dataGridActionOptions>>(null);

      const { prefixCls } = useDesign('edit-row-datagrid');

      //#region 【computed计算属性[getProps|getEditRowDataGridClass]】

      // 获取Props
      const dataGridPropsRef = ref<Partial<dataGridPropsOptions>>();

      const getProps = computed(() => {
        return { ...props, ...attrs, ...unref(dataGridPropsRef) } as dataGridPropsOptions;
      });

      const getEditRowDataGridClass = computed(() => {
        return [prefixCls];
      });

      //#endregion

      //#region 【hooks函数处理】

      async function setProps(props: Partial<dataGridPropsOptions>): Promise<void> {
        dataGridPropsRef.value = { ...unref(dataGridPropsRef), ...props, ...attrs };
      }

      /**
       * 处理事件
       */
      const {
        instance,
        getSelectedRowsData,
        onCustomizeContentReady,
        customExportAll,
        customExportSelect,
        customExportPage,
        clearFilter,
        showColumnChooser,
        // getToolbarButton,
      } = useDxDataGridEvent({
        getProps,
        dxDataGridElRef: dxDataGridElRef as Ref<dataGridActionOptions>,
      });

      /**
       * 处理DxDataGrid属性
       */
      const { customizeEditingMethods } = useCustomizeAttributes(getProps);

      // const { HandleColumns } =
      const { getViewColumns } = useDataGridColumns(getProps);

      const editDataGridAction: dataGridActionOptions = {
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
          ...unref(getProps),
          ...customizeEditingMethods(),
          onContentReady: onCustomizeContentReady(),
        };
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
      createTableContext({ ...editDataGridAction, wrapRef, getBindValues });

      expose(editDataGridAction);
      //#endregion

      //#region 【Emit处理】

      // emit('register', editDataGridAction, formActions);

      emit('register', editDataGridAction);
      //#endregion

      //#region 【生命周期函数】

      onMounted(() => {
        // console.log('dataGridInstance', dataGridInstance.value);
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
        t,
        dxDataGridElRef,
        selectPage,
        onValueChanged,
        wrapRef,
        getEditRowDataGridClass,
        getBindValues,
        getBindEditValues,
        getViewColumns,
      };
    },
  });
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-edit-row-datagrid';

  .@{prefix-cls} {
    // .devextreme-wapper {
    width: 100%;
    height: 100%;
    position: relative;

    ::v-deep(.devextreme-wapper-dataGrid) {
      height: 100%;

      // .dx-scrollable-scroll {
      //   height: 15px;
      //   width: 15px;
      // }
      // //x 轴
      // .dx-scrollbar-horizontal.dx-scrollbar-hoverable {
      //   height: 15px;
      // }
      // //y 轴
      // .dx-scrollbar-vertical.dx-scrollbar-hoverable {
      //   width: 15px;
      // }

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
        margin-bottom: 5px;
        margin-top: 5px;
        // display: none;
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

      // .dx-datagrid {
      //   padding: 1rem !important;
      //   padding-bottom: 0rem !important;
      // }
    }

    .dx-pager .dx-pages {
      white-space: nowrap;
      float: right;
      margin-right: 10px;
    }

    ::v-deep(.devextreme-wapper-selectBox) {
      width: 88px;
      height: 26px;
      line-height: 26px;
      bottom: 13px;
      left: 10px;
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
