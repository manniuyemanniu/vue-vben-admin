import { ContentReadyEvent } from 'devextreme/ui/data_grid';
import { ComputedRef, unref } from 'vue';
import { DevExtremeDataGridProps } from '../types/data-grid';

/**
 *
 * @param propsRef 处理自定义函数，有效化处理
 * @returns
 */
export function useCustomizeMethods(propsRef: ComputedRef<DevExtremeDataGridProps>) {
  const { isCloseEidtClearSelection, customizeContentReady } = unref(propsRef);
  let newcustomizeContentReady: (e: ContentReadyEvent) => void;
  if (isCloseEidtClearSelection) {
    if (typeof customizeContentReady == 'function') {
      newcustomizeContentReady = (e: ContentReadyEvent) => {
        console.log('newcustomizeContentReady');
        //分页、查询、筛选、刷新后清空选中
        e.component.clearSelection();
        //调用原方法
        customizeContentReady(e);
      };
    } else {
      newcustomizeContentReady = (e: ContentReadyEvent) => {
        console.log('newcustomizeContentReady');
        //分页、查询、筛选、刷新后清空选中
        e.component.clearSelection();
        //调用原方法
      };
    }
  } else {
    if (typeof customizeContentReady == 'function') {
      newcustomizeContentReady = customizeContentReady;
    } else {
      newcustomizeContentReady = (e: ContentReadyEvent) => {
        console.log('newcustomizeContentReady', e);
        console.log('newcustomizeContentReady');
        //调用原方法
      };
    }
  }
  return { newcustomizeContentReady };
}
