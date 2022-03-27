import { ref, unref } from 'vue';
// import InitDataGridProps from '../types/data-grid';

export function useRowSelection(dataGridInstance: any) {
  console.log('useRowSelection==>dataGridInstance', dataGridInstance);

  const selectedRowRef = ref<Recordable[]>([]);
  function getSelectedRowsData<T = Recordable>() {
    debugger;
    // const ret = toRaw(unref(selectedRowRef)).map((item) => toRaw(item));
    selectedRowRef.value = dataGridInstance.value.getSelectedRowsData();
    return unref(selectedRowRef) as T[];
  }
  function getInstance<T = Recordable>() {
    return unref(dataGridInstance.value) as T[];
  }
  return { getSelectedRowsData, getInstance };
}
