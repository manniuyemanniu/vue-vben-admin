<!-- 创建或编辑Modal -->
<template>
  <BasicDrawer
    v-bind="$attrs"
    showFooter
    :maskClosable="false"
    :keyboard="false"
    :isDetail="true"
    :showDetailBack="false"
    title="CreateOrEditModal"
    @ok="handleSubmit"
  >
    <!-- :showOkBtn="false"
    :showCancelBtn="false" -->
    <!-- 只有为详情页时才有效
    <template #titleToolbar> toolbar </template> -->

    <CollapseContainer title="devextreme-from表单示例">
      <!-- <DevExtremeForm :schemas="schemas" :formData="formData" /> -->
      <DevExtremeForm @register="registerDxFrom" />
    </CollapseContainer>

    <!-- footer底部栏按钮模块儿,insertFooter最左|默认取消|centerFooter按钮中|默认确认|appendFooter最右 -->
    <!-- <template #insertFooter>
      <a-button type="primary"> 保存</a-button>
    </template>
    <template #centerFooter>
      <a-button type="primary"> 保存并继续</a-button>
    </template>
    <template #appendFooter>
      <a-button type="primary"> 取消</a-button>
    </template> -->
  </BasicDrawer>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import { CollapseContainer } from '/@/components/Container';
  import {
    dxFormItemOption,
    useDxForm,
    DevExtremeForm,
  } from '/@/components/devextreme/devextreme-form';
  import { BasicDrawer } from '/@/components/Drawer';
  export default defineComponent({
    name: 'CreateOrEditModal',
    components: { BasicDrawer, DevExtremeForm, CollapseContainer },
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
            colSpan: 2,
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
      const [
        registerDxFrom,
        { instance: dxFromInstance, customizeValidate: dxFormCustomizeValidate },
      ] = useDxForm({
        formData: formData,
        schemas: schemas,
      });

      //#region 【按钮事件】

      const handleSubmit = () => {
        console.log('formData', formData.Email);
        console.log('handleSubmit');
      };

      //#endregion

      return { registerDxFrom, dxFromInstance, dxFormCustomizeValidate, handleSubmit };
    },
  });
</script>
