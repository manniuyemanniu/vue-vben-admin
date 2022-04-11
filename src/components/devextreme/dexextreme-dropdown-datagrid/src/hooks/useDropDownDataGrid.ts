// import { onUnmounted, ref, unref, watch, WatchStopHandle } from 'vue';
import { nextTick, onUnmounted, ref, unref, watch, WatchStopHandle } from 'vue';
import {
  dropDownDataGridPropsOptionos,
  UseDropDownDataGridReturnType,
  dropDownDataGridActionOptions,
} from '../types/dropdown-datagrid';
import { DynamicProps } from '/#/utils';
import { getDynamicProps } from '/@/utils';
import { isProdMode } from '/@/utils/env';
import { error } from '/@/utils/log';

/**
 * 使用dropdown-datagrid
 * @returns
 */

type Props = Partial<DynamicProps<dropDownDataGridPropsOptionos>>;
export function useDropDownDataGrid(dropDownDataGridProps: Props): UseDropDownDataGridReturnType {
  const dropDownDataGridPropsRef = ref<Nullable<dropDownDataGridActionOptions>>(null);
  let stopWatch: WatchStopHandle;

  async function getDropDownDataGrid() {
    const dropDownDataGrid = unref(dropDownDataGridPropsRef);
    if (!dropDownDataGrid) {
      error(
        'The DropDownDataGrid instance has not been obtained yet, please make sure the DropDownDataGrid is presented when performing the table operation!',
      );
    }
    await nextTick();
    return dropDownDataGrid as dropDownDataGridActionOptions;
  }

  function register(instance: dropDownDataGridActionOptions) {
    isProdMode() &&
      onUnmounted(() => {
        dropDownDataGridPropsRef.value = null;
      });

    if (isProdMode() && instance === unref(dropDownDataGridPropsRef)) return;

    dropDownDataGridPropsRef.value = instance;

    stopWatch?.();

    stopWatch = watch(
      // watch(
      () => dropDownDataGridProps,
      () => {
        dropDownDataGridProps && instance.setProps(getDynamicProps(dropDownDataGridProps));
      },
      {
        immediate: true,
        deep: true,
      },
    );
  }
  const methods: dropDownDataGridActionOptions = {
    setProps: async (props: Partial<dropDownDataGridPropsOptionos>) => {
      const dropDownDataGrid = await getDropDownDataGrid();
      dropDownDataGrid.setProps(props);
    },
    instance: async (): Promise<any> => {
      const dropDownDataGrid = await getDropDownDataGrid();
      return dropDownDataGrid.instance();
    },
    datagridinstance: async (): Promise<any> => {
      const dropDownDataGrid = await getDropDownDataGrid();
      return dropDownDataGrid.datagridinstance();
    },
  };

  return [register, methods];
}
