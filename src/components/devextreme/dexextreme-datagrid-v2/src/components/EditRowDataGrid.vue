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
          caption="操作"
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

      <!-- 处理序号 -->
      <template #indexCellTemplate="{ data }">
        <span>{{ data.rowIndex + 1 }}</span>
      </template>

      <template #booleanCellTemplate="{ data }">
        <span v-if="data.value">{{ data.column.trueText }}</span>
        <span v-else>{{ data.column.falseText }}</span>
      </template>

      <!-- 动态加载列上的cellTemplate -->
      <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
      <!-- 处理头部按钮 -->
      <DxToolbar>
        <!-- <DxItem location="after">
          <DxButton
            @click="deleteRecords()"
            :disabled="!selectedItemKeys.length"
            icon="trash"
            text="Delete Selected Records"
          />
        </DxItem> -->
      </DxToolbar>
    </DxDataGrid>

    <DxSelectBox
      v-model="selectPage"
      class="devextreme-wapper-selectBox"
      :items="pager.allowedPageSizes"
      :onValueChanged="onValueChanged"
    />

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
  import DxSelectBox from 'devextreme-vue/select-box';
  import { dataGridActionOptions, dataGridPropsOptions } from '../types/datagrid';
  import { useDxDataGridEvent } from '../hooks/useDataGridEvent';
  import { omit } from 'lodash-es';
  import { createTableContext } from '../hooks/useDataGridContext';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useCustomizeAttributes } from '../hooks/useCustomizeAttributes';
  import { useDataGridColumns } from '../hooks/useDataGridColumns';
  export default defineComponent({
    name: 'EditRowDataGrid',
    components: { DxDataGrid, DxEditing, DxSelectBox, DxToolbar, DxItem, DxColumn, DxButton },
    props: datagridProps,
    emits: ['register'],
    setup(props, { attrs, emit, slots, expose }) {
      console.log('slots', slots);

      // const selectedItemKeys = ref<Array<number>>([]);

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
      const { instance, getSelectedRowsData, onCustomizeContentReady } = useDxDataGridEvent({
        getProps,
        dxDataGridElRef: dxDataGridElRef as Ref<dataGridActionOptions>,
      });

      /**
       * 处理DxDataGrid属性
       */
      const { customizeEditingMethods } = useCustomizeAttributes(getProps);

      // const { HandleColumns } =
      const { getViewColumns } = useDataGridColumns(getProps);

      const dataGridAction: dataGridActionOptions = {
        setProps,
        instance,
        getSelectedRowsData,
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
          // columns: toRaw(unref(getViewColumns)),
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

      console.log('getBindValues', getBindValues.value);
      //#region 【expose暴露方法】

      /**
       * createTableContext主要是依赖注入方法
       * exposr=>主要实现暴露方法
       */
      createTableContext({ ...dataGridAction, wrapRef, getBindValues });

      expose(dataGridAction);
      //#endregion

      //#endregion

      //#region 【Emit处理】

      // emit('register', dataGridAction, formActions);

      emit('register', dataGridAction);
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
        margin-bottom: 5px;
        margin-top: 5px;
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

    ::v-deep(.devextreme-wapper-selectBox) {
      width: 88px;
      height: 26px;
      line-height: 26px;
      bottom: 40px;
      position: relative;

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
