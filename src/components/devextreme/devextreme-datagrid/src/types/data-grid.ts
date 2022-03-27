import {
  CellClickEvent,
  CellDblClickEvent,
  CellHoverChangedEvent,
  CellPreparedEvent,
  ContentReadyEvent,
  ContextMenuPreparingEvent,
  EditingStartEvent,
  EditorPreparedEvent,
  EditorPreparingEvent,
  ExportedEvent,
  ExportingEvent,
  FileSavingEvent,
  FocusedCellChangedEvent,
  FocusedCellChangingEvent,
  FocusedRowChangedEvent,
  FocusedRowChangingEvent,
  RowClickEvent,
  RowDblClickEvent,
  RowPreparedEvent,
} from 'devextreme/ui/data_grid';
import { DataSourceLikes } from './data-grid-datasource-type';
import {
  ColumnFixing,
  FilterRow,
  HeaderFilter,
  Pager,
  Paging,
  RemoteOperationsSetting,
  Scrolling,
  SelectionBase,
} from './data-grid-type';

/**
 * 基本配置信息
 */
export interface DevExtremeDataGridProps extends DataGridMethods {
  /**
   *是否可以对列重新排序。
   */
  allowColumnReordering: boolean;
  /**
   * 是否可以调整列的大小。
   */
  allowColumnResizing: boolean;
  /**
   * 指定是否应缓存数据。
   */
  cacheEnabled: boolean;
  /**
   * 是否应根据内容调整其宽度。
   */
  columnAutoWidth: boolean;
  /**
   * 列固定设置为true时 列属性上的fix设置为true
   */
  columnFixing: ColumnFixing;
  /**
   * 是否应隐藏列以适应屏幕或容器大小。
   */
  columnHidingEnabled: boolean;
  /**
   * 最小的列宽度
   * 默认值设置为100
   */
  columnMinWidth: number;
  /**
   * 调整列的大小
   */
  columnResizingMode: 'nextColumn' | 'widget';
  /**
   * 列信息
   */
  columns: any[];
  /**
   * 列宽
   */
  columnWidth: number | string;

  /**
   * 数据源
   */
  dataSource: DataSourceLikes;
  // dataSource: { type: Object, default: [] },
  /**
   * 过滤行
   */
  filterRow: FilterRow;
  /**
   * 是否禁用
   */
  disabled: boolean;
  /**
   * 配置编辑。
   */

  // editing: {
  //   type: Object as PropType<ColumnFixing>,
  //   default: {
  //     mode: 'row',
  //     allowUpdating: true,
  //     allowDeleting: true,
  //     allowAdding: true,
  //   },
  // },
  // 表格全局属性
  elementAttr: object;

  /**
   * 配置滚动。 配置固定
   */
  scrolling: Scrolling;
  /**
   * 配置标题过滤器功能。
   * 标题过滤器的弹出菜单列出所有列值。如果
   * 它们是数字或日期，则可以使用列的
   * headerFilter中的groupInterval属性对它们
   * 进行分组。您还可以使用dataSource属性为标题
   * 过滤器提供自定义数据源。
   */
  headerFilter: HeaderFilter;
  /**
   * 勾选框
   *
   */
  selection: SelectionBase;
  /**
   * 是否取消勾选
   */
  isCloseEidtClearSelection: boolean;
  /**
   * 通知 DataGrid 服务器的数据处理操作。
   */
  remoteOperations: string | boolean | RemoteOperationsSetting;
  /**
   * 显示列线
   */
  showColumnLines: boolean;
  /**
   * 显示边框
   */
  showBorders: boolean;
  /**
   * 显示行线
   */
  showRowLines: boolean;
  /**
   * 组件是否可见
   */
  visible: boolean;
  /**
   * 宽度
   */
  width: number | string;
  /**
   * 分页
   */
  pager: Pager;
  /**
   * 分页信息
   */
  paging: Paging;

  dataGridRefKey: string;
  // type: [Number, String, Function] as PropType<
  //   number | string | PropType<(...arg: any[]) => Promise<number | string>>
  // >,
  /**
   * @deprecated
   * 高度属性暂不传递，是否全屏后会存在问题
   */
  height: number | string;
}

/**
 * 按钮点击事件配置信息
 */
export interface DataGridActionType {
  /**
   * 获取选中的网格信息
   */
  getSelectedRowsData: <T = Recordable>() => T[];

  getInstance: <T = Recordable>() => T[];
}

/**
 * Methods方法
 */
export interface DataGridMethods extends DataGridCustomizeMethods {
  /**
   *
   */
  onCellClick?: (e: CellClickEvent) => void;
  /**
   * A function that is executed when a cell is double-clicked or double-tapped. Executed before onRowDblClick.
   */
  onCellDblClick?: (e: CellDblClickEvent) => void;
  /**
   * A function that is executed after the pointer enters or leaves a cell.
   */
  onCellHoverChanged?: (e: CellHoverChangedEvent) => void;
  /**
   * A function that is executed after a grid cell is created.
   */
  onCellPrepared?: (e: CellPreparedEvent) => void;
  /**
   * 渲染完成后事件
   */
  onContentReady: (e: ContentReadyEvent) => void;
  /**
   * A function that is executed before the context menu is rendered.
   */
  onContextMenuPreparing?: (e: ContextMenuPreparingEvent) => void;
  /**
   * A function that is executed before a cell or row switches to the editing state.
   */
  onEditingStart?: (e: EditingStartEvent) => void;
  /**
   * A function that is executed after an editor is created. Not executed for cells with an editCellTemplate.
   */
  onEditorPrepared?: (options: EditorPreparedEvent) => void;
  /**
   * A function used to customize a cell&apos;s editor. Not executed for cells with an editCellTemplate.
   */
  onEditorPreparing?: (e: EditorPreparingEvent) => void;
  /**
   * A function that is executed after data is exported.
   */
  onExported?: (e: ExportedEvent) => void;
  /**
   * A function that is executed before data is exported.
   */
  onExporting?: (e: ExportingEvent) => void;
  /**
   * A function that is executed before a file with exported data is saved to the user&apos;s local storage.
   */
  onFileSaving?: (e: FileSavingEvent) => void;
  /**
   * A function that is executed after the focused cell changes. Applies only to cells in data or group rows.
   */
  onFocusedCellChanged?: (e: FocusedCellChangedEvent) => void;
  /**
   * A function that is executed before the focused cell changes. Applies only to cells in data or group rows.
   */
  onFocusedCellChanging?: (e: FocusedCellChangingEvent) => void;
  /**
   * A function that is executed after the focused row changes. Applies only to data or group rows. focusedRowEnabled should be true.
   */
  onFocusedRowChanged?: (e: FocusedRowChangedEvent) => void;
  /**
   * A function that is executed before the focused row changes. Applies only to data or group rows. focusedRowEnabled should be true.
   */
  onFocusedRowChanging?: (e: FocusedRowChangingEvent) => void;
  /**
   * A function that is executed when a row is clicked or tapped.
   */
  onRowClick?: (e: RowClickEvent) => void;
  /**
   * A function that is executed when a row is double-clicked or double-tapped. Executed after onCellDblClick.
   */
  onRowDblClick?: (e: RowDblClickEvent) => void;
  /**
   * A function that is executed after a row is created.
   */
  onRowPrepared?: (e: RowPreparedEvent) => void;

  onInitialized?: (e: any) => void;
}

export interface DataGridCustomizeMethods {
  customizeContentReady: (e: ContentReadyEvent) => void;
}
