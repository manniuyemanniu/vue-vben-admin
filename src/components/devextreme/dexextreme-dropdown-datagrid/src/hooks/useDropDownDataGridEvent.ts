import { isArray, isNullOrUnDef } from '/@/utils/is';
import DataSource from 'devextreme/data/data_source';
import { computed, ComputedRef, ref, Ref, unref, watch } from 'vue';
import {
  dropDownDataGridPropsOptionos,
  dropDownDataGridActionOptions,
} from '../types/dropdown-datagrid';
import { CustomizeColumns } from '../../../dexextreme-datagrid';
import { INDEX_COLUMN_FLAG } from '/@/components/Table/src/const';
import { useI18n } from '/@/hooks/web/useI18n';
import { cloneDeep } from 'lodash-es';
import ArrayStore from 'devextreme/data/array_store';
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
  const columnsRef = ref(unref(getProps).customColumn) as unknown as Ref<Array<CustomizeColumns>>;

  const filterRow = {
    applyFilter: 'auto', // 指定何时应用过滤器。
    applyFilterText: 'Apply filter', // 指定当用户在应用过滤器的按钮上暂停时显示的提示文本。
    betweenEndText: 'End', // 为编辑器指定一个占位符，该占位符在用户选择“介于”过滤器操作时指定范围的结尾。 默认值|ENd
    betweenStartText: 'Start', // 为编辑器指定一个占位符，该占位符在用户选择“介于”过滤器操作时指定范围的开始。 默认值|Start
    operationDescriptions: {},
    resetOperationText: 'Reset', // 在过滤器列表上指定用于重置操作的文本。
    showAllText: '(All)', // 为清除已应用的过滤器的项目指定文本。仅在过滤器行的单元格包含选择框时使用。
    showOperationChooser: true, // 指定打开过滤器列表的图标是否可见。
    visible: true, // 指定过滤器行是否可见。
  };
  const headerFilter = {
    allowSearch: false,
    height: 352,
    searchTimeout: 500,
    // texts: {
    //   cancel: t(''),
    //   emptyValue: '',
    //   ok: t(''),
    // },
    visible: true,
    width: 252,
  };

  const selection = {
    allowSelectAll: true,
    deferred: false,
    mode: 'multiple',
    selectAllMode: 'page',
    showCheckBoxesMode: 'always',
  };
  const getViewColumns = computed(() => {
    const columns = cloneDeep(unref(columnsRef));
    // handleIndexColumn(getProps, columns);
    if (!columns) {
      return [];
    }
    return columns.map((column) => {
      column = handleColumsItem(column);
      return column;
    });
  });

  watch(
    () => unref(getProps).customColumn,
    (customColumn) => {
      columnsRef.value = customColumn;
    },
  );

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
    const { customDataSource, customKeyExpr } = unref(getProps);
    if (isArray(customDataSource)) {
      return new ArrayStore({
        data: customDataSource,
        key: customKeyExpr,
      });
    } else {
      return customDataSource;
    }
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
      e.component.open();
    } else dataGrid && dataGrid.focus();
  }

  function isSearchIncomplete(dropDownBox: any) {
    // compare the last displayed value and the current real text in the input field
    let displayValue = dropDownBox.option('displayValue'),
      text = dropDownBox.option('text');
    text = (text && text.length && text).toString();
    displayValue = (displayValue && displayValue.length && displayValue[0]).toString();
    return text == displayValue;
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
   * 处理列明细信息
   * @param item
   * @returns
   */
  function handleColumsItem(item: CustomizeColumns): CustomizeColumns {
    const { t } = useI18n();
    if (item.flag === INDEX_COLUMN_FLAG) {
      return item;
    }
    item.caption = t(item.caption || '');
    // dataType:'string' | 'number' | 'date' | 'boolean' | 'object' | 'datetime';
    switch (item.dataType) {
      case 'string': {
        item.alignment = 'center';
        break;
      }
      case 'number': {
        item.alignment = 'center';
        break;
      }
      // case 'time': {
      //   item.alignment = 'right';
      //   item.format = 'HH:mm:ss';
      //   break;
      // }
      case 'date': {
        item.alignment = 'center';
        item.format = 'yyyy-MM-dd';
        item.minWidth = 180;
        break;
      }
      case 'datetime': {
        item.alignment = 'right';
        item.format = 'yyyy-MM-dd HH:mm:ss';
        item.minWidth = 180;
        break;
      }
      case 'boolean': {
        item.alignment = 'center';
        break;
      }
      case 'object': {
        item.alignment = 'center';
        break;
      }
      default: {
        item.alignment = 'center';
        break;
      }
    }
    return item;
  }

  return {
    filterRow,
    headerFilter,
    selection,
    getViewColumns,
    dataGridDataSource,
    dropDownBoxDataSource,
    instance,
    datagridinstance,
    customInput,
    customOpened,
    customClose,
    customKeyDown,
    customDataGridOnContentReady,
  };
}
