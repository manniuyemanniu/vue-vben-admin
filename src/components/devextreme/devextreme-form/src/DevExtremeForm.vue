<!-- devextreme-form -->
<template>
  <div class="form-container">
    <DxForm ref="dxFormElRef" v-bind="getBindValue">
      <!-- 处理表单列信息 -->
      <template v-for="item in getSchema" :key="item.dataField">
        <DxItem
          v-if="item.typeOption === 'simple'"
          :colSpan="item.colSpan"
          :data-field="item.dataField"
          :editor-type="item.editorType"
          :editor-options="item.editorOptions"
          :is-required="item.isRequired ?? false"
        />
        <DxItem v-if="item.typeOption === 'empty'" item-type="empty" :colSpan="item.colSpan" />
      </template>
    </DxForm>
  </div>
</template>

<script lang="ts">
  //#region 【import】
  import { computed, defineComponent, onMounted, Ref, ref, unref } from 'vue';
  import { DxForm, DxItem, DxEmptyItem } from 'devextreme-vue/form';
  import { deepMerge } from '/@/utils';
  import { dxFormItemOption, dxFormActionType, dxFormOptions } from './types/form';
  import { formProps } from './props';
  import DxAutocomplete from 'devextreme-vue/autocomplete'; //文本框，可在用户输入时提供建议。
  import DxCheckBox from 'devextreme-vue/check-box'; //复选框
  import DxCalendar from 'devextreme-vue/calendar'; // 日历
  import DxColorBox from 'devextreme-vue/color-box'; // 演示选择器
  import DxDateBox from 'devextreme-vue/date-box'; // 时间选择器
  import DxDropDownBox from 'devextreme-vue/drop-down-box'; // 下拉框
  import DxHtmlEditor from 'devextreme-vue/html-editor';
  import DxLookup from 'devextreme-vue/lookup';
  import DxNumberBox from 'devextreme-vue/number-box';
  import DxRadioGroup from 'devextreme-vue/radio-group';
  import DxRangeSlider from 'devextreme-vue/range-slider';
  import DxSelectBox from 'devextreme-vue/select-box';
  import DxSlider from 'devextreme-vue/slider';
  import DxSwitch from 'devextreme-vue/switch';
  import DxTagBox from 'devextreme-vue/tag-box';
  import DxTextArea from 'devextreme-vue/text-area';
  import DxTextBox from 'devextreme-vue/text-box';
  import { useDxFormEvent } from './hooks/useDxFormEvent';
  //#endregion
  export default defineComponent({
    // name: 'DevExtremeForm',
    components: {
      DxForm,
      DxItem,
      DxEmptyItem,
      DxAutocomplete,
      DxCheckBox,
      DxCalendar,
      DxColorBox,
      DxDateBox,
      DxDropDownBox,
      DxHtmlEditor,
      DxLookup,
      DxNumberBox,
      DxRadioGroup,
      DxRangeSlider,
      DxSelectBox,
      DxSlider,
      DxSwitch,
      DxTagBox,
      DxTextArea,
      DxTextBox,
      // DxTextArea,
    },
    props: formProps,
    setup(props, { emit, attrs }) {
      console.log('props', props);
      //表单响应式

      const dxFormElRef = ref<Nullable<dxFormActionType>>(null);
      const dataGridInstance = ref(null);
      //获取Items信息
      const schemaRef = ref<Nullable<dxFormItemOption[]>>(null);

      console.log('dxFormElRef', dxFormElRef.value);

      //#region 【Props数据处理】
      const propsRef = ref<Partial<dxFormOptions>>({});

      const getProps = computed((): dxFormOptions => {
        return { ...props, ...unref(propsRef) } as dxFormOptions;
      });
      // console.log('DevExtremeForm==>getProps', getProps.value);

      const getSchema = computed((): dxFormItemOption[] => {
        const schemas: dxFormItemOption[] = unref(schemaRef) || (unref(getProps).schemas as any);
        return schemas as dxFormItemOption[];
      });

      // console.log('DevExtremeForm==>getFormModel', getFormModel.value);
      //#endregion

      //#region 【v-bind绑定数据处理】
      /**
       * DxForm表单绑定属性
       */
      const getBindValue = computed(
        () => ({ ...attrs, ...props, ...unref(getProps) } as Recordable),
      );
      //#endregion

      async function setProps(formProps: Partial<dxFormOptions>): Promise<void> {
        propsRef.value = deepMerge(unref(propsRef) || {}, formProps);
      }

      //#region 【Hooks函数处理】

      const { instance, customizeValidate } = useDxFormEvent({
        // emit,
        getProps,
        // getFormModel,
        dxFormElRef: dxFormElRef as Ref<dxFormActionType>,
      });

      const formActionType: Partial<dxFormActionType> = {
        setProps,
        instance,
        customizeValidate,
      };
      //#endregion

      //#region 【生命周期函数】
      onMounted(() => {
        emit('register', formActionType);
      });

      //#endregion

      console.log('dataGridInstance', dataGridInstance.value);
      return {
        dxFormElRef,
        getBindValue,
        getSchema,
      };
    },
  });
</script>
