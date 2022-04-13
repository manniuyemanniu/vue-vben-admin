import { cloneDeep } from 'lodash-es';
import { computed, ComputedRef, ref, Ref, unref, watch } from 'vue';
import { ToolbarButtonSchema, dataGridPropsOptions, clickType } from '../types/datagrid';
// import { isDevMode } from '/@/utils/env';
import { isFunction } from '/@/utils/is';

/**
 *
 */
export function useDataGridToolbar(propsRef: ComputedRef<dataGridPropsOptions>) {
  const toolbarButtonRef = ref(unref(propsRef).toolbarButtonSchema) as unknown as Ref<
    Array<ToolbarButtonSchema>
  >;

  const getToolbarButton = computed(() => {
    const toolbarButton = cloneDeep(unref(toolbarButtonRef));
    if (!toolbarButton) {
      return [];
    }
    return toolbarButton.map((item) => {
      item = handleToolbarButtons(item);
      return item;
    });
  });

  watch(
    () => unref(propsRef).toolbarButtonSchema,
    (toolbarButtonSchema) => {
      toolbarButtonRef.value = toolbarButtonSchema;
    },
  );
  return { getToolbarButton };

  // function handleDevelopButtons(
  //   propsRef: ComputedRef<dataGridPropsOptions>,
  //   columns: Array<ToolbarButtonSchema>,
  // ) {
  //   /**
  //    * 开发者环境下使用
  //    */
  //   if (isDevMode()) {
  //     //TODO:执行开发者环境下的获取配置信息 后期可以push
  //   }
  // }

  function handleToolbarButtons(item: ToolbarButtonSchema) {
    switch (item.onClickType) {
      case clickType.createClick: {
        break;
      }
      case clickType.editClick: {
        break;
      }
      case clickType.delClick: {
        break;
      }
      case clickType.exportAllClick: {
        if (!isFunction(item.onClick)) {
          // item.onClick
        }
        break;
      }
      case clickType.exportSelectClick: {
        break;
      }
      case clickType.exportPageClick: {
        break;
      }
      case clickType.clearFilterClick: {
        break;
      }
      case clickType.showColumnChooserClick: {
        break;
      }
      default: {
        break;
      }
    }

    return item;
  }
}

//#region 【列表界面得公共方法】
// function CreateOrEditModel() {}
//#endregion
