import {
  CellClickEvent,
  CellDblClickEvent,
  CellHoverChangedEvent,
  CellPreparedEvent,
  Column,
  ContentReadyEvent,
  ContextMenuPreparingEvent,
  Editing,
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
import { DataSourceLikes } from './datasource';

/**
 * 基本配置信息
 */
export interface dataGridPropsOptions extends dataGridMethodsOptions {
  /**
   * 指定提供键值以访问数据项的键属性（或多个属性）。
   * 每个键值必须是唯一的。此属性仅适用于 data 是简单数组的情况。
   */
  keyExpr: string;
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
   * 是否显示序号列
   */
  showIndexColumn: boolean;
  /**
   * 自定义列信息
   */
  // columns: any[];
  customColumn: Array<CustomizeColumns>;
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
  //  * @deprecated
   * 高度属性暂不传递，是否全屏后会存在问题
   */
  height: number | string;

  //#region 【自定义Props】
  /**
   * 自定义编辑是否启用
   */
  customizeEnableEditing: boolean;
  /**
   * 自定义编辑模式
   * type:'batch' | 'cell' | 'row' | 'form' | 'popup'
   */
  customizeEditingMode: 'batch' | 'cell' | 'row' | 'form' | 'popup';
  /**
   * 自定义编辑事件属性
   */
  customizeEditing: CustomizeEditing;

  //#endregion

  //#region 【Toolbar工具栏按钮设置】
  toolbarButtonSchema: Array<ToolbarButtonSchema>;
  //#endregion

  //#region 【export导出配置】
  /**
   * 导出文件名
   */
  exportFileName: string;
  //#endregion
}

/**
 * DataGrid原生Methods方法
 */
export interface dataGridMethodsOptions extends dataGridCustomizeMethods {
  /**
   * 单元格单击事件
   */
  onCellClick?: (e: CellClickEvent) => void;
  /**
   *双击或双击单元格时执行的功能。 在 onRowDblClick 之前执行。
   */
  onCellDblClick?: (e: CellDblClickEvent) => void;
  /**
   * 在指针进入或离开单元格后执行的函数。
   */
  onCellHoverChanged?: (e: CellHoverChangedEvent) => void;
  /**
   * 创建网格单元后执行的函数。
   */
  onCellPrepared?: (e: CellPreparedEvent) => void;
  /**
   * 渲染完成后事件
   */
  onContentReady: (e: ContentReadyEvent) => void;
  /**
   * 在呈现上下文菜单之前执行的功能。
   */
  onContextMenuPreparing?: (e: ContextMenuPreparingEvent) => void;
  /**
   * 在单元格或行切换到编辑状态之前执行的功能
   */
  onEditingStart?: (e: EditingStartEvent) => void;
  /**
   * 创建编辑器后执行的函数。不为具有 editCellTemplate 的单元格执行。
   */
  onEditorPrepared?: (options: EditorPreparedEvent) => void;
  /**
   * 用于自定义单元格编辑器的功能。不为具有 editCellTemplate 的单元格执行。
   */
  onEditorPreparing?: (e: EditorPreparingEvent) => void;
  /**
   * 导出数据后执行的函数。
   */
  onExported?: (e: ExportedEvent) => void;
  /**
   * 在导出数据之前执行的函数。
   */
  onExporting?: (e: ExportingEvent) => void;
  /**
   * 在将具有导出数据的文件保存到用户的本地存储之前执行的功能。
   */
  onFileSaving?: (e: FileSavingEvent) => void;
  /**
   * 在焦点单元格更改后执行的函数。 仅适用于数据行或组行中的单元格。
   */
  onFocusedCellChanged?: (e: FocusedCellChangedEvent) => void;
  /**
   *在焦点单元格更改之前执行的函数。 仅适用于数据行或组行中的单元格。
   */
  onFocusedCellChanging?: (e: FocusedCellChangingEvent) => void;
  /**
   * 在焦点行更改后执行的函数。 仅适用于数据或组行。 集中行启用应该是真的。
   */
  onFocusedRowChanged?: (e: FocusedRowChangedEvent) => void;
  /**
   * 在焦点行更改之前执行的函数。 仅适用于数据或组行。 集中行启用应该是真的。
   */
  onFocusedRowChanging?: (e: FocusedRowChangingEvent) => void;
  /**
   * 单击或点击行时执行的功能。
   */
  onRowClick?: (e: RowClickEvent) => void;
  /**
   * 双击或双击行时执行的功能。 在 onCellDblClick 之后执行。
   */
  onRowDblClick?: (e: RowDblClickEvent) => void;
  /**
   * 创建行后执行的函数。
   */
  onRowPrepared?: (e: RowPreparedEvent) => void;

  onInitialized?: (e: any) => void;
}

/**
 * DataGrid自定义Methods方法
 */
export interface dataGridCustomizeMethods {
  customizeContentReady: (e: ContentReadyEvent) => void;

  openModalOrDrawer: <T = any>(props?: boolean, data?: T, openOnSet?: boolean) => void;
}

/**
 * 按钮点击事件配置信息
 */
export interface dataGridActionOptions {
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
  // emit?: EmitType;
}

export type RegisterDxDataGridFn = (formInstance: dataGridActionOptions) => void;

export type UseDataGridReturnType = [RegisterDxDataGridFn, dataGridActionOptions];

//#region 【DataGrid基本配置】

//#region 【】
export interface ColumnFixing {
  /**
   * Enables column fixing.
   * 启用列固定。
   */
  enabled?: boolean;
  /**
   * Contains properties that specify texts for column fixing commands in the context menu of a column header.
   * 包含在列标题的上下文菜单中为列固定命令指定文本的属性。
   */
  texts?: ColumnFixingTexts;
}

export interface ColumnFixingTexts {
  /**
   * Specifies text for the context menu item that fixes a column.
   * 包含在列标题的上下文菜单中为列固定命令指定文本的属性。
   */
  fix?: string;
  /**
   * Specifies text for the context menu subitem that fixes a column to the left edge of the UI component.
   * 为将列固定到 UI 组件左边缘的上下文菜单子项指定文本。
   */
  leftPosition?: string;
  /**
   * Specifies text for the context menu subitem that fixes a column to the right edge of the UI component.
   * 为将列固定到 UI 组件右边缘的上下文菜单子项指定文本。
   */
  rightPosition?: string;
  /**
   * Specifies text for the context menu item that unfixes a column.
   * 为取消固定列的上下文菜单项指定文本。
   */
  unfix?: string;
}

//#endregion

//#region 【过滤行】
/**
 * 配置过滤器行。
 * */
export interface FilterRow {
  /**
   * 指定何时应用过滤器。
   */
  applyFilter?: 'auto' | 'onClick';
  /**
   * 指定当用户在应用过滤器的按钮上暂停时出现的提示文本。
   */
  applyFilterText?: string;
  /**
   * 为编辑器指定一个占位符，该占位符在用户选择“中间”时指定范围的结束。 过滤操作。
   */
  betweenEndText?: string;
  /**
   * 为编辑器指定一个占位符，该占位符在用户选择“中间”时指定范围的开始。 过滤操作。
   */
  betweenStartText?: string;
  /**
   * Specifies descriptions for filter operations on the filter list.
   * 指定过滤器列表上过滤器操作的描述。
   */
  operationDescriptions?: FilterRowOperationDescriptions;
  /**
   * Specifies text for the reset operation on the filter list.
   * 为过滤器列表上的重置操作指定文本。
   */
  resetOperationText?: string;
  /**
   * Specifies text for the item that clears the applied filter. Used only when
   * a cell of the filter row contains a select box.
   * 指定清除应用过滤器的项目的文本。 仅当使用
   * 过滤器行的一个单元格包含一个选择框。
   */
  showAllText?: string;
  /**
   * Specifies whether icons that open the filter lists are visible.
   * 指定打开过滤器列表的图标是否可见。
   */
  showOperationChooser?: boolean;
  /**
   * Specifies whether the filter row is visible.
   * 指定过滤器行是否可见。
   */
  visible?: boolean;
}

/**
 * 指定可用的过滤器操作。如果allowFiltering为true并且filterRow和/或filterPanel可见，则适用。
 */
export interface FilterRowOperationDescriptions {
  /**
   * A description for the &apos;between&apos; operation.
   * "between(之间)"的描述操作。
   */
  between?: string;
  /**
   * A description for the &apos;contains&apos; operation.
   * "between(包含)"的描述操作。
   */
  contains?: string;
  /**
   * A description for the &apos;endswith&apos; operation.
   * "endsWith(以..结束)"的描述操作。
   */
  endsWith?: string;
  /**
   * A description for the &apos;=&apos; operation.
   * "equal(等于)"的描述操作。
   */
  equal?: string;
  /**
   * A description for the &apos;&gt;&apos; operation.
   * "greaterThan(大于)"的描述操作。
   */
  greaterThan?: string;
  /**
   * A description for the &apos;&gt;=&apos; operation.
   * "greaterThanOrEqual(大于等于)"的描述操作。
   */
  greaterThanOrEqual?: string;
  /**
   * A description for the &apos;&lt;&apos; operation.
   * "lessThan(大于等于)"的描述操作。
   */
  lessThan?: string;
  /**
   * A description for the &apos;&lt;=&apos; operation.
   * "lessThanOrEqual(小于等于)"的描述操作。
   */
  lessThanOrEqual?: string;
  /**
   * A description for the &apos;notcontains&apos; operation.
   * "notContains(不包含)"的描述操作。
   */
  notContains?: string;
  /**
   * A description for the &apos;&lt;&gt;&apos; operation.
   * "notEqual(不相等)"的描述操作。
   */
  notEqual?: string;
  /**
   * A description for the &apos;startswith&apos; operation.
   * "startsWith(开始于)"的描述操作。
   */
  startsWith?: string;
}

//#endregion

//#region 【头部过滤】

/**
 * 配置标题过滤器功能。
 * 标题过滤器的弹出菜单列出所有列值。如果
 * 它们是数字或日期，则可以使用列的
 * headerFilter中的groupInterval属性对它们
 * 进行分组。您还可以使用dataSource属性为标题
 * 过滤器提供自定义数据源。
 */
export interface HeaderFilter {
  /**
   * Specifies whether searching is enabled in the header filter.
   * 指定是否在标题过滤器中启用搜索。
   */
  allowSearch?: boolean;
  /**
   * Specifies the height of the popup menu that contains values for filtering.
   * 指定包含过滤值的弹出菜单的高度。
   */
  height?: number;
  /**
   * Specifies a delay in milliseconds between when a user finishes typing
   * in the header filter&apos;s search panel, and when the search is executed.
   * 指定用户完成输入之间的延迟（毫秒）
   * 在标题过滤器的搜索面板中，以及执行搜索时。
   */
  searchTimeout?: number;
  /**
   * Contains properties that specify text for various elements of the popup menu.
   * 包含为弹出菜单的各种元素指定文本的属性。
   */
  texts?: HeaderFilterTexts;
  /**
   * Specifies whether header filter icons are visible.
   * 指定标题过滤器图标是否可见。
   */
  visible?: boolean;
  /**
   * Specifies the width of the popup menu that contains values for filtering.
   */
  width?: number;
}

/**
 * 包含为弹出菜单的各种元素指定文本的属性
 */
export interface HeaderFilterTexts {
  /**
   * Specifies text for the button that closes the popup menu without applying a filter.
   * 为关闭弹出菜单而不应用过滤器的按钮指定文本。
   */
  cancel?: string;
  /**
   * Specifies a name for the item that represents empty values in the popup menu.
   * 为表示弹出菜单中的空值的项目指定名称。
   */
  emptyValue?: string;
  /**
   * Specifies text for the button that applies the specified filter.
   * 为应用指定过滤器的按钮指定文本。
   */
  ok?: string;
}

//#endregion

//#region 【滚动条】
/**
 * 滚动条
 */
export interface Scrolling {
  /**
   * Specifies the scrolling mode.
   *
   * standard|标准==> 用户仅滚动单个页面。仅当页面的所有行都不适合UI组件的高度时，滚动才可用。在此模式下，寻呼机执行主导航，
   * 而滚动辅助。如果禁用了分页，则UI组件会同时加载所有行，这会降低UI组件的性能。在这种情况下，建议您使用其他滚动模式。
   * infinite|无限==>一旦滚动条达到其刻度的尽头，就会加载下一页。在这种模式下，用户从第一页到最后一页逐渐滚动数据。
   * 注:设置分组。当结合使用无限滚动和分组时，allowCollapsing属性为false
   * virtual、虚拟==>行进入视口时将被加载，并且在离开视口后将其删除。如果这些行需要时间来加载和呈现，
   * 它们将显示灰色框。渲染优化可以减少渲染时间并删除灰色框。在这种模式下，用户可以立即移动到任何页面。
   */

  mode?: 'infinite' | 'standard' | 'virtual';
  /**
   * Specifies the rendering mode for columns.
   * Applies when columns are left outside the viewport.
   * Requires the columnWidth, columnAutoWidth, or width (for all columns) property specified.
   * 指定列的呈现模式。当列保留在视口之外时应用。需要指定的columnWidth，
   * columnAutoWidth或width（对于所有列）属性。standard=标准 | virtual=虚拟
   * standard一次
   * 渲染所有已加载的行。
   * virtual
   * 仅渲染进入视口的那些行。如果pageSize大，则使用此模式。当前正在渲染的行可以显示为灰色框。
   */
  columnRenderingMode?: 'standard' | 'virtual';
  /**
   * Specifies whether the UI component should load adjacent pages.
   *  Applies only if scrolling.mode is &apos;virtual&apos; or &apos;infinite&apos;.
   *
   * 指定UI组件是否应加载相邻页面。仅在滚动时适用。模式是“virtual”或“infinite”。
   * 在虚拟和无限滚动模式下，页面按需加载。如果将此属性设置为true，则会提前加载相邻页面，
   * 以使滚动更流畅。此属性可能会降低旧设备的性能。
   */
  preloadEnabled?: boolean;
  /**
   * Specifies the rendering mode for loaded rows.
   * 指定已加载行的呈现方式。
   * 类型:string|默认值:standard
   * 接受的值: 'standard' | 'virtual'
   * standard一次
   * 渲染所有已加载的行。
   * virtual
   * 仅渲染进入视口的那些行。如果pageSize大，则使用此模式。当前正在渲染的行可以显示为灰色框。
   */
  rowRenderingMode?: 'standard' | 'virtual';
  /**
   * Specifies whether a user can scroll the content with a swipe gesture. Applies only if useNative is false.
   * 指定用户是否可以使用滑动手势滚动内容。仅在useNative为false时适用。
   */
  scrollByContent?: boolean;
  /**
   * Specifies whether a user can scroll the content with the scrollbar. Applies only if useNative is false.
   * 指定用户是否可以使用滚动条滚动内容。仅在useNative为false时适用。
   */
  scrollByThumb?: boolean;
  /**
   * Specifies when to show scrollbars. Applies only if useNative is false.
   * 指定何时显示滚动条。仅在useNative为false时适用。
   * 类型:string|默认值:standard
   * 接受的值: 'always' | 'never' | 'onHover' | 'onScroll'
   * 滚动条有助于垂直和水平滚动内容。当所有行都不适合UI组件的高度时，
   * 垂直滚动可用。当所有列都不适合UI组件的宽度时，可以使用水平滚动，
   * 当列具有固定宽度或columnAutoWidth属性设置为true时，可能会发生水平滚动。
   */
  showScrollbar?: 'always' | 'never' | 'onHover' | 'onScroll';
  /**
   * Specifies whether the widget should use native or simulated scrolling.
   * 指定UI组件应使用本机滚动还是模拟滚动。
   * 类型：Boolean | String
   * 默认值:auto
   */
  useNative?: boolean | 'auto';
  /**
   * Specifies whether to render rows after a user stops scrolling or at the same time as the user scrolls the widget.
   * 指定是在用户停止滚动之后还是在用户滚动 DataGrid 的同时呈现行。
   * true	Rows are rendered after a user stops scrolling.In this mode, row content may take time to appear, but scrolling is smoother.
   * * true 用户停止滚动后呈现行。在此模式下，行内容可能需要一段时间才能显示，但滚动更流畅。
   * false	Rows are rendered at the same time as the user scrolls the DataGrid.In this mode, row content is displayed quicker, but the component performance during scrolling may be lowered.
   * false 在用户滚动DataGrid的同时渲染行。在这种模式下，行内容显示得更快，但滚动时组件性能可能会降低。
   * undefined	The mode is defined automatically based on the row content.
   * undefined 模式是根据行内容自动定义的。
   */
  renderAsync?: boolean;
}

export interface SelectionBase {
  /**
   * Makes selection deferred.
   * 推迟选择。
   */
  deferred?: boolean;
  /**
   * Specifies the mode in which all the records are selected. Applies only if selection.allowSelectAll is true.
   * 指定选择所有记录的模式。 仅当 selection.allowSelectAll 为 true 时适用。
   */
  selectAllMode?: 'allPages' | 'page';
  /**
   * Specifies when to display the selection column and row selection checkboxes. Applies only if selection.mode is &apos;multiple&apos;.
   * 指定何时显示选择列和行选择复选框。 仅当 selection.mode 为“multiple”时才适用。
   */
  showCheckBoxesMode?: 'always' | 'none' | 'onClick' | 'onLongTap';
  /**
   * Allows users to simultaneously select all or current page rows (depending on the selectAllMode).
   * 允许用户同时选择所有或当前页面行（取决于 selectAllMode）。
   */
  allowSelectAll?: boolean;
  /**
   * Specifies the selection mode.
   * 指定选择模式。
   * multiple-可选择多行
   * single 只能选择一行
   */
  mode?: 'multiple' | 'none' | 'single';
}

//#endregion

export interface RemoteOperationsSetting {
  /**
   * Specifies whether or not filtering must be performed on the server side.
   */
  filtering?: boolean;
  /**
   * Specifies whether paging by groups should be performed on the server side.
   */
  groupPaging?: boolean;
  /**
   * Specifies whether or not grouping must be performed on the server side.
   */
  grouping?: boolean;
  /**
   * Specifies whether or not paging must be performed on the server side.
   */
  paging?: boolean;
  /**
   * Specifies whether or not sorting must be performed on the server side.
   */
  sorting?: boolean;
  /**
   * Specifies whether or not summaries summaries are calculated on the server-side.
   */
  summary?: boolean;
}

//#region  【Page分页】
/**
 * 分页配置
 */
export interface Pager {
  /**
   * Specifies the available page sizes in the page size selector.
   * 在页面大小选择器中指定可用的页面大小。
   */
  allowedPageSizes?: Array<number | 'all'> | 'auto';
  /**
   * Specifies the pager&apos;s display mode.
   * 指定分页的显示模式。
   */
  displayMode?: 'adaptive' | 'compact' | 'full';
  /**
   * Specifies the page information text.
   * 指定页面信息文本。
   */
  infoText?: string;
  /**
   * Specifies whether to show the page information.
   * 指定是否显示页面信息。
   */
  showInfo?: boolean;
  /**
   * Specifies whether to show navigation buttons.
   * 指定是否显示导航按钮。
   */
  showNavigationButtons?: boolean;
  /**
   * Specifies whether to show the page size selector.
   * 指定是否显示页面大小选择器。
   */
  showPageSizeSelector?: boolean;
  /**
   * Specifies whether the pager is visible.
   * 指定寻呼机是否可见。
   */
  visible?: boolean | 'auto';
}

/**
 * 页数配置
 */
export interface Paging {
  /**
   * Enables paging.
   */
  enabled?: boolean;
  /**
   * Specifies the page to be displayed using a zero-based index.
   */
  pageIndex?: number;
  /**
   * Specifies the page size.
   */
  pageSize?: number;
}

//#endregion

//#region 【datagrid编辑事件】
/**
 * 直接使用
 */
export type CustomizeEditing = Editing;

//#endregion

//#region 【列配置信息】

export type CustomizeColumns = Column & { flag?: string };

//#endregion

//#region 【Toolbar工具栏】
/**
 * Toolbar工具栏按钮设置
 */
export interface ToolbarButtonSchema {
  // 是否禁用
  disabled?: boolean;
  // 元素属性
  elementAttr?: any;
  // 图标
  icon?: string;
  //造型模式
  stylingMode?: 'text' | 'outlined' | 'contained';
  //标签索引
  tabIndex?: number;
  //按钮文本
  text: string;
  //按钮类型
  type?: 'back' | 'danger' | 'default' | 'normal' | 'success';
  //点击事件
  onClick?: Function;
  //是否显示
  visible?: boolean;
  //显示位置
  location?: 'after' | 'before' | 'center';
  //按钮类型
  onClickType: clickType;
}

/**
 * 按钮点击类型
 */
export enum clickType {
  createClick = 'createClick', //创建事件
  editClick = 'editClick', //编辑事件
  delClick = 'delClick', //删除事件
  exportAllClick = 'exportAllClick', //导出全部事件
  exportSelectClick = 'exportSelectClick', //导出选中事件
  exportPageClick = 'exportPageClick', //导出当前页事件
  clearFilterClick = 'clearFilterClick', //清除筛选器事件
  showColumnChooserClick = 'showColumnChooserClick', //列选择器事件
  importClick = 'importClick', //导入
  developClick = 'developClick', //开发者按钮
  orderClick = 'orderClick', //其他按钮事件,当传入的function为undefined时没有默认的function方法
}

export interface ToolbarDropDownButtonSchema {
  //按钮文本
  text: string;
  // 图标
  icon?: string;
}
//#endregion
//#endregion
