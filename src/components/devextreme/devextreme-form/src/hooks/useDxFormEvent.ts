/**
 *
 * @returns 封装dxFrom事件
 */

import { ValidationResult } from 'devextreme/ui/validation_group';
import { ComputedRef, Ref } from 'vue';
import { dxFormActionType, dxFormOptions } from '../types/form';

interface UseDxFormActionContext {
  getProps: ComputedRef<dxFormOptions>;
  dxFormElRef: Ref<dxFormActionType>;
}

export function useDxFormEvent({ getProps, dxFormElRef }: UseDxFormActionContext) {
  console.log('getProps', getProps);
  function instance(): any {
    const result = dxFormElRef.value.instance;
    return result;
  }
  async function customizeValidate(): Promise<ValidationResult> {
    const dxFromInstance = dxFormElRef.value.instance as any;
    const result = dxFromInstance.validate();
    return result;
  }
  return { instance, customizeValidate };
}
