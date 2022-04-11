import { propTypes } from '/@/utils/propTypes';
// import { CustomizeColumns } from '../../dexextreme-datagrid-v2';
import { PopupProperties } from './types/dropdown-datagrid';
import { DataSourceLikes } from '/@/components/devextreme/dexextreme-datagrid-v2/src/types/datasource';
import type { PropType } from 'vue';

export const dropDownDataGridProps = {
  /**
   * 数据源
   */
  customDataSource: { type: Object as PropType<DataSourceLikes>, default: [] },

  /**
   *指定哪个数据字段为 UI 组件的值提供唯一值。
   */
  valueExpr: { type: String },
  /**
   * 指定应显示其值的数据字段。
   */
  displayExpr: { type: [Function, String] as PropType<((data: any) => string) | string> },
  /**
   * 指定当编辑器的值为空时显示的文本字符串。
   */
  placeholder: propTypes.string.def(''),
  /**
   * 传入的值
   */
  value: { type: [Number, String] as PropType<number | string>, default: null },

  /**
   * 指定用户是否可以通过单击文本字段来打开下拉列表。
   */
  openOnFieldClick: propTypes.bool.def(false),

  /**
   * 指定是否在 UI 组件中显示清除按钮。
   */
  showClearButton: propTypes.bool.def(true),
  /**
   * 指定 UI 组件是否允许用户输入自定义值。
   */
  acceptCustomValue: propTypes.bool.def(true),

  /**
   * Configures the drop-down field which holds the content.
   * 配置包含内容的下拉字段。
   */
  dropDownOptions: { type: Object as PropType<PopupProperties>, default: { width: 500 } },

  /**
   * 模糊查询包括字段
   */
  searchExpr: { type: Array as PropType<Array<string>>, default: [] },
  /**
   * 选中事件
   */
  onValueChanged: {
    type: Function,
    default: () => function () {},
  },
  /**
   * 行索引
   */
  rowIndex: { type: Number },

  inputAttr: {
    type: Object,
    default: {
      class: 'drop-down-input',
    },
  },
};
