// import { ValidationResult } from 'devextreme/ui/validation_group';
import { ValidationResult } from 'devextreme/ui/validation_group';
import { nextTick, onUnmounted, ref, unref, watch } from 'vue';
import { dxFormActionType, dxFormOptions, UseDxFormReturnType } from '../types/form';
import { DynamicProps } from '/#/utils';
import { getDynamicProps } from '/@/utils';
import { isProdMode } from '/@/utils/env';
import { error } from '/@/utils/log';

type Props = Partial<DynamicProps<dxFormOptions>>;
export function useDxForm(props?: Props): UseDxFormReturnType {
  console.log('useDxForm==>Props', props);
  const formRef = ref<Nullable<dxFormActionType>>(null);
  // const loadedRef = ref<Nullable<boolean>>(false);

  async function getDxForm() {
    const form = unref(formRef);
    if (!form) {
      error(
        'The form instance has not been obtained, please make sure that the form has been rendered when performing the form operation!',
      );
    }
    await nextTick();
    return form as dxFormActionType;
  }

  function register(instance: dxFormActionType) {
    isProdMode() &&
      onUnmounted(() => {
        formRef.value = null;
      });
    if (isProdMode() && instance === unref(formRef)) return;

    formRef.value = instance;

    watch(
      () => props,
      () => {
        props && instance.setProps(getDynamicProps(props));
      },
      {
        immediate: true,
        deep: true,
      },
    );
  }

  const methods: dxFormActionType = {
    setProps: async (formProps: Partial<dxFormOptions>) => {
      const form = await getDxForm();
      form.setProps(formProps);
    },
    instance: async (): Promise<any> => {
      const form = await getDxForm();
      return form.instance();
    },
    customizeValidate: async (): Promise<ValidationResult> => {
      const form = await getDxForm();
      return new Promise((resolve) => {
        const result = form.customizeValidate();
        resolve(result);
      });
    },
  };
  return [register, methods];
}
