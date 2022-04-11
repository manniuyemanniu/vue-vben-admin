import { Properties } from 'devextreme/ui/popup';
import { DataSourceLikes } from '/@/components/devextreme/dexextreme-datagrid-v2/src/types/datasource';

export type PopupProperties = Properties;
export interface dropDownDataGridPropsOptionos {
  /**
   * 数据源
   */
  customDataSource: DataSourceLikes;
  /**
   *
   */
  value?: number | string;
  /**
   * 指定哪个数据字段为 UI 组件的值提供唯一值
   */
  valueExpr: string;
  /**
   *
   */
  displayExpr: string | Function;
  /**
   *
   */
  onValueChanged?: Function;

  /**
   * Configures the drop-down field which holds the content.
   * 配置包含内容的下拉字段。
   */
  dropDownOptions?: PopupProperties;
  /**
   * 指定 UI 组件是否允许用户输入自定义值。
   */
  acceptCustomValue?: boolean;
  /**
   * 指定用户是否可以通过单击文本字段来打开下拉列表。
   */
  openOnFieldClick?: boolean;
  /**
   * 指定当编辑器的值为空时显示的文本字符串。
   */
  placeholder?: string;

  /**
   * 模糊查询包括字段
   */
  searchExpr: Array<String>;

  /**
   * 行索引
   */
  rowIndex: number;
  /**
   * 文本框设置
   */
  inputAttr: any;
  // gridBoxOpened: boolean;

  // /**
  //  * 指定或指示焦点数据行的索引。
  //  */
  // focusedRowIndex: number;
  // /**
  //  * 指定最初或当前聚焦的网格行的键
  //  */
  // focusedRowKey: any;
}

export interface dropDownDataGridActionOptions {
  /**
   *
   */
  setProps: (props: Partial<dropDownDataGridPropsOptionos>) => Promise<void>;
  /**
   * 获取dropdown初始化信息
   */
  instance: () => any;
  /**
   * 获取dataGrid的初始化信息
   */
  datagridinstance: () => any;
}

export type RegisterFn = (formInstance: dropDownDataGridActionOptions) => void;

export type UseDropDownDataGridReturnType = [RegisterFn, dropDownDataGridActionOptions];
