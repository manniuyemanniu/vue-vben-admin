<!-- CustomDataGridDemo自定义编辑器 -->
<template>
  <div class="p-0">
    <PageWrapper title="devextreme-datagrid">
      <CollapseContainer title="DataGrid-Cell编辑">
        <!-- <DevExtremeForm :schemas="schemas" :formData="formData" /> -->
        <EditDataGrid @register="register">
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
        </EditDataGrid>
      </CollapseContainer>

      <template #rightFooter>
        <DevExtremeButtonList :buttons="buttons" />
      </template>
    </PageWrapper>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  // import { employes, states, columns } from './data';
  import { useDataGrid } from '/@/components/devextreme/dexextreme-datagrid/src/hooks/useDataGrid';
  import { CustomizeColumns, EditDataGrid } from '/@/components/devextreme/dexextreme-datagrid';
  import { DropDownDataGrid } from '/@/components/devextreme/dexextreme-dropdown-datagrid';
  import { CollapseContainer } from '/@/components/Container';
  import { PageWrapper } from '/@/components/Page';
  import DevExtremeButtonList from '/@/components/devextreme/devextreme-button/src/DevExtremeButtonList.vue';
  import { createStore } from 'devextreme-aspnet-data-nojquery';
  import { isDef } from '/@/utils/is';
  export default defineComponent({
    name: 'CustomDataGridDemo',
    components: {
      EditDataGrid,
      CollapseContainer,
      PageWrapper,
      DevExtremeButtonList,
      DropDownDataGrid,
    },
    setup() {
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

      const buttons = [
        {
          tabIndex: 0,
          text: '保存',
          onClick: btnSave,
        },
        {
          tabIndex: 1,
          text: '返回',
          onClick: btnBack,
        },
      ];

      const searchExpr = ['ID'];
      const [register, { instance }] = useDataGrid({
        dataSource: tasks,
        customColumn: columns,
        customizeEnableEditing: true,
        height: 800,
        customizeEditingMode: 'row',
      });

      const onValueChanged = async (index, data) => {
        console.log('index', index);
        console.log('data', data);
        let dataGrid = await instance();
        if (isDef(data)) {
          dataGrid.cellValue(index, 'Owner', data.ID);
        }
      };

      function btnSave() {
        console.log('btnSave');
      }
      function btnBack() {
        console.log('btnBack');
      }

      return { register, onValueChanged, buttons, employees, searchExpr };
    },
  });
</script>

<style lang="less">
  .p-4-wapper {
    width: 100%;
    // height: 700px;
  }
</style>
