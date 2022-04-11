<!-- RowEditDataGridDemo行编辑 -->
<template>
  <div class="p-0">
    <PageWrapper title="devextreme-datagrid">
      <CollapseContainer title="DataGrid-Row编辑">
        <!-- <DevExtremeForm :schemas="schemas" :formData="formData" /> -->
        <EditRowDataGrid @register="register" />
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
  import DevExtremeButtonList from '/@/components/devextreme/devextreme-button/src/DevExtremeButtonList.vue';
  import { EditRowDataGrid } from '/@/components/devextreme/dexextreme-datagrid-v2/index';
  import { CollapseContainer } from '/@/components/Container';
  import { PageWrapper } from '/@/components/Page';
  export default defineComponent({
    name: 'RowEditDataGrid',
    components: { EditRowDataGrid, CollapseContainer, PageWrapper, DevExtremeButtonList },
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
        customizeEditingMode: 'row',
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
