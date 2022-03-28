import type { Ref } from 'vue';
import type { dataGridPropsOptions, dataGridActionOptions } from '../types/datagrid';
import { provide, inject, ComputedRef } from 'vue';

const key = Symbol('devextreme-datagrid');

type Instance = dataGridActionOptions & {
  wrapRef?: Ref<Nullable<HTMLElement>>;
  getBindValues?: ComputedRef<Recordable>;
};

type RetInstance = Omit<Instance, 'getBindValues'> & {
  getBindValues: ComputedRef<dataGridPropsOptions>;
};

export function createTableContext(instance: Instance) {
  provide(key, instance);
}

export function useTableContext(): RetInstance {
  return inject(key) as RetInstance;
}
