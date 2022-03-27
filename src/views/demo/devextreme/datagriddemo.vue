<!--  -->
<template>
  <div class="p-4-wapper">
    <div class="content-block dx-card responsive-paddings">
      <div class="p-4-wapper-button"> <DevExtremeButtonList :buttons="buttons" /></div>
      <div class="p-4-wapper-datagrid" ref="dataGridHelightRef">
        <DevExtremeDataGrid
          ref="dataGridRef"
          :dataSource="dataSource"
          :columns="columns"
          :height="height"
          :onRowDblClick="onRowDblClick"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref, unref } from 'vue';
  import { DevextremeButtonSchema } from '/@/components/devextreme/devextreme-button/src/types/devextreme-button';
  import DevExtremeDataGrid from '/@/components/devextreme/devextreme-datagrid/src/DevExtremeDataGrid.vue';
  import DevExtremeButtonList from '/@/components/devextreme/devextreme-button/src/DevExtremeButtonList.vue';
  import CustomStore from 'devextreme/data/custom_store';
  import { DataGridActionType } from '/@/components/devextreme/devextreme-datagrid/src/types/data-grid';
  import { RowDblClickEvent } from 'devextreme/ui/data_grid';

  function isNotEmpty(value) {
    return value !== undefined && value !== null && value !== '';
  }

  const store = new CustomStore({
    key: 'OrderNumber',
    load(loadOptions) {
      let params = '?';
      [
        'skip',
        'take',
        'requireTotalCount',
        'requireGroupCount',
        'sort',
        'filter',
        'totalSummary',
        'group',
        'groupSummary',
      ].forEach((i) => {
        if (i in loadOptions && isNotEmpty(loadOptions[i])) {
          params += `${i}=${JSON.stringify(loadOptions[i])}&`;
        }
      });
      params = params.slice(0, -1);
      return fetch(`https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/orders${params}`)
        .then((response) => response.json())
        .then((data) => ({
          data: data.data,
          totalCount: data.totalCount,
          summary: data.summary,
          groupCount: data.groupCount,
        }))
        .catch(() => {
          throw new Error('Data Loading Error');
        });
    },
  });

  export default defineComponent({
    name: 'DataGridDemo',
    components: { DevExtremeDataGrid, DevExtremeButtonList },
    setup() {
      const dataGridHelightRef = ref<HTMLElement | null>(null);
      const dataGridRef = ref<Nullable<DataGridActionType>>(null);

      function getTableAction() {
        const tableAction = unref(dataGridRef);
        if (!tableAction) {
          throw new Error('tableAction is null');
        }
        return tableAction;
      }

      /**
       *  获得选中事件
       */
      function getSelectRowList() {
        const data = getTableAction().getSelectedRowsData();
        console.log('getSelectRowList', data);
      }

      /**
       *  获得选中事件
       */
      function getInstance() {
        const data = getTableAction().getInstance();
        console.log('getInstance', data);
      }
      //#region 按钮
      // const AddDemo = () => {
      //   console.log('新增');
      // };
      // const EditDemo = () => {
      //   console.log('编辑');
      // };
      const DeleteDemo = () => {
        (getTableAction().getInstance() as any).refresh();
      };

      const buttons: DevextremeButtonSchema[] = [
        {
          tabIndex: 0,
          text: '新增',
          onClick: getSelectRowList,
        },
        {
          tabIndex: 1,
          text: '编辑',
          onClick: getInstance,
        },
        {
          tabIndex: 2,
          text: '删除',
          onClick: DeleteDemo,
        },
      ];
      //#endregion

      //#region DataGrid事件
      /**
       * datagrid双击事件
       * @param e
       */
      function onRowDblClick(e: RowDblClickEvent) {
        debugger;
        console.log('onRowDblClick', e);
      }

      function onContentReady(e: any) {
        console.log('defult');
        //分页、查询、筛选、刷新后清空选中
        e.component.clearSelection();
      }
      //#endregion

      const dataSource = store;
      const columns = [
        'OrderNumber',
        'OrderDate',
        'StoreCity',
        'StoreState',
        'Employee',
        'SaleAmount',
      ];

      const height = ref(0);

      onMounted(() => {
        height.value = Number(dataGridHelightRef.value?.clientHeight);
      });

      return {
        onRowDblClick,
        onContentReady,
        buttons,
        dataSource,
        columns,
        dataGridHelightRef,
        dataGridRef,
        height,
      };
    },
  });
</script>

<style lang="less">
  .p-4-wapper {
    width: 100%;
    height: 100%;
    padding: 1rem;

    .p-4-wapper-button {
      height: 40px;
      line-height: 40px;
    }

    .p-4-wapper-datagrid {
      width: 100%;
      height: calc(100% - 40px - 1rem);
      margin-top: 1rem;
    }

    .dx-card {
      width: 100%;
      height: 100%;
      padding: 1rem;
      padding-bottom: 0rem;
    }
  }
</style>
