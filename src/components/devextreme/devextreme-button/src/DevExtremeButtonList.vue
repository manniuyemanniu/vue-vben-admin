<!-- 顶部Button按钮组 -->
<template>
  <div res="wrapRef" :class="getButtonListClass">
    <template v-for="item in buttons" :key="item.tabIndex">
      <DevExtremeButton
        class="mr-2 mb-1"
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
  import { computed, defineComponent, ref } from 'vue';
  import { DevextremeButtonSchema } from './types/devextreme-button';
  import DevExtremeButton from './components/DevExtremeButton.vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  export default defineComponent({
    name: 'DevExtremeButtonList',
    components: { DevExtremeButton },
    props: {
      buttons: { type: [Array] as PropType<DevextremeButtonSchema[]>, default: () => [] },
    },
    setup() {
      const wrapRef = ref(null);

      const { prefixCls } = useDesign('devextreme-button-list');

      const getButtonListClass = computed(() => {
        return [prefixCls];
      });
      return { wrapRef, getButtonListClass };
    },
  });
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-devextreme-button-list';

  .@{prefix-cls} {
    .button-wapper {
      width: 100%;
      height: 100%;
    }
  }
</style>
