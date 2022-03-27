<!-- 顶部Button按钮组 -->
<template>
  <div class="button-wapper">
    <template v-for="item in buttons" :key="item.tabIndex">
      <DevExtremeButton
        :text="item.text"
        :disabled="item.disabled"
        :elementAttr="item.elementAttr"
        :height="item.height"
        :icon="item.icon"
        :stylingMode="item.stylingMode"
        :tabIndex="item.tabIndex"
        :type="item.type"
        :visible="item.visible"
        :onClick="item.onClick"
      />
    </template>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { DevextremeButtonSchema } from './types/devextreme-button';
  import DevExtremeButton from './components/DevExtremeButton.vue';
  export default defineComponent({
    name: 'DevExtremeButtonList',
    components: { DevExtremeButton },
    props: {
      buttons: { type: [Array] as PropType<DevextremeButtonSchema[]>, default: () => [] },
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
