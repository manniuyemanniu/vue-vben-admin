import { EditorEnterKeyEvent, FieldDataChangedEvent } from 'devextreme/ui/form';
import { ValidationResult } from 'devextreme/ui/validation_group';
import { ComponentType } from './componentType';
// import { ValidationResult } from 'devextreme/ui/validation_group';
import { ColCountByScreen } from './devextreme-form';
import { ValidationRule } from './validation';

/**
 * form自定义props/attrs
 */
// export interface DevextremeCustomizeFormSchema {}

export interface dxFormOptions {
  /**
   * Specifies whether all item labels are aligned. Applies only to labels outside their editors (see labelMode).
   * 指定所有项目标签是否对齐。只适用于编辑器之外的标签(请参阅labelMode)。
   */
  alignItemLabels?: boolean;
  /**
   * Specifies whether item labels in all groups are aligned. Applies only to labels outside their editors (see labelMode).
   * 指定所有组中的项目标签是否对齐。只适用于编辑器之外的标签(请参阅labelMode)。
   */
  alignItemLabelsInAllGroups?: boolean;

  /**
   * 表单布局中的列数。
   */
  colCount?: number | 'auto';
  /**
   * 指定屏幕因子和表单布局中的列数之间的依赖关系。
   */
  colCountByScreen?: ColCountByScreen;
  /**
   * Provides the Form&apos;s data. Gets updated every time form fields change.
   * 提供表单数据。每次表单字段更改时更新。
   */
  formData?: any;
  /**
   * 是否禁用
   */

  disabled?: boolean;
  /**
   * 元素属性
   */
  elementAttr?: any;
  /**
   * 高度
   */
  height?: number | string;

  /**
   * 指定标签相对于编辑器的位置。仅适用于其编辑器之外的标签
   */
  labelLocation?: 'left' | 'right' | 'top';
  /**
   * 标签样式
   */
  labelMode?: 'static' | 'floating' | 'hidden' | 'outside';
  /**
   * The minimum column width used for calculating column count in the form layout. Applies only if colCount property is &apos;auto&apos;.
   * 列数的最小列宽。仅当colCount属性为auto'时适用。
   */
  minColWidth?: number;
  /**
   * 是否只读
   */
  readOnly?: boolean;
  /**
   * 必填显示标记
   */
  requiredMark?: string;
  /**
   * 必填显示文本
   */
  requiredMessage?: string;
  /**
   * Specifies a function that categorizes screens by their width.
   * 指定按屏幕宽度对屏幕进行分类的函数。
   */
  screenByWidth?: Function;
  // /**
  //  * 指定是启用还是禁用表单滚动。
  //  */
  // scrollingEnabled?: boolean;
  /**
   * 指定是否在表单标签的末尾显示冒号。仅适用于其编辑器之外的标签
   */
  showColonAfterLabel?: boolean;
  /**
   * 是否为必填字段显示
   */
  showRequiredMark?: boolean;
  /**
   * Specifies whether or not the total validation summary is displayed on the form.
   * 指定表单上是否显示总验证摘要。
   */
  showValidationSummary?: boolean;
  /**
   * Gives a name to the internal validation group.
   * 为内部验证组命名。
   */
  validationGroup?: string;
  /**
   * Item子项
   */
  schemas?: dxFormItemOption[];

  /**
   * A function that is executed when the Enter key has been pressed while an editor is focused.
   */
  onEditorEnterKey?: (e: EditorEnterKeyEvent) => void;
  /**
   * A function that is executed when the value of a formData object field is changed.
   */
  onFieldDataChanged?: (e: FieldDataChangedEvent) => void;
}

export interface dxFormItemOption {
  typeOption?: 'simple' | 'empty';
  /**
   * Specifies the number of columns spanned by the item.
   * 指定项所跨的列数。
   */
  colSpan?: number;
  /**
   * Specifies a CSS class to be applied to the form item.
   * 指定要应用于表单项的CSS类。
   */
  cssClass?: string;
  /**
   * Specifies the path to the formData object field bound to the current form item.
   * 指定绑定到当前表单项的formData对象字段的路径。
   */
  dataField?: string;
  /**
   * Configures the form item&apos;s editor.
   * 配置表单项编辑器。各个编辑器的配置
   */
  editorOptions?: any;
  /**
   * Specifies which editor UI component is used to display and edit the form item value.
   * 指定用于显示和编辑表单项值的编辑器UI组件。
   */
  editorType?: ComponentType;
  /**
   * Specifies the help text displayed for the current form item.
   * 指定为当前窗体项显示的帮助文本。
   */
  helpText?: string;
  /**
   * Specifies whether the current form item is required.
   * 指定是否需要当前表单项。
   */
  isRequired?: boolean;
  /**
   * Specifies the item&apos;s type. Set it to &apos;simple&apos; to create a simple item.
   * 指定项目的类型。将其设置为simple创建一个简单的项。
   */
  // itemType?: 'empty' | 'group' | 'simple' | 'tabbed' | 'button';
  /**
   * Specifies properties for the form item label.
   */
  label?: {
    /**
     * Specifies the label&apos;s horizontal alignment. Applies only to labels outside their editors (see labelMode).
     */
    alignment?: 'center' | 'left' | 'right';
    /**
     * Specifies the location of a label against the editor. Applies only to labels outside their editors (see labelMode).
     */
    location?: 'left' | 'right' | 'top';
    /**
     * Specifies whether a colon is displayed at the end of the current label. Applies only to labels outside their editors (see labelMode).
     */
    showColon?: boolean;
    /**
     * Specifies the label text.
     */
    text?: string;
    /**
     * Controls the visibility of the label outside the editor.
     */
    visible?: boolean;

    validationRules?: Array<ValidationRule>;
  };
  /**
   * Specifies a name that identifies the form item.
   * 指定标识表单项的名称。
   */
  name?: string;
  /**
   *
   */
  visible?: boolean;
  /**
   * Specifies the sequence number of the item in a form, group or tab.
   */
  visibleIndex?: number;
}

/**
 * 空白占位Item
 * @deprecated Use EmptyItem instead
 */
export interface dxFormEmptyItem {
  /**
   * Specifies the item&apos;s type. Set it to &apos;empty&apos; to create an empty item.
   */
  itemType?: 'empty';
  /**
   * Specifies the number of columns spanned by the item.
   */
  colSpan?: number;
  /**
   * Specifies a CSS class to be applied to the form item.
   */
  cssClass?: string;
  /**
   * Specifies a name that identifies the form item.
   */
  name?: string;
  /**
   * Specifies whether or not the current form item is visible.
   */
  visible?: boolean;
  /**
   * Specifies the sequence number of the item in a form, group or tab.
   */
  visibleIndex?: number;
}

export interface dxFormActionType {
  setProps: (formProps: Partial<dxFormOptions>) => Promise<void>;
  instance: () => any;
  customizeValidate: () => Promise<ValidationResult>;
}

export type RegisterFn = (formInstance: dxFormActionType) => void;

export type UseDxFormReturnType = [RegisterFn, dxFormActionType];
