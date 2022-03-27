import { propTypes } from '/@/utils/propTypes';
import type { PropType } from 'vue';
import { dxFormItemOption } from './types/form';
import { ColCountByScreen } from './types/devextreme-form';

/**
 * devextreme表单基本Props
 */
export const formProps = {
  /**
   *标签是否对齐
   */
  alignItemLabels: propTypes.bool.def(true),
  /**
   * 组标签是否对齐
   */
  alignItemLabelsInAllGroups: propTypes.bool.def(true),
  /**
   * 表单数据
   */
  formData: { type: Object as PropType<Recordable>, default: {} },
  /**
   * 表单布局中的列数。
   */
  colCount: { type: [Number, String] as PropType<number | string>, default: 4 },
  caption: { type: String, default: '' },
  /**
   * 用于计算表单布局中列数的最小列宽。仅当colCount属性为"auto"时才适用。
   */
  minColWidth: propTypes.number.def(200),
  /**
   * 指定屏幕因子和表单布局中的列数之间的依赖关系。
   */
  colCountByScreen: {
    type: Object as PropType<ColCountByScreen>,
    default: { lg: 4, MD: 3, sm: 2, xs: 1 },
  },
  /**
   * 是否禁用
   */

  disabled: propTypes.bool.def(false),
  /**
   * 元素属性
   */
  elementAttr: { type: Object },
  /**
   * 高度
   */
  height: { type: [Number, String] as PropType<number | string>, default: undefined },

  /**
   * 指定标签相对于编辑器的位置。仅适用于其编辑器之外的标签
   */
  labelLocation: propTypes.oneOf(['left', 'right', 'top']).def('left'),
  /**
   * 标签样式
   */
  labelMode: propTypes.oneOf(['static', 'floating', 'hidden', 'outside']).def('outside'),
  /**
   * 是否只读
   */
  readOnly: propTypes.bool.def(false),
  /**
   * 必填显示标记
   */
  requiredMark: propTypes.string.def('*'),
  /**
   * 必填显示文本
   */
  requiredMessage: propTypes.string.def('{0} is required'),
  /**
   * 根据屏幕宽度返回对应的屏幕分类
   */
  screenByWidth: { type: Function as PropType<(e: number) => string>, default: screenByWidth },
  // /**
  //  * 指定是启用还是禁用表单滚动。
  //  */
  // scrollingEnabled: propTypes.bool.def(false),
  /**
   * 指定是否在表单标签的末尾显示冒号。仅适用于其编辑器之外的标签
   */
  showColonAfterLabel: propTypes.bool.def(true),
  /**
   * 是否为必填字段显示
   */
  showRequiredMark: propTypes.bool.def(true),
  /**
   * Specifies whether or not the total validation summary is displayed on the form.
   * 指定表单上是否显示总验证摘要。
   */
  showValidationSummary: propTypes.bool.def(false),
  // /**
  //  * 是否可见
  //  */
  // visible: propTypes.bool.def(true),
  // 表单配置规则
  schemas: {
    type: [Array] as PropType<dxFormItemOption[]>,
    default: () => [],
  },
};

/**
 * 根据屏幕宽度返回对应的屏幕分类
 * @param width 宽度
 * @returns
 */
export function screenByWidth(width: number): string {
  if (width < 768) return 'xs';
  if (width < 992) return 'sm';
  if (width < 1200) return 'md';
  return 'lg';
}
