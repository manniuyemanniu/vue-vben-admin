import { isNullOrUnDef } from '/@/utils/is';
import DataSource from 'devextreme/data/data_source';
import { ComputedRef, Ref, unref } from 'vue';
import {
  dropDownDataGridPropsOptionos,
  dropDownDataGridActionOptions,
} from '../types/dropdown-datagrid';
interface UseDxDataGridActionContext {
  getProps: ComputedRef<dropDownDataGridPropsOptionos>;
  dxDropDownElRef: Ref<dropDownDataGridActionOptions>;
  dxDropDownDataGridElRef: Ref;
  focusedRowIndex: Ref<number>;
  focusedRowKey: Ref<any>;
  // gridBoxOpened: Ref<boolean>;
  gridBoxValue: Ref<any>;
  dataGridRef: Ref<any>;
  searchTimer?: any;
}

/**
 * 主要处理函数或方法
 * @param param0
 * @returns
 */
export function useDropDownDataGridEvent({
  getProps,
  dxDropDownElRef,
  dxDropDownDataGridElRef,
  focusedRowIndex,
  focusedRowKey,
  // gridBoxOpened,
  gridBoxValue,
  dataGridRef,
  searchTimer = null,
}: UseDxDataGridActionContext) {
  /**
   * 获取drop-down的instance信息
   * @returns DataGrid
   */
  function instance(): any {
    const result = dxDropDownElRef.value.instance;
    return result;
  }
  function datagridinstance(): any {
    const result = !isNullOrUnDef(dxDropDownDataGridElRef.value)
      ? dxDropDownDataGridElRef.value.instance
      : dataGridRef.value;
    return result;
  }

  /**
   * 获取自定义数据源信息
   * @returns
   */
  function makeAsyncDataSource() {
    const { customDataSource } = unref(getProps);
    return customDataSource;
  }
  /**
   *
   * @returns DataGrid数据源
   */

  const { searchExpr: searchExprs } = unref(getProps);
  const dataGridDataSource = new DataSource({
    store: makeAsyncDataSource() as any,
    searchExpr: searchExprs as any,
  });

  const dropDownBoxDataSource = new DataSource({
    store: makeAsyncDataSource() as any,
  });
  /**
   * 每次在 UI 组件获得焦点时更改 UI 组件的输入时执行的函数。
   */
  function customInput(e: any) {
    const { valueExpr } = unref(getProps);
    clearTimeout(searchTimer);
    searchTimer = setTimeout(function () {
      const text = e.component.option('text'),
        opened = e.component.option('opened');
      dataGridDataSource.searchValue(text);
      if (opened && isSearchIncomplete(e.component)) {
        const dataGrid = datagridinstance();
        (dataGridDataSource.load() as any).done((items) => {
          if (items.length > 0 && dataGrid) dataGrid.option('focusedRowKey', items[0][valueExpr]);
        });
      } else {
        e.component.open();
      }
    }, 500);
  }
  /**
   * 打开下拉编辑器后执行的功能。
   */
  function customOpened(e: any) {
    const { valueExpr } = unref(getProps);
    const dataGrid = datagridinstance();
    const ddbInstance = e.component;
    if (ddbInstance.isKeyDown) {
      const contentReadyHandler = (args) => {
        const gridInstance = args.component;
        gridInstance.focus();
        gridInstance.off('contentReady', contentReadyHandler);
      };
      if (!dataGrid.isNotFirstLoad) dataGrid.on('contentReady', contentReadyHandler);
      else {
        const optionChangedHandler = (args) => {
          const gridInstance = args.component;
          if (args.name === 'focusedRowKey' || args.name === 'focusedColumnIndex') {
            gridInstance.off('optionChanged', optionChangedHandler);
            gridInstance.focus();
          }
        };
        dataGrid.on('optionChanged', optionChangedHandler);
        focusedRowIndex.value = 0;
      }
      ddbInstance.isKeyDown = false;
    } else if (dataGrid.isNotFirstLoad && isSearchIncomplete(ddbInstance)) {
      (dataGridDataSource.load() as any).done((items) => {
        if (items.length > 0) focusedRowKey.value = items[0][valueExpr];
        ddbInstance.focus();
      });
    }
  }
  /**
   * 关闭下拉编辑器后执行的功能。
   */
  function customClose(e: any) {
    const ddbInstance = e.component;
    const searchValue = dataGridDataSource.searchValue();
    if (isSearchIncomplete(ddbInstance)) {
      gridBoxValue.value = gridBoxValue.value === '' ? null : '';
    }
    if (searchValue) {
      dataGridDataSource.searchValue(null);
    }
  }
  /**
   * 当用户按下键盘上的键时执行的功能。
   */
  function customKeyDown(e: any) {
    const dataGrid = datagridinstance();
    if (e.event.keyCode !== 40) return; //not arrow down
    if (!e.component.option('opened')) {
      e.component.isKeyDown = true;
      e.component.opened();
    } else dataGrid && dataGrid.focus();
  }

  function isSearchIncomplete(dropDownBox: any) {
    // compare the last displayed value and the current real text in the input field
    let displayValue = dropDownBox.option('displayValue'),
      text = dropDownBox.option('text');
    text = text && text.length && text;
    displayValue = displayValue && displayValue.length && displayValue[0];
    return text !== displayValue;
  }

  /**
   * data-grid渲染完成后事件
   * @param e
   */
  function customDataGridOnContentReady(e: any) {
    const ddbInstance = instance();
    if (!e.component.isNotFirstLoad) {
      e.component.isNotFirstLoad = true;
      ddbInstance.focus();
    }
  }
  /**
   * 当 UI 组件处于焦点且已按下某个键时执行的功能。
   * @param e
   */
  function customDataGridOnKeyDown(e) {
    if (e.event.keyCode === 13) {
      // Enter press
      gridBoxValue.value = [focusedRowKey.value];
    }
  }

  return {
    dataGridDataSource,
    dropDownBoxDataSource,
    instance,
    datagridinstance,
    customInput,
    customOpened,
    customClose,
    customKeyDown,
    customDataGridOnContentReady,
    customDataGridOnKeyDown,
  };
}
