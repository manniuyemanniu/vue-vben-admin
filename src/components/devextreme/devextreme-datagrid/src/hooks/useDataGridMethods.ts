import { ComputedRef } from 'vue';
import { DevExtremeDataGridProps } from '../types/data-grid';

export function useDataGridMethods(propsRef: ComputedRef<DevExtremeDataGridProps>) {
  console.log('useDataGridMethods==>propsRef', propsRef);
}
