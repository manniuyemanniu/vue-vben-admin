import { ComputedRef, unref } from 'vue';
import { CustomizeEditing, dataGridPropsOptions } from '../types/datagrid';

interface Editing {
  /**
   * 自定义编辑是否启用
   */
  customizeEnableEditing: boolean;
  /**
   * 自定义编辑模式
   * type:'batch' | 'cell' | 'row' | 'form' | 'popup'
   */
  customizeEditingMode: 'popup' | 'form';
  /**
   * 自定义编辑事件属性
   */
  customizeEditing: CustomizeEditing;
}

export function useCustomizeAttributes(getProps: ComputedRef<dataGridPropsOptions>) {
  function customizeEditingMethods(): Editing {
    const { customizeEnableEditing, customizeEditingMode, customizeEditing } = unref(getProps);

    return { customizeEnableEditing, customizeEditingMode, customizeEditing };
  }

  return {
    customizeEditingMethods,
  };
}
