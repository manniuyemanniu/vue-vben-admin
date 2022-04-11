import type { Ref } from 'vue';
import type {
  dropDownDataGridPropsOptionos,
  dropDownDataGridActionOptions,
} from '../types/dropdown-datagrid';
import { provide, inject, ComputedRef } from 'vue';

const key = Symbol('devextreme-datagrid');

type Instance = dropDownDataGridActionOptions & {
  wrapRef?: Ref<Nullable<HTMLElement>>;
  getBindValues?: ComputedRef<Recordable>;
};

type RetInstance = Omit<Instance, 'getBindValues'> & {
  getBindValues: ComputedRef<dropDownDataGridPropsOptionos>;
};

export function createDropDownDataGridContextContext(instance: Instance) {
  provide(key, instance);
}

export function useDropDownDataGridContext(): RetInstance {
  return inject(key) as RetInstance;
}
