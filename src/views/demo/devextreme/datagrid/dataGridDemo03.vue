<!--  -->
<template>
  <div class="p-4-wapper">
    <div class="content-block dx-card responsive-paddings">
      <div class="p-4-wapper-button"> <DevExtremeButtonList :buttons="buttons" /></div>
      <div class="p-4-wapper-datagrid" ref="dataGridHelightRef">
        <!-- <DataGrid
          ref="dataGridRef"
          :dataSource="dataSource"
          :columns="columns"
          :height="height"
          :onRowDblClick="onRowDblClick"
        /> -->
        <DataGrid @register="register" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { DevextremeButtonSchema } from '/@/components/devextreme/devextreme-button/src/types/devextreme-button';
  import { DataGrid } from '/@/components/devextreme/dexextreme-datagrid-v2/index';
  import DevExtremeButtonList from '/@/components/devextreme/devextreme-button/src/DevExtremeButtonList.vue';
  import CustomStore from 'devextreme/data/custom_store';
  import { RowDblClickEvent } from 'devextreme/ui/data_grid';
  import { dataGridActionOptions } from '/@/components/devextreme/dexextreme-datagrid-v2/src/types/datagrid';
  import { useDataGrid } from '/@/components/devextreme/dexextreme-datagrid-v2/src/hooks/useDataGrid';

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
    name: 'DataGridDemo02',
    components: { DataGrid, DevExtremeButtonList },
    setup() {
      const dataGridHelightRef = ref<HTMLElement | null>(null);
      const dataGridRef = ref<Nullable<dataGridActionOptions>>(null);
      const dataSource = store;
      // const columns = [
      //   'OrderNumber',
      //   'OrderDate',
      //   'StoreCity',
      //   'StoreState',
      //   'Employee',
      //   'SaleAmount',
      // ];

      const [register, { instance, getSelectedRowsData }] = useDataGrid({
        dataSource: dataSource,
        // columns: columns,
      });

      /**
       *  获得选中事件
       */
      async function getSelectRowList() {
        const data = await getSelectedRowsData();
        console.log('getSelectRowList', data);
      }

      /**
       *  获得选中事件
       */
      async function getInstance() {
        const result = await instance();
        console.log('getInstance', result);
      }
      //#region 按钮
      // const AddDemo = () => {
      //   console.log('新增');
      // };
      // const EditDemo = () => {
      //   console.log('编辑');
      // };
      const DeleteDemo = async () => {
        const result = await instance();
        result.refresh();
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
        console.log('onRowDblClick', e);
      }

      function onContentReady(e: any) {
        console.log('defult');
        //分页、查询、筛选、刷新后清空选中
        e.component.clearSelection();
      }
      //#endregion

      const height = ref(0);

      onMounted(() => {
        height.value = Number(dataGridHelightRef.value?.clientHeight);
      });

      return {
        register,
        onRowDblClick,
        onContentReady,
        buttons,
        dataSource,
        // columns,
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
