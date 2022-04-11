<!-- DropDownDataGrid示例模板 -->
<template>
  <div ref="wrapRef" :class="getdropDownDataGridClass">
    <DxDropDownBox ref="dxDropDownElRef" v-bind="getBindValues">
      <!-- ref="dxDropDownElRef"
      :drop-down-options="dropDownOptions"
      :data-source="aaa"
      v-model:value="currentValue"
      display-expr="FullName"
      value-expr="ID"
      content-template="dataGridContentTemplate"
    > -->
      <template #dataGridContentTemplate="{}">
        <DxDataGrid
          ref="dxDropDownDataGridElRef"
          :data-source="dataGridDataSource"
          :remote-operations="true"
          :selected-row-keys="[currentValue]"
          :on-row-dbl-click="customOnRowDblClick"
          :hover-state-enabled="true"
          :focused-row-enabled="true"
          :focused-row-key="currentValue"
          :showColumnLines="true"
          :showRowLines="true"
          :showBorders="true"
          @initialized="dataGridOnInitialized"
        >
          <!-- :height="250" -->
          <!-- :on-selection-changed="onSelectionChanged" -->
          <!-- key-expr="ID" -->
          <DxColumn data-field="ID" />
          <DxColumn data-field="FullName" />
          <DxColumn data-field="Title" />
          <DxColumn data-field="Department" />
          <DxPaging :enabled="true" :page-size="10" />
          <DxScrolling mode="virtual" />
          <DxSelection mode="single" />
        </DxDataGrid>
      </template>
    </DxDropDownBox>
  </div>
</template>

<script lang="ts">
  //#region 【import导入】
  import { computed, defineComponent, Ref, ref, unref } from 'vue';
  import {
    DxDataGrid,
    DxPaging,
    DxSelection,
    DxScrolling,
    DxColumn,
  } from 'devextreme-vue/data-grid';
  import DxDropDownBox from 'devextreme-vue/drop-down-box';
  import { dropDownDataGridProps } from './props';
  import {
    dropDownDataGridActionOptions,
    dropDownDataGridPropsOptionos,
  } from './types/dropdown-datagrid';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useDropDownDataGridEvent } from './hooks/useDropDownDataGridEvent';
  import { createDropDownDataGridContextContext } from './hooks/useDropDownDataGridContext';
  import { omit } from 'lodash-es';
  // import { useDropDownDataGridMethods } from './hooks/useDropDownDataGridMethods';

  //#endregion
  export default defineComponent({
    name: 'DxDropDownDataGrid',
    components: {
      DxDataGrid,
      DxPaging,
      DxSelection,
      DxScrolling,
      DxColumn,
      DxDropDownBox,
    },
    props: dropDownDataGridProps,
    emits: ['register'],
    setup(props, { attrs, emit, expose }) {
      const wrapRef = ref(null);
      const dxDropDownElRef = ref<Nullable<dropDownDataGridActionOptions>>(null);
      const dxDropDownDataGridElRef = ref(null);
      const focusedRowIndex = ref<number>(0);
      const focusedRowKey = ref<any>(null);
      const dataGridRef = ref<any>(null);
      // const gridBoxOpened = ref<boolean>(false);
      const gridBoxValue = ref<any>([]);
      let { value: currentValue, onValueChanged, rowIndex } = unref(props);
      const { prefixCls } = useDesign('dropDown-DataGrid');

      //#region 【computed计算属性[getProps|getDataGridClass]】

      // 获取Props
      const dropDownDataGridPropsRef = ref<Partial<dropDownDataGridPropsOptionos>>();

      const getProps = computed(() => {
        return {
          ...props,
          ...attrs,
          ...unref(dropDownDataGridPropsRef),
        } as dropDownDataGridPropsOptionos;
      });

      const getdropDownDataGridClass = computed(() => {
        return [prefixCls];
      });
      //#endregion

      //#region 【hooks函数处理】

      async function setProps(props: Partial<dropDownDataGridPropsOptionos>): Promise<void> {
        dropDownDataGridPropsRef.value = { ...unref(dropDownDataGridPropsRef), ...props, ...attrs };
      }

      const {
        dataGridDataSource,
        dropDownBoxDataSource,
        instance,
        datagridinstance,
        customInput,
        customOpened,
        customClose,
        customKeyDown,
        // customDataGridOnContentReady,
        // customDataGridOnKeyDown,
      } = useDropDownDataGridEvent({
        getProps,
        dxDropDownElRef: dxDropDownElRef as Ref<dropDownDataGridActionOptions>,
        dxDropDownDataGridElRef: dxDropDownDataGridElRef,
        focusedRowIndex,
        focusedRowKey,
        // gridBoxOpened,
        gridBoxValue,
        dataGridRef,
      });

      // const { customInput, customOpened, customClose, customKeyDown } =
      //   useDropDownDataGridMethods();

      const dropDownDataGridAction: dropDownDataGridActionOptions = {
        setProps,
        instance,
        datagridinstance,
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
          dataSource: dropDownBoxDataSource,
          contentTemplate: 'dataGridContentTemplate',
          onKeyDown: customKeyDown,
          onInput: customInput,
          onOpened: customOpened,
          onClosed: customClose,
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
      createDropDownDataGridContextContext({ ...dropDownDataGridAction, wrapRef, getBindValues });

      expose(dropDownDataGridAction);
      //#endregion

      //#region 【Emit处理】

      // emit('register', dataGridAction, formActions);

      emit('register', dropDownDataGridAction);
      //#endregion

      function customOnRowDblClick(e: any) {
        const { valueExpr } = unref(getProps);
        currentValue = e.data[valueExpr];
        onValueChanged(rowIndex, e.data);
        instance().close();
      }

      function dataGridOnInitialized(e) {
        dataGridRef.value = e.component;
      }

      return {
        dataGridRef,
        dxDropDownElRef,
        dxDropDownDataGridElRef,
        currentValue,
        getdropDownDataGridClass,
        getBindValues,
        dataGridDataSource,
        customOnRowDblClick,
        dataGridOnInitialized,
      };
    },
  });
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-dropDown-DataGrid';

  .@{prefix-cls} {
    width: 100%;
    height: 100%;

    ::v-deep(.drop-down-input) {
      text-align: left !important;
    }
  }
</style>
