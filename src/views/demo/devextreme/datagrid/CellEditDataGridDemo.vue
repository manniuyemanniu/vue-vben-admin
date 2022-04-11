<!-- CellEditDataGridDemo单元格编辑 -->
<template>
  <div class="p-0">
    <PageWrapper title="devextreme-datagrid">
      <CollapseContainer title="DataGrid-Cell编辑">
        <!-- <DevExtremeForm :schemas="schemas" :formData="formData" /> -->
        <EditCellDataGrid @register="register">
          <template #StateIDCellTemplate="{ data }">
            <span v-if="data.data.StateID === 5" style="text-decoration: line-through; color: red">
              {{ data.data.StateID }}
            </span>
            <span v-else>{{ data.data.StateID }}</span>
          </template>
        </EditCellDataGrid>
      </CollapseContainer>

      <template #rightFooter>
        <DevExtremeButtonList :buttons="buttons" />
      </template>
    </PageWrapper>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { employes, states, columns } from './data';
  import { useDataGrid } from '/@/components/devextreme/dexextreme-datagrid-v2/src/hooks/useDataGrid';
  import { EditCellDataGrid } from '/@/components/devextreme/dexextreme-datagrid-v2/index';
  import { CollapseContainer } from '/@/components/Container';
  import { PageWrapper } from '/@/components/Page';
  import DevExtremeButtonList from '/@/components/devextreme/devextreme-button/src/DevExtremeButtonList.vue';
  export default defineComponent({
    name: 'CellEditDataGrid',
    components: { EditCellDataGrid, CollapseContainer, PageWrapper, DevExtremeButtonList },
    setup() {
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

      const [register] = useDataGrid({
        dataSource: employes,
        customColumn: columns,
        customizeEnableEditing: true,
        height: 800,
        customizeEditingMode: 'cell',
      });

      function btnSave() {
        console.log('btnSave');
      }
      function btnBack() {
        console.log('btnBack');
      }
      return { employes, states, register, buttons };
    },
  });
</script>

<style lang="less">
  .p-4-wapper {
    width: 100%;
    // height: 700px;
  }
</style>
