<!--  -->
<template>
  <div class="p-4 h-full">
    <div class="px-4 h-full content-block dx-card responsive-paddings">
      <!-- <div class="p-4-wapper-button">
        <DevExtremeButtonList :buttons="buttons" />
      </div>
      <div class="p-4-wapper-datagrid" ref="dataGridHelightRef">
        
      </div> -->
      <DataGrid
        ref="dataGridRef"
        :exportFileName="exportFileName"
        :dataSource="dataScouce"
        :customColumn="columns"
        :toolbarButtonSchema="buttons"
        :openModalOrDrawer="openDrawer"
      />
      <CreateOrEditModal @register="registerDrawer" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import {
    clickType,
    CustomizeColumns,
    DataGrid,
    dataGridActionOptions,
    ToolbarButtonSchema,
  } from '/@/components/devextreme/dexextreme-datagrid/index';
  import DevExtremeButtonList from '/@/components/devextreme/devextreme-button/src/DevExtremeButtonList.vue';
  import { createStore } from 'devextreme-aspnet-data-nojquery';

  import CreateOrEditModal from './components/CreateOrEditModal.vue';
  import { useDrawer } from '/@/components/Drawer';
  import { useI18n } from '/@/hooks/web/useI18n';
  export default defineComponent({
    name: 'DataGridForm',
    components: { DataGrid, DevExtremeButtonList, CreateOrEditModal },
    setup() {
      //#region 【弹出层/抽屉】
      const { t } = useI18n();
      const [registerDrawer, { openDrawer }] = useDrawer();
      //#endregion

      //#region 【button】
      const exportFileName = '部门信息';
      const dataGridRef = ref<Nullable<dataGridActionOptions>>(null);
      function getDataGridAction() {
        const dataGridAction = unref(dataGridRef);
        if (!dataGridAction) {
          throw new Error('dataGridAction is null');
        }
        return dataGridAction;
      }
      function getDataGridSetting() {
        const instance = getDataGridAction().instance();
        console.log('getDataGridSetting', instance);
        console.log('getDataGridSetting==>getVisibleColumns', instance.getVisibleColumns());
      }

      const buttons: Array<ToolbarButtonSchema> = [
        {
          tabIndex: 0,
          text: t('routes.demo.devextreme.dataGrid.add'), //'新增',
          icon: 'add',
          onClickType: clickType.createClick,
          // onClick: CreateOrEditOpenModel,
        },
        {
          tabIndex: 1,
          text: t('routes.demo.devextreme.dataGrid.edit'),
          icon: 'edit',
          onClickType: clickType.editClick,
          onClick: getDataGridSetting,
        },
        {
          tabIndex: 2,
          text: t('routes.demo.devextreme.dataGrid.del'),
          icon: 'trash',
          onClickType: clickType.delClick,
        },
        {
          tabIndex: 3,
          text: t('routes.demo.devextreme.dataGrid.export'),
          icon: 'export',
          onClickType: clickType.exportAllClick,
          //onClick: exportAll,
        },
        {
          tabIndex: 4,
          text: t('routes.demo.devextreme.dataGrid.exportAll'),
          icon: 'export',
          onClickType: clickType.exportAllClick,
          //onClick: exportAll,
        },
        {
          tabIndex: 5,
          text: t('routes.demo.devextreme.dataGrid.exportSelect'),
          icon: 'export',
          onClickType: clickType.exportSelectClick,
          //onClick: exportSelect,
        },
        {
          tabIndex: 6,
          text: t('routes.demo.devextreme.dataGrid.exportPage'),
          icon: 'export',
          onClickType: clickType.exportPageClick,
          //onClick: exportPage,
        },
        {
          tabIndex: 7,
          text: t('routes.demo.devextreme.dataGrid.clearFilter'),
          icon: 'clearformat',
          onClickType: clickType.clearFilterClick,
          //onClick: clearFilter,
        },
        {
          tabIndex: 8,
          text: t('routes.demo.devextreme.dataGrid.columnChooser'),
          icon: 'columnchooser',
          onClickType: clickType.showColumnChooserClick,
          //onClick: showColumnChooser,
        },
      ];

      //#endregion

      //#region 【data-grid】
      const dataScouce = createStore({
        key: 'id',
        loadUrl: `http://127.0.0.1:4523/mock/650627/GetDataGridDataSouce`,
        onBeforeSend(_method, _ajaxOptions) {},
      });
      const columns: Array<CustomizeColumns> = [
        {
          dataField: 'id',
          caption: 'ID',
          dataType: 'number',
          visible: false,
          // editCellTemplate: 'dropDownBoxEditor',
        },
        {
          dataField: 'code',
          caption: '员工编码',
          dataType: 'string',
          // editCellTemplate: 'dropDownBoxEditor',
        },
        {
          dataField: 'name',
          caption: '员工名称',
          dataType: 'string',
          // editCellTemplate: 'dropDownBoxEditor',
        },
        {
          dataField: 'age',
          caption: '年龄',
          dataType: 'number',
          // editCellTemplate: 'dropDownBoxEditor',
        },
        {
          dataField: 'phone',
          caption: '手机号',
          dataType: 'string',
          // editCellTemplate: 'dropDownBoxEditor',
        },
        {
          dataField: 'creationTime',
          caption: '创建时间',
          dataType: 'datetime',
          // editCellTemplate: 'dropDownBoxEditor',
        },
      ];

      // const [register, { customExportCurrentPage }] = useDataGrid({
      //   dataSource: dataScouce,
      //   customColumn: columns,
      //   toolbarButtonSchema: buttons,
      // });

      //#endregion
      return {
        exportFileName,
        dataScouce,
        columns,
        buttons,
        dataGridRef,
        registerDrawer,
        openDrawer,
      };
    },
  });
</script>

<style lang="less">
  .p-4-wapper {
    width: 100%;
    height: 100%;
    padding: 1rem;
  }
</style>
