<!-- 按钮组件 -->
<template>
  <dx-button
    :text="text"
    :disabled="disabled"
    :elementAttr="elementAttr"
    :height="height"
    :icon="icon"
    :stylingMode="stylingMode"
    :tabIndex="tabIndex"
    :type="type"
    :visible="visible"
    :onClick="onClick"
  />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import DxButton from 'devextreme-vue/button';
  import { propTypes } from '/@/utils/propTypes';
  export default defineComponent({
    name: 'DevExtremeButton',
    components: { DxButton },
    props: {
      // 是否禁用
      disabled: { type: Boolean, default: false },
      // 元素属性
      elementAttr: { type: Object },
      // 高度
      height: { type: [Number, String] as PropType<number | string>, default: undefined },
      // 图标
      icon: { type: String, default: '' },
      // 造型模式
      stylingMode: propTypes.oneOf(['text', 'outlined', 'contained']).def('contained'),
      // 标签索引
      // tabIndex?: number;
      tabIndex: { type: Number, default: 0 },
      // 按钮文本
      text: { type: String, default: '' },
      // 按钮类型
      type: propTypes.oneOf(['back', 'danger', 'default', 'normal', 'success']).def('normal'),
      // 点击事件
      onClick: { type: Function, default: null },
      // 是否显示
      visible: { type: Boolean, default: true },
    },
    setup() {
      return {};
    },
  });
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-devextreme-button';

  .@{prefix-cls} {
    .button-wapper {
      width: 100%;
      height: 100%;
    }
  }
</style>
