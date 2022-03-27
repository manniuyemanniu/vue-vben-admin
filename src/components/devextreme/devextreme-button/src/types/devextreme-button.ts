/**
 * 列表页面按钮设置
 */
export interface DevextremeButtonSchema {
  // 是否禁用
  disabled?: boolean;
  // 元素属性
  elementAttr?: any;
  // 高度
  height?: number | string;
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
}
