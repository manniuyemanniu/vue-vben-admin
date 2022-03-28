<template>
  <div ref="wrapRef" :class="getDataGridClass">
    <!-- <transition> -->
    <!-- 正文 -->
    <!-- 通过v-bing来转化定义props等数据 -->
    <DxDataGrid ref="dxDataGridElRef" class="devextreme-wapper-dataGrid" v-bind="getBindValues" />
    <!-- </transition> -->
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
  import { DxDataGrid } from 'devextreme-vue/data-grid';
  import DxSelectBox from 'devextreme-vue/select-box';
  import { dataGridActionOptions, dataGridPropsOptions } from './types/datagrid';
  import { useDxDataGridEvent } from './hooks/useDxDataGridEvent';
  import { omit } from 'lodash-es';
  import { createTableContext } from './hooks/useDataGridContext';
  import { useDesign } from '/@/hooks/web/useDesign';
  export default defineComponent({
    name: 'EditDataGrid',
    components: { DxDataGrid, DxSelectBox },
    props: datagridProps,
    emits: ['register'],
    setup(props, { attrs, emit, slots, expose }) {
      console.log('slots', slots);

      const wrapRef = ref(null);

      const dxDataGridElRef = ref<Nullable<dataGridActionOptions>>(null);

      const { prefixCls } = useDesign('edit-datagrid');

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

      const { instance, getSelectedRowsData, onCustomizeContentReady } = useDxDataGridEvent({
        getProps,
        dxDataGridElRef: dxDataGridElRef as Ref<dataGridActionOptions>,
      });

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
          onContentReady: onCustomizeContentReady(),
        };
        // console.log(propsData);
        propsData = omit(propsData);
        return propsData;
      });

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
        getDataGridClass,
        getBindValues,
      };
    },
  });
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-edit-datagrid';

  .@{prefix-cls} {
    // .devextreme-wapper {
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
