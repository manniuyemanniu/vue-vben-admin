<!--  -->
<template>
  <div class="p-0">
    <PageWrapper title="devextreme-from">
      <CollapseContainer title="devextreme-from表单示例">
        <DevExtremeForm ref="dxFormRef" :schemas="schemas" :formData="formData" />
        <!-- <DevExtremeForm @register="register" /> -->
      </CollapseContainer>

      <template #rightFooter>
        <DxButton :onClick="onClickinstance" text="onClickinstance" />

        <DxButton :onClick="onClickvalidate" text="onClickvalidate" />
      </template>
    </PageWrapper>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { CollapseContainer } from '/@/components/Container';
  import { PageWrapper } from '/@/components/Page';
  import {
    DevExtremeForm,
    dxFormActionType,
    dxFormItemOption,
  } from '/@/components/devextreme/devextreme-form/index';

  import DxButton from 'devextreme-vue/button';
  export default defineComponent({
    // name: '',
    components: { PageWrapper, CollapseContainer, DevExtremeForm, DxButton },
    setup() {
      const getSchemas = (): Array<dxFormItemOption> => {
        return [
          {
            typeOption: 'simple',
            colSpan: 1,
            dataField: 'ID',
            editorOptions: { mode: 'text', readonly: false, name: 'dxTextBox' },
            editorType: 'dxTextBox',
            isRequired: true,
          },
          {
            typeOption: 'simple',
            colSpan: 1,
            dataField: 'Name',
            editorOptions: { mode: 'text', readonly: false },
            editorType: 'dxTextBox',
          },
          {
            typeOption: 'simple',
            colSpan: 1,
            dataField: 'Position',
            editorOptions: { mode: 'text', readonly: false },
            editorType: 'dxTextBox',
          },
          {
            typeOption: 'simple',
            colSpan: 1,
            dataField: 'BirthDate',
            editorOptions: {
              showClearButton: true,
              useMaskBehavior: true,
              displayFormat: 'yyyy-MM-dd hh:mm:ss',
              type: 'datetime',
              showAnalogClock: false,
            },
            editorType: 'dxDateBox',
          },
          {
            typeOption: 'simple',
            colSpan: 1,
            dataField: 'HireDate',
            editorOptions: {
              showClearButton: true,
              useMaskBehavior: true,
              displayFormat: 'yyyy-MM-dd',
              type: 'date',
              showAnalogClock: false,
            },
            editorType: 'dxDateBox',
          },
          {
            typeOption: 'simple',
            colSpan: 1,
            dataField: 'Address',
            editorOptions: { mode: 'text', readonly: false },
            editorType: 'dxTextBox',
          },
          {
            typeOption: 'simple',
            colSpan: 1,
            dataField: 'City',
            editorOptions: { mode: 'text', readonly: false },
            editorType: 'dxTextBox',
          },
          {
            typeOption: 'empty',
            colSpan: 1,
          },
          {
            typeOption: 'simple',
            colSpan: 4,
            dataField: 'State',
            editorOptions: { mode: 'text', readonly: false },
            editorType: 'dxTextBox',
          },
          {
            typeOption: 'simple',
            colSpan: 1,
            dataField: 'ZipCode',
            editorOptions: { mode: 'text', readonly: false },
            editorType: 'dxTextBox',
          },
          {
            typeOption: 'simple',
            colSpan: 1,
            dataField: 'Home',
            editorOptions: { mode: 'text', readonly: false },
            editorType: 'dxTextBox',
          },
          {
            typeOption: 'simple',
            colSpan: 1,
            dataField: 'Mobile',
            editorOptions: { mode: 'text', readonly: false },
            editorType: 'dxTextBox',
          },
          {
            typeOption: 'empty',
            colSpan: 1,
          },
          {
            typeOption: 'simple',
            colSpan: 4,
            dataField: 'Email',
            editorOptions: { mode: 'email', readonly: false },
            editorType: 'dxTextBox',
          },
          {
            typeOption: 'simple',
            colSpan: 4,
            dataField: 'Skype',
            editorType: 'dxTextArea',
          },
        ];
      };
      const schemas = [...getSchemas()];
      const formData = {
        ID: 1,
        Name: 'John Heart',
        Position: 'CEO',
        BirthDate: '1964/03/16',
        HireDate: '1995/01/15',
        Notes:
          'John has been in the Audio/Video industry since 1990. He has led DevAV as its CEO since 2003.\r\nWhen not working hard as the CEO, John loves to golf and bowl. He once bowled a perfect game of 300.',
        Address: '351 S Hill St.',
        City: 'Los Angeles',
        State: 'CA',
        ZipCode: '90013',
        Home: '555-684-1334',
        Mobile: '555-684-1335',
        Email: 'jheart@dx-email.com',
        Skype:
          'John has been in the Audio/Video industry since 1990. He has led DevAV as its CEO since 2003.\r\nWhen not working hard as the CEO, John loves to golf and bowl. He once bowled a perfect game of 300.',
      };

      const dxFormRef = ref<Nullable<dxFormActionType>>(null);
      function getDxFormAction() {
        const dxFormAction = unref(dxFormRef);
        if (!dxFormAction) {
          throw new Error('tableAction is null');
        }
        return dxFormAction;
      }

      const onClickinstance = async () => {
        const result = await getDxFormAction().instance();
        console.log('onClickinstance', result);
      };
      const onClickvalidate = async () => {
        const result = await getDxFormAction().customizeValidate();

        console.log('onClickvalidate', result);
        console.log('onClickvalidate', formData);
      };

      return { schemas, formData, dxFormRef, onClickinstance, onClickvalidate };
    },
  });
</script>
