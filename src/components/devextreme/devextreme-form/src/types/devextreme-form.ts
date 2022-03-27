import { DevextremeButtonSchema } from '/@/components/devextreme/devextreme-button/src/types/devextreme-button';

export interface ColCountByScreen {
  /**
       * 
    大屏幕尺寸的列数。
      */
  lg: number;

  /**
    中等大小屏幕的列数。
    */
  MD: number;
  /**
     * 
    小屏幕的列数。
    */
  sm: number;
  /**
     * 
    超小屏幕的列数。
    */
  xs: number;
}

export interface DevextremeFormSchema {
  /**
   * 指定绑定到当前表单项的 formData 对象字段的路径。
   */
  dataField: string;
}

/**
 * 按钮组
 */
export interface ButtonItemSchema {
  /**
   * Configures the button.
   */
  buttonOptions?: DevextremeButtonSchema;
  /**
   * Specifies how many columns the item spans.
   */
  colSpan?: number;
  /**
   * Specifies a CSS class to be applied to the item.
   */
  cssClass?: string;
  /**
   * Specifies the button&apos;s horizontal alignment.
   */
  horizontalAlignment?: 'center' | 'left' | 'right';
  /**
   * Specifies the item&apos;s type. Set it to &apos;button&apos; to create a button item.
   */
  itemType?: 'empty' | 'group' | 'simple' | 'tabbed' | 'button';
  /**
   * Specifies the item&apos;s identifier.
   */
  name?: string;
  /**
   * Specifies the button&apos;s vertical alignment.
   */
  verticalAlignment?: 'bottom' | 'center' | 'top';
  /**
   * Specifies whether the item is visible.
   */
  visible?: boolean;
  /**
   * Specifies the item&apos;s position regarding other items in a group, tab, or the whole UI component.
   */
  visibleIndex?: number;
}
