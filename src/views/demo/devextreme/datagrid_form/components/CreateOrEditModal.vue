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

    <CollapseContainer title="devextreme-datagrid网格示例" class="mt-4">
      <EditCellDataGrid @register="registerDxDataGrid">
        <!-- <template #StateIDCellTemplate="{ data }">
            <span v-if="data.data.StateID === 5" style="text-decoration: line-through; color: red">
              {{ data.data.StateID }}
            </span>
            <span v-else>{{ data.data.StateID }}</span>
          </template> -->
        <template #dropDownBoxEditor="{ data: cellInfo }">
          <DropDownDataGrid
            :value="cellInfo.value"
            :rowIndex="cellInfo.rowIndex"
            valueExpr="ID"
            displayExpr="ID"
            :searchExpr="searchExpr"
            :on-value-changed="onValueChanged"
            :customDataSource="employees"
            :dropDownOptions="{ height: 500, width: 500 }"
          />
        </template>
      </EditCellDataGrid>
    </CollapseContainer>
  </BasicDrawer>
</template>

<script lang="ts">
  import { createStore } from 'devextreme-aspnet-data-nojquery';
  import { defineComponent } from 'vue';

  import { CollapseContainer } from '/@/components/Container';
  import {
    dxFormItemOption,
    useDxForm,
    DevExtremeForm,
  } from '/@/components/devextreme/devextreme-form';
  import { useDataGrid } from '/@/components/devextreme/dexextreme-datagrid-v2/src/hooks/useDataGrid';
  import {
    CustomizeColumns,
    EditCellDataGrid,
  } from '/@/components/devextreme/dexextreme-datagrid-v2';

  import { DropDownDataGrid } from '/@/components/devextreme/dexextreme-dropdown-datagrid';
  import { BasicDrawer } from '/@/components/Drawer';
  import { isDef } from '/@/utils/is';
  export default defineComponent({
    name: 'CreateOrEditModal',
    components: {
      BasicDrawer,
      DevExtremeForm,
      CollapseContainer,
      DropDownDataGrid,
      EditCellDataGrid,
    },
    setup() {
      //#region 【表单】
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
      //#endregion

      //#region 【网格】
      const url = 'https://js.devexpress.com/Demos/Mvc/api/CustomEditors';

      const employees = createStore({
        key: 'ID',
        loadUrl: `${url}/Employees`,
        onBeforeSend(_method, ajaxOptions) {
          ajaxOptions.xhrFields = { withCredentials: true };
        },
      });

      const tasks = createStore({
        key: 'ID',
        loadUrl: `${url}/Tasks`,
        updateUrl: `${url}/UpdateTask`,
        insertUrl: `${url}/InsertTask`,
        onBeforeSend(_method, ajaxOptions) {
          ajaxOptions.xhrFields = { withCredentials: true };
        },
      });

      const columns: Array<CustomizeColumns> = [
        {
          dataField: 'Owner',
          caption: 'Owner',
          dataType: 'number',
          editCellTemplate: 'dropDownBoxEditor',
        },
        {
          dataField: 'Priority',
          caption: 'Priority',
          dataType: 'number',
        },
        {
          dataField: 'Status',
          caption: 'Status',
          dataType: 'number',
        },
        {
          dataField: 'Subject',
          caption: 'Subject',
          dataType: 'string',
        },
      ];
      const onValueChanged = async (index, data) => {
        console.log('index', index);
        console.log('data', data);
        let dataGrid = await instanceDxDataGrid();
        if (isDef(data)) {
          dataGrid.cellValue(index, 'Owner', data.ID);
        }
      };
      const searchExpr = ['ID'];
      const [registerDxDataGrid, { instance: instanceDxDataGrid }] = useDataGrid({
        dataSource: tasks,
        customColumn: columns,
        customizeEnableEditing: true,
        height: 800,
        customizeEditingMode: 'row',
      });

      //#endregion

      //#region 【按钮事件】

      const handleSubmit = () => {
        console.log('formData', formData.Email);
        console.log('handleSubmit');
      };

      //#endregion

      return {
        registerDxFrom,
        dxFromInstance,
        dxFormCustomizeValidate,
        handleSubmit,
        registerDxDataGrid,
        employees,
        searchExpr,
        onValueChanged,
      };
    },
  });
</script>
