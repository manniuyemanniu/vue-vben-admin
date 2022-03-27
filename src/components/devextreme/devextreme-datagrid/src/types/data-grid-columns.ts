/**
 *
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please describe your scenario in the following GitHub Issue, and we will suggest a public alternative: {@link https://github.com/DevExpress/DevExtreme/issues/17885|Internal Types}.
 */
export interface ColumnBase {
  /**
   * Aligns the content of the column.
   */
  alignment?: 'center' | 'left' | 'right';
  /**
   * Specifies whether a user can edit values in the column at runtime. By default, inherits the value of the editing.allowUpdating property.
   */
  allowEditing?: boolean;
  /**
   * Specifies whether data can be filtered by this column. Applies only if filterRow.visible is true.
   */
  allowFiltering?: boolean;
  /**
   * Specifies whether a user can fix the column at runtime. Applies only if columnFixing.enabled is true.
   */
  allowFixing?: boolean;
  /**
   * Specifies whether the header filter can be used to filter data by this column. Applies only if headerFilter.visible is true. By default, inherits the value of the allowFiltering property.
   */
  allowHeaderFiltering?: boolean;
  /**
   * Specifies whether a user can hide the column using the column chooser at runtime. Applies only if columnChooser.enabled is true.
   */
  allowHiding?: boolean;
  /**
   * Specifies whether this column can be used in column reordering at runtime. Applies only if allowColumnReordering is true.
   */
  allowReordering?: boolean;
  /**
   * Specifies whether a user can resize the column at runtime. Applies only if allowColumnResizing is true.
   */
  allowResizing?: boolean;
  /**
   * Specifies whether this column can be searched. Applies only if searchPanel.visible is true. Inherits the value of the allowFiltering property by default.
   */
  allowSearch?: boolean;
  /**
   * Specifies whether a user can sort rows by this column at runtime. Applies only if sorting.mode differs from &apos;none&apos;.
   */
  allowSorting?: boolean;
  /**
   * Calculates custom cell values. Use this function to create an unbound data column.
   */
  calculateCellValue?: any;
  /**
   * Calculates custom display values for column cells. Requires specifying the dataField or calculateCellValue property. Used in lookup optimization.
   */
  calculateDisplayValue?: any;
  /**
   * Specifies the column&apos;s custom rules to filter data.
   */
  calculateFilterExpression?: (
    filterValue: any,
    selectedFilterOperation: string,
    target: string,
  ) => string | Array<any> | Function;
  /**
   * Calculates custom values used to sort this column.
   */
  calculateSortValue?: any;
  /**
   * Specifies a caption for the column.
   */
  caption?: string;
  /**
   * Specifies a CSS class to be applied to the column.
   */
  cssClass?: string;
  /**
   * Customizes the text displayed in column cells.
   */
  customizeText?: any;
  /**
   * Binds the column to a field of the dataSource.
   */
  dataField?: string;
  /**
   * Casts column values to a specific data type.
   */
  dataType?: 'string' | 'number' | 'date' | 'boolean' | 'object' | 'datetime';
  /**
   * Configures the default UI component used for editing and filtering in the filter row.
   */
  editorOptions?: any;
  /**
   * Specifies whether HTML tags are displayed as plain text or applied to the values of the column.
   */
  encodeHtml?: boolean;
  /**
   * In a boolean column, replaces all false items with a specified text. Applies only if showEditorAlways property is false.
   */
  falseText?: string;
  /**
   * Specifies available filter operations. Applies if allowFiltering is true and the filterRow and/or filterPanel are visible.
   */
  filterOperations?: Array<
    | '='
    | '<>'
    | '<'
    | '<='
    | '>'
    | '>='
    | 'contains'
    | 'endswith'
    | 'isblank'
    | 'isnotblank'
    | 'notcontains'
    | 'startswith'
    | 'between'
    | 'anyof'
    | 'noneof'
  >;
  /**
   * Specifies whether a user changes the current filter by including (selecting) or excluding (clearing the selection of) values. Applies only if headerFilter.visible and allowHeaderFiltering are true.
   */
  filterType?: 'exclude' | 'include';
  /**
   * Specifies the column&apos;s filter value displayed in the filter row.
   */
  filterValue?: any;
  /**
   * Specifies values selected in the column&apos;s header filter.
   */
  filterValues?: Array<any>;
  /**
   * Fixes the column.
   */
  fixed?: boolean;
  /**
   * Specifies the UI component&apos;s edge to which the column is fixed. Applies only if columns[].fixed is true.
   */
  fixedPosition?: 'left' | 'right';
  /**
   * Configures the form item that the column produces in the editing state. Applies only if editing.mode is &apos;form&apos; or &apos;popup&apos;.
   */
  formItem?: any;
  /**
   * Formats a value before it is displayed in a column cell.
   */
  format?: any;
  /**
   * Specifies data settings for the header filter.
   */
  headerFilter?: any;
  /**
   * Specifies the order in which columns are hidden when the UI component adapts to the screen or container size. Ignored if allowColumnResizing is true and columnResizingMode is &apos;widget&apos;.
   */
  hidingPriority?: number;
  /**
   * Specifies whether the column organizes other columns into bands.
   */
  isBand?: boolean;
  /**
   * Specifies properties of a lookup column.
   */
  lookup?: any;
  /**
   * Specifies the minimum width of the column.
   */
  minWidth?: number;
  /**
   * Specifies the column&apos;s unique identifier. If not set in code, this value is inherited from the dataField.
   */
  name?: string;
  /**
   * Specifies the band column that owns the current column. Accepts the index of the band column in the columns array.
   */
  ownerBand?: number;
  /**
   * Specifies whether to render the column after other columns and elements. Use if column cells have a complex template. Requires the width property specified.
   */
  renderAsync?: boolean;
  /**
   * Specifies a filter operation that applies when users use the filter row to filter the column.
   */
  selectedFilterOperation?:
    | '<'
    | '<='
    | '<>'
    | '='
    | '>'
    | '>='
    | 'between'
    | 'contains'
    | 'endswith'
    | 'notcontains'
    | 'startswith';
  /**
   * Specifies a function to be invoked after the user has edited a cell value, but before it will be saved in the data source.
   */
  setCellValue?: (newData: any, value: any, currentRowData: any) => void | PromiseLike<void>;
  /**
   * Specifies whether the column displays its values using editors.
   */
  showEditorAlways?: boolean;
  /**
   * Specifies whether the column chooser can contain the column header.
   */
  showInColumnChooser?: boolean;
  /**
   * Specifies the index according to which columns participate in sorting.
   */
  sortIndex?: number;
  /**
   * Specifies the sort order of column values.
   */
  sortOrder?: 'asc' | 'desc';
  /**
   * Specifies a custom comparison function for sorting. Applies only when sorting is performed on the client.
   */
  sortingMethod?: (value1: any, value2: any) => number;
  /**
   * In a boolean column, replaces all true items with a specified text. Applies only if showEditorAlways property is false.
   */
  trueText?: string;
  /**
   * Specifies validation rules to be checked when cell values are updated.
   */
  validationRules?: Array<any>;
  /**
   * Specifies whether the column is visible, that is, occupies space in the table.
   */
  visible?: boolean;
  /**
   * Specifies the position of the column regarding other columns in the resulting UI component.
   */
  visibleIndex?: number;
  /**
   * Specifies the column&apos;s width in pixels or as a percentage. Ignored if it is less than minWidth.
   */
  width?: number | string;
}
