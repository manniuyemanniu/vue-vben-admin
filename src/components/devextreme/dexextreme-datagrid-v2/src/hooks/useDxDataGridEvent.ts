import { ContentReadyEvent } from 'devextreme/ui/data_grid';
import { ComputedRef, Ref, unref } from 'vue';
import { dataGridActionOptions, dataGridPropsOptions } from '../types/datagrid';

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
  /**
   * 处理onContentReady函数
   * @returns
   */
  function onCustomizeContentReady(): (e: ContentReadyEvent) => void {
    //#region 【处理onContentReady】
    const { isCloseEidtClearSelection, customizeContentReady } = unref(getProps);
    let newcustomizeContentReady: (e: ContentReadyEvent) => void;
    if (isCloseEidtClearSelection) {
      if (typeof customizeContentReady == 'function') {
        newcustomizeContentReady = (e: ContentReadyEvent) => {
          console.log('newcustomizeContentReady');
          //分页、查询、筛选、刷新后清空选中
          e.component.clearSelection();
          //调用原方法
          customizeContentReady(e);
        };
      } else {
        newcustomizeContentReady = (e: ContentReadyEvent) => {
          console.log('newcustomizeContentReady');
          //分页、查询、筛选、刷新后清空选中
          e.component.clearSelection();
          //调用原方法
        };
      }
    } else {
      if (typeof customizeContentReady == 'function') {
        newcustomizeContentReady = customizeContentReady;
      } else {
        newcustomizeContentReady = (e: ContentReadyEvent) => {
          console.log('newcustomizeContentReady', e);
          console.log('newcustomizeContentReady');
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
    debugger;
    console.log('useDxDataGridEvent=>dxDataGridElRef', dxDataGridElRef);
    const result = dxDataGridElRef.value.instance;
    return result;
  }

  /**
   *
   * @returns 获取选中的数据信息
   */
  function getSelectedRowsData(): Promise<Array<any>> {
    debugger;
    //| Promise<Array<any>>
    const dxDataGridInstance = instance();
    const result = dxDataGridInstance.getSelectedRowsData();
    return result;
  }

  return {
    instance,
    getSelectedRowsData,
    onCustomizeContentReady,
  };
}
