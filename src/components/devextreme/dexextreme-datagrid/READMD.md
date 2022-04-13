# 封装 devextreme-datagrid 组件

## 组件目录详解

```
├── src
   ├──components 【其他组件(如:编辑)】
   ├──hooks 【自定义API】
   ├──types 【组件所有属性】
   ├──DataGrid.vue 【主组件】
   ├──props.ts 【props属性】
├── index  【import总入口】

```

### 2022-03-14 开发

1. 组件属性:[详细见 dev 官方文档属性](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/)

| 网格属性名 | 网格属性类型 | 网格属性定义 | 默认值 | 是否必传 |
| :-- | --- | --- | :-- | --- |
| keyExpr | string | _指定提供键值以访问数据项的键属性（或多个属性）。_ | undefined | 否 |
| allowColumnReordering | boolean | _是否可以对列重新排序。_ | true | 否 |
| allowColumnResizing | boolean | _是否可以调整列的大小。_ | true | 否 |
| cacheEnabled | boolean | _指定是否应缓存数据。_ | true | 否 |
| columnAutoWidth | boolean | _是否应根据内容调整其宽度。_ | true | 否 |
| columnHidingEnabled | boolean | _是否应隐藏列以适应屏幕或容器大小。_ | false | 否 |
| columnMinWidth | number | _最小的列宽度_ | _100_ | 否 |
| columnResizingMode | 'nextColumn'\|'widget' | _调整列的大小_ | widget | 否 |
| showIndexColumn | boolean | _是否显示序号列_ | true | 否 |
| customColumn |  | *自定义列信息*同 Column | [] | 是 |
| columnWidth | number\|string | _列宽_ | undefined | 否 |
| disabled | boolean | _是否禁用_ | false | 否 |
| dataSource |  | 数据源 |  | 是 |
| isCloseEidtClearSelection | _boolean_ | _取消编辑勾选_<br />_分页、查询、筛选、刷新后清空选中_ | true | 否 |
| showColumnLines | boolean | _显示列线_ | true | 否 |
| showRowLines | boolean | _显示行线_ | true | 否 |
| showBorders | boolean | _显示边框_ | true | 否 |
| rowAlternationEnabled | boolean | _斑马纹_ | true | 否 |
| visible | boolean | _组件是否可见_ | true | 否 |
| width | number\|string | _宽度_ | undefined | 否 |
| height | number\|string | _高度属性暂不传递，F11 控制页面全屏后会存在问题_ |  | 否 |
| customizeEnableEditing | boolean | _自定义编辑是否启用_ | false | 否 |
| customizeEditingMode | 'batch'\|'cell'\|'row'\|'form'\|'popup' | _自定义编辑模式_ | row | 否 |
| customizeEditing | CustomizeEditing | _自定义编辑事件属性_ |  | 否 |
| toolbarButtonSchema | Array<ToolbarButtonSchema> | _Toolbar 工具栏-按钮_ | [] | 是 |
| exportFileName | string | _导出文件名_ | '' | 是 |
| openModalOrDrawer | <T = any>(_props_?: boolean, _data_?: T, _openOnSet_?: boolean) => void | _给子界面打开事件_ | Function | 否 |

2. 列常用信息

| 列属性 | 类型 | 描述 |
| --- | --- | --- |
| dataField | string | 列 Id |
| caption | string | 列描述 |
| dataType | "string" \|"number" \|"boolean" "object" "date" "datetime" | 列类型 |
| trueText | string | 当为 boolean ,true 的显示值 |
| falseText | string | 当为 boolean，false 的显示值 |

3. toolbarButtonSchema

