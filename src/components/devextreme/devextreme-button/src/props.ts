import type { PropType } from 'vue';
import { DevextremeButtonSchema } from './types/devextreme-button';

/**
 * devextreme表单基本Props
 */
export const devextreme_button_props = {
  // model: {
  //   type: Object as PropType<Recordable>,
  //   default: {},
  // },
  // 按钮配置规则
  buttons: { type: [Array] as PropType<DevextremeButtonSchema[]>, default: () => [] },
};
