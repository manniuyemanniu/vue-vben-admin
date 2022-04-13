import { ContentReadyEvent } from 'devextreme/ui/data_grid';
import { computed, ComputedRef, ref, Ref, unref, watch } from 'vue';
import {
  clickType,
  dataGridActionOptions,
  dataGridPropsOptions,
  ToolbarButtonSchema,
} from '../types/datagrid';
import { isFunction } from '/@/utils/is';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import dayjs from 'dayjs';
import { cloneDeep } from 'lodash-es';

interface UseDxDataGridActionContext {
  getProps: ComputedRef<dataGridPropsOptions>;
  dxDataGridElRef: Ref<dataGridActionOptions>;
}

/**
 * 主要处理函数或方法
 * @param param0
 * @returns
 */
export function useDxDataGridEvent({ getProps, dxDataGridElRef }: UseDxDataGridActionContext) {
  const toolbarButtonRef = ref(unref(getProps).toolbarButtonSchema) as unknown as Ref<
    Array<ToolbarButtonSchema>
  >;

  const getToolbarButton = computed(() => {
    const toolbarButton = cloneDeep(unref(toolbarButtonRef));
    if (!toolbarButton) {
      return [];
    }
    return toolbarButton.map((item) => {
      item = handleToolbarButtons(item);
      return item;
    });
  });

  watch(
    () => unref(getProps).toolbarButtonSchema,
    (toolbarButtonSchema) => {
      toolbarButtonRef.value = toolbarButtonSchema;
    },
  );

  /**
   * 处理onContentReady函数
   * @returns
   */
  function onCustomizeContentReady(): (e: ContentReadyEvent) => void {
    //#region 【处理onContentReady】
    const { isCloseEidtClearSelection, customizeContentReady } = unref(getProps);
    let newcustomizeContentReady: (e: ContentReadyEvent) => void;
    if (isCloseEidtClearSelection) {
      // if (typeof customizeContentReady == 'function') {
      if (isFunction(typeof customizeContentReady)) {
        newcustomizeContentReady = (e: ContentReadyEvent) => {
          //分页、查询、筛选、刷新后清空选中
          e.component.clearSelection();
          //调用原方法
          customizeContentReady(e);
        };
      } else {
        newcustomizeContentReady = (e: ContentReadyEvent) => {
          //分页、查询、筛选、刷新后清空选中
          e.component.clearSelection();
          //调用原方法
        };
      }
    } else {
      if (typeof customizeContentReady == 'function') {
        newcustomizeContentReady = customizeContentReady;
      } else {
        newcustomizeContentReady = (_e: ContentReadyEvent) => {
          //调用原方法
        };
      }
    }
    //#endregion

    return newcustomizeContentReady;
  }

  /**
   * 获取DataGrid的instance信息
   * @returns DataGrid
   */
  function instance(): any {
    const result = dxDataGridElRef.value.instance;
    return result;
  }

  /**
   *
   * @returns 获取选中的数据信息
   */
  function getSelectedRowsData(): Promise<Array<any>> {
    const dxDataGridInstance = instance();
    const result = dxDataGridInstance.getSelectedRowsData();
    return result;
  }

  //#region 【导出Export事件】
  /**
   * 导出所有数据源
   */
  function customExportAll() {
    const { exportFileName } = unref(getProps);
    const workbook = new Workbook();
    const fileName = exportFileName + dayjs().format('YYYY-MM-DD-HH-mm-ss');
    const worksheet = workbook.addWorksheet(fileName);
    const component = instance();
    exportDataGrid({
      component: component,
      worksheet: worksheet,
      customizeCell: function (options: any) {
        const excelCell = options;
        excelCell.font = { name: 'Arial', size: 12 };
        excelCell.alignment = { horizontal: 'left' };
      },
    }).then(function () {
      workbook.xlsx.writeBuffer().then(function (buffer) {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), `${fileName}.xlsx`);
      });
    });
    component.cancel = true;
  }
  /**
   * 导出选中数据源
   */
  function customExportSelect() {
    const { exportFileName } = unref(getProps);
    const workbook = new Workbook();
    const fileName = exportFileName + dayjs().format('YYYY-MM-DD-HH-mm-ss');
    const worksheet = workbook.addWorksheet(fileName);
    const component = instance();
    exportDataGrid({
      component: component,
      worksheet: worksheet,
      selectedRowsOnly: true,
      customizeCell: function (options: any) {
        console.log('customizeCell=>options', options);
        const excelCell = options;
        excelCell.font = { name: 'Arial', size: 12 };
        excelCell.alignment = { horizontal: 'left' };
      },
    }).then(function () {
      workbook.xlsx.writeBuffer().then(function (buffer) {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), `${fileName}.xlsx`);
      });
    });
    component.cancel = true;
  }
  /**
   * 导出本页数据
   */
  function customExportPage() {
    let rowindex = 1;
    const { exportFileName } = unref(getProps);
    const workbook = new Workbook();
    const fileName = exportFileName + dayjs().format('YYYY-MM-DD-HH-mm-ss');
    const worksheet = workbook.addWorksheet(fileName);
    const component = instance();
    const keys = component.getSelectedRowKeys();
    //ToDo:执行选中当前页数据
    component.selectAll();
    exportDataGrid({
      component: component,
      worksheet: worksheet,
      selectedRowsOnly: true,
      customizeCell: function (options: any) {
        debugger;
        const { gridCell, excelCell } = options;
        excelCell.font = { name: 'Arial', size: 12 };
        excelCell.alignment = { horizontal: 'left' };
        // gridCell.data = Object.assign(gridCell.data, { DataGridXh: rowindex });
        // gridCell.data.value = rowindex;
        if (gridCell.column.dataField === 'DataGridXh') {
          rowindex = rowindex + 1;
        }
        console.log('customizeCell=>options', options);
      },
    }).then(function (res) {
      console.log('exportDataGrid', res);
      workbook.xlsx.writeBuffer().then(function (buffer) {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), `${fileName}.xlsx`);
      });
    });

    //ToDo:执行取消选中当前页数据
    component.deselectAll();
    component.selectRows(keys, true);
    component.cancel = true;
  }
  //#endregion

  //#region
  /**
   * 清除查询的过滤器
   */
  function clearFilter() {
    const component = instance();
    component.clearFilter();
  }
  /**
   * 列筛选器
   */
  function showColumnChooser() {
    const component = instance();
    component.showColumnChooser();
  }
  /**
   * 打开弹层|抽屉的方法
   */
  function openModalOrDrawerEvent(): void {
    const { openModalOrDrawer } = unref(getProps);
    openModalOrDrawer(true);
  }
  /**
   * 导入excel
   */
  function importClick(): void {}

  function handleToolbarButtons(item: ToolbarButtonSchema) {
    switch (item.onClickType) {
      //新增方法，打开弹层
      case clickType.createClick: {
        item.onClick = openModalOrDrawerEvent;
        break;
      }
      //编辑方法，打开弹层，传递数据|值ID
      case clickType.editClick: {
        break;
      }
      //删除方法
      case clickType.delClick: {
        break;
      }
      //导出全部
      case clickType.exportAllClick: {
        if (!isFunction(item.onClick)) {
          item.onClick = customExportAll;
        }
        break;
      }
      //导出选中
      case clickType.exportSelectClick: {
        if (!isFunction(item.onClick)) {
          item.onClick = customExportSelect;
        }
        break;
      }
      //导出本页
      case clickType.exportPageClick: {
        if (!isFunction(item.onClick)) {
          item.onClick = customExportPage;
        }
        break;
      }
      //清除筛选
      case clickType.clearFilterClick: {
        if (!isFunction(item.onClick)) {
          item.onClick = clearFilter;
        }
        break;
      }
      //列选择器
      case clickType.showColumnChooserClick: {
        if (!isFunction(item.onClick)) {
          item.onClick = showColumnChooser;
        }
        break;
      }
      //导入方法
      case clickType.importClick: {
        if (!isFunction(item.onClick)) {
          item.onClick = importClick;
        }
        break;
      }
      default: {
        break;
      }
    }
    return item;
  }
  //#endregion
  return {
    instance,
    getSelectedRowsData,
    onCustomizeContentReady,
    customExportAll,
    customExportSelect,
    customExportPage,
    clearFilter,
    showColumnChooser,
    getToolbarButton,
  };
}
