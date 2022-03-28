import { provide, inject, ComputedRef } from 'vue';
import type { Ref } from 'vue';
import { dxFormActionType, dxFormOptions } from '../types/form';

const key = Symbol('devextreme-dxform');

type Instance = dxFormActionType & {
  wrapRef?: Ref<Nullable<HTMLElement>>;
  getBindValues?: ComputedRef<Recordable>;
};

type RetInstance = Omit<Instance, 'getBindValues'> & {
  getBindValues: ComputedRef<dxFormOptions>;
};

export function createDxFormContext(instance: Instance) {
  provide(key, instance);
}

export function useDxFormContext(): RetInstance {
  return inject(key) as RetInstance;
}

// import type { InjectionKey } from 'vue';
// import { createContext, useContext } from '/@/hooks/core/useContext';

// export interface FormContextProps {
//   resetAction: () => Promise<void>;
//   submitAction: () => Promise<void>;
// }

// const key: InjectionKey<FormContextProps> = Symbol();

// export function createFormContext(context: FormContextProps) {
//   return createContext<FormContextProps>(context, key);
// }

// export function useFormContext() {
//   return useContext<FormContextProps>(key);
// }
