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

    <CollapseContainer title="devextreme-datagrid网格示例" class="mt-4 h-auto">
      <EditDataGrid @register="registerDxDataGrid">
        <!-- <template #StateIDCellTemplate="{ data }">
            <span v-if="data.data.StateID === 5" style="text-decoration: line-through; color: red">
              {{ data.data.StateID }}
            </span>
            <span v-else>{{ data.data.StateID }}</span>
          </template> -->
        <template #depatentCellTemplate="{ data }">
          <span>{{ data.data.departmentCode }}</span>
        </template>
        <template #dropDownBoxEditor="{ data: cellInfo }">
          <DropDownDataGrid
            valueExpr="id"
            displayExpr="code"
            customKeyExpr="id"
            :value="cellInfo.value"
            :rowIndex="cellInfo.rowIndex"
            :searchExpr="searchExpr"
            :on-value-changed="onValueChanged"
            :customDataSource="department"
            :customColumn="customColumn"
            :dropDownOptions="{ height: 500, width: 500 }"
          />
        </template>
      </EditDataGrid>
    </CollapseContainer>

    <!-- <CollapseContainer title="Monaco-Editor代码编辑器" class="mt-4"> -->
    <!-- <DevExtremeForm :schemas="schemas" :formData="formData" /> -->
    <!-- <DevExtremeForm @register="registerDxFrom" /> -->
    <!-- <monaco-editor v-model="code" />
    </CollapseContainer> -->
  </BasicDrawer>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { CollapseContainer } from '/@/components/Container';
  import {
    dxFormItemOption,
    useDxForm,
    DevExtremeForm,
  } from '/@/components/devextreme/devextreme-form';
  import { useDataGrid } from '/@/components/devextreme/dexextreme-datagrid/src/hooks/useDataGrid';
  import { EditDataGrid } from '/@/components/devextreme/dexextreme-datagrid';
  import { DropDownDataGrid } from '/@/components/devextreme/dexextreme-dropdown-datagrid';
  // import { MonacoEditor } from '/@/components/devextreme/monaco-editor';
  import { BasicDrawer } from '/@/components/Drawer';
  import { isDef } from '/@/utils/is';

  import { tableData, department, customColumn, columns } from './data';
  import { isDevMode, isProdMode } from '/@/utils/env';
  export default defineComponent({
    name: 'CreateOrEditModal',
    components: {
      BasicDrawer,
      DevExtremeForm,
      CollapseContainer,
      DropDownDataGrid,
      EditDataGrid,
      // MonacoEditor,
    },
    setup() {
      //#region 【表单】

      const schemas: Array<dxFormItemOption> = [
        {
          typeOption: 'simple',
          colSpan: 1,
          dataField: 'id',
          editorOptions: { mode: 'text', readonly: false, name: 'dxTextBox' },
          editorType: 'dxTextBox',
          isRequired: true,
        },
        {
          typeOption: 'simple',
          colSpan: 1,
          dataField: 'name',
          editorOptions: { mode: 'text', readonly: false },
          editorType: 'dxTextBox',
        },
        {
          typeOption: 'simple',
          colSpan: 1,
          dataField: 'code',
          editorOptions: { mode: 'text', readonly: false },
          editorType: 'dxTextBox',
        },
        {
          typeOption: 'simple',
          colSpan: 1,
          dataField: 'age',
          editorOptions: { mode: 'text', readonly: false },
          editorType: 'dxTextBox',
        },
        {
          typeOption: 'simple',
          colSpan: 1,
          dataField: 'phone',
          editorOptions: { mode: 'text', readonly: false },
          editorType: 'dxTextBox',
        },
        {
          typeOption: 'simple',
          colSpan: 1,
          dataField: 'creationTime',
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
          typeOption: 'empty',
          colSpan: 2,
        },
        {
          typeOption: 'simple',
          colSpan: 2,
          dataField: 'remark',
          editorType: 'dxTextArea',
        },
      ];
      const formData = {};
      const [
        registerDxFrom,
        { instance: dxFromInstance, customizeValidate: dxFormCustomizeValidate },
      ] = useDxForm({
        formData: formData,
        schemas: schemas,
        colCount: 3,
      });
      //#endregion

      //#region 【网格】

      const onValueChanged = async (index, data) => {
        debugger;
        console.log('onValueChanged', index);
        console.log('onValueChanged', data);
        let dxdataGrid = await instanceDxDataGrid();
        if (isDef(data)) {
          debugger;
          console.log('onValueChanged', dxdataGrid);
          dxdataGrid.cellValue(index, 'departmentId', data.id);
          dxdataGrid.cellValue(index, 'departmentCode', data.code);
          dxdataGrid.cellValue(index, 'departmentName', data.name);
        }
      };
      const searchExpr = ['id', 'code', 'name'];
      const [registerDxDataGrid, { instance: instanceDxDataGrid }] = useDataGrid({
        dataSource: tableData,
        customColumn: columns,
        customizeEnableEditing: true,
        customizeEditingMode: 'batch',
      });

      //#endregion

      //#region 【按钮事件】

      const handleSubmit = () => {
        console.log('handleSubmit');
      };

      //#endregion

      onMounted(() => {
        console.log('isDevMode', isDevMode());
        console.log('isProdMode', isProdMode());
      });

      const code = ref('');
      return {
        registerDxFrom,
        dxFromInstance,
        dxFormCustomizeValidate,
        handleSubmit,
        registerDxDataGrid,
        searchExpr,
        onValueChanged,
        department,
        customColumn,
        code,
      };
    },
  });
</script>
