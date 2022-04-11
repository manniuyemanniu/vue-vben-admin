// import { onUnmounted, ref, unref, watch, WatchStopHandle } from 'vue';
import { nextTick, onUnmounted, ref, unref, watch, WatchStopHandle } from 'vue';
import {
  dataGridActionOptions,
  dataGridPropsOptions,
  UseDataGridReturnType,
} from '../types/datagrid';
import { DynamicProps } from '/#/utils';
import { getDynamicProps } from '/@/utils';
import { isProdMode } from '/@/utils/env';
import { error } from '/@/utils/log';

type Props = Partial<DynamicProps<dataGridPropsOptions>>;
export function useDataGrid(dataGridProps: Props): UseDataGridReturnType {
  const dataGridRef = ref<Nullable<dataGridActionOptions>>(null);
  let stopWatch: WatchStopHandle;

  async function getDataGrid() {
    const table = unref(dataGridRef);
    if (!table) {
      error(
        'The DataGrid instance has not been obtained yet, please make sure the DataGrid is presented when performing the table operation!',
      );
    }
    await nextTick();
    return table as dataGridActionOptions;
  }

  function register(instance: dataGridActionOptions) {
    isProdMode() &&
      onUnmounted(() => {
        dataGridRef.value = null;
      });

    if (isProdMode() && instance === unref(dataGridRef)) return;

    dataGridRef.value = instance;

    stopWatch?.();

    stopWatch = watch(
      // watch(
      () => dataGridProps,
      () => {
        dataGridProps && instance.setProps(getDynamicProps(dataGridProps));
      },
      {
        immediate: true,
        deep: true,
      },
    );
  }

  const methods: dataGridActionOptions = {
    setProps: async (props: Partial<dataGridPropsOptions>) => {
      const dataGrid = await getDataGrid();
      dataGrid.setProps(props);
    },
    instance: async (): Promise<any> => {
      const dataGrid = await getDataGrid();
      return dataGrid.instance();
    },
    /**
     * 获取选中数据源
     * @returns
     */
    getSelectedRowsData: async (): Promise<Array<any>> => {
      // const dataGrid = getDataGrid();
      // return dataGrid.getSelectedRowsData();

      const dataGrid = await getDataGrid();
      return new Promise((resolve) => {
        const result = dataGrid.getSelectedRowsData();
        resolve(result);
      });
    },
    /**
     * 导出全部
     */
    customExportAll: async (): Promise<void> => {
      const dataGrid = await getDataGrid();
      dataGrid.customExportAll();
    },
    /**
     * 导出选中行
     */
    customExportSelect: async (): Promise<void> => {
      const dataGrid = await getDataGrid();
      dataGrid.customExportSelect();
    },
    /**
     * 导出当前页
     */
    customExportPage: async (): Promise<void> => {
      const dataGrid = await getDataGrid();
      dataGrid.customExportPage();
    },
    /**
     * 清除筛选
     */
    clearFilter: async (): Promise<void> => {
      const dataGrid = await getDataGrid();
      dataGrid.clearFilter();
    },

    /**
     * 列选择器事件
     */
    showColumnChooser: async (): Promise<void> => {
      const dataGrid = await getDataGrid();
      dataGrid.showColumnChooser;
    },
  };

  return [register, methods];
}