| 按钮属性 | 类型 | 描述 |
| --- | --- | --- |
| disabled | boolean | _是否禁用_ |
| elementAttr | any | _元素属性_ |
| icon?: string; | string | 图标 |
| stylingMode | 'text'\|'outlined'\|'contained' | 'outlined' \  |
| tabIndex | number | _标签索引_ |
| text | string | _按钮文本_ |
| type | 'back'\|'danger'\|'default'\|'normal'\|'success' | _按钮类型_ |
| onClick | Function | _点击事件_ |
| visible | boolean | _是否显示_ |
| location | 'after' \| 'before' \| 'center' | _显示位置_ |
| onClickType | createClick = 'createClick', _//创建事件_<br />editClick = 'editClick', _//编辑事件_<br />delClick = 'delClick', _//删除事件_<br />exportAllClick = 'exportAllClick', //导出全部事件<br />exportSelectClick = 'exportSelectClick', _//导出选中事件_<br />exportPageClick = 'exportPageClick', _//导出当前页事件_<br />clearFilterClick = 'clearFilterClick', //清除筛选器事件<br />showColumnChooserClick = 'showColumnChooserClick', _//列选择器事件_<br />importClick = 'importClick',//导入事件<br />orderClick = 'orderClick', _//其他按钮事件,当传入的 function 为 undefined 时没有默认的 function 方法_ | _按钮事件类型_ |

4.组件返回事件

```
 function getTableAction() {
     const dataGridAction = unref(dataGridRef);
     if (!dataGridAction) {
     throw new Error('dataGridAction is null');
     }
     return dataGridAction;
 }


 或

 const [register, { instance, getSelectedRowsData }] = useDataGrid({
     dataSource: dataSource,
     // columns: columns,
 });

 可获取事件信息

   /**
   *
   */
  setProps: (props: Partial<dataGridPropsOptions>) => Promise<void>;
  /**
   * 获取初始化信息
   */
  instance: () => any;
  /**
   * 获取选中的网格信息
   */
  getSelectedRowsData: () => Promise<Array<any>>; //| Promise<Array<any>>;
  /**
   * 导出所有数据源
   */
  customExportAll: () => void;
  /**
   * 导出选中数据信息
   */
  customExportSelect: () => void;
  /**
   * 导出当前页数据信息
   */
  customExportPage: () => void;
  /**
   * 清除过滤器
   */
  clearFilter: () => void;
  /**
   * 列选择器
   */
  showColumnChooser: () => void;
```

```vue
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
  import { DataGrid, useDataGrid } from '/@/components/devextreme/dexextreme-datagrid';
  import DevExtremeButtonList from '/@/components/devextreme/devextreme-button/src/DevExtremeButtonList.vue';
  import CustomStore from 'devextreme/data/custom_store';
  import { RowDblClickEvent } from 'devextreme/ui/data_grid';
  import { dataGridActionOptions } from '/@/components/devextreme/dexextreme-datagrid/src/types/datagrid';
  // import { useDataGrid } from '/@/components/devextreme/dexextreme-datagrid/src/hooks/useDataGrid';

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


</style>

```

```
<!--  -->
<template>
  <div class="p-4-wapper">
    <div class="content-block dx-card responsive-paddings">
      <div class="p-4-wapper-button"> <DevExtremeButtonList :buttons="buttons" /></div>
      <div class="p-4-wapper-datagrid" ref="dataGridHelightRef">
        <DataGrid
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
  import { DataGrid } from '/@/components/devextreme/dexextreme-datagrid';
  import DevExtremeButtonList from '/@/components/devextreme/devextreme-button/src/DevExtremeButtonList.vue';
  import CustomStore from 'devextreme/data/custom_store';
  import { RowDblClickEvent } from 'devextreme/ui/data_grid';
  import { dataGridActionOptions } from '/@/components/devextreme/dexextreme-datagrid/src/types/datagrid';

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

      function getTableAction() {
        const dataGridAction = unref(dataGridRef);
        if (!dataGridAction) {
          throw new Error('dataGridAction is null');
        }
        return dataGridAction;
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
        const instance = getTableAction().instance();
        console.log('getInstance', instance);
      }
      //#region 按钮
      // const AddDemo = () => {
      //   console.log('新增');
      // };
      // const EditDemo = () => {
      //   console.log('编辑');
      // };
      const DeleteDemo = () => {
        const instance = getTableAction().instance();
        instance.refresh();
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

```

### 组件变更记录及记录人

```
变更格式记录如下
    ### xxxx年-xx月--xx日  xxx人员变更xxx组件
    原因:xxxx组件不满足现有模式，需重新开发

```
