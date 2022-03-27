<!-- 配置滚动 -->
<template>
  <DxScrolling
    :columnRenderingMode="columnRenderingMode"
    :mode="mode"
    :preloadEnabled="preloadEnabled"
    :rowRenderingMode="rowRenderingMode"
    :scrollByContent="scrollByContent"
    :scrollByThumb="scrollByThumb"
    :showScrollbar="showScrollbar"
    :useNative="useNative"
  />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { DxScrolling } from 'devextreme-vue/data-grid';
  import type { PropType } from 'vue';
  import { propTypes } from '/@/utils/propTypes';
  export default defineComponent({
    name: 'Scrolling',
    components: { DxScrolling },
    props: {
      /**
       * 指定列的呈现模式。当列保留在视口之外时应用。需要指定的columnWidth，
       * columnAutoWidth或width（对于所有列）属性。standard=标准 | virtual=虚拟
       * standard一次
       * 渲染所有已加载的行。
       * virtual
       * 仅渲染进入视口的那些行。如果pageSize大，则使用此模式。当前正在渲染的行可以显示为灰色框。
       */
      columnRenderingMode: propTypes.oneOf(['standard', 'virtual']).def('standard'),
      /** 指定滚动模式。
       * standard|标准==> 用户仅滚动单个页面。仅当页面的所有行都不适合UI组件的高度时，滚动才可用。在此模式下，寻呼机执行主导航，
       * 而滚动辅助。如果禁用了分页，则UI组件会同时加载所有行，这会降低UI组件的性能。在这种情况下，建议您使用其他滚动模式。
       * Infinite|无线==>一旦滚动条达到其刻度的尽头，就会加载下一页。在这种模式下，用户从第一页到最后一页逐渐滚动数据。
       * 注:设置分组。当结合使用无限滚动和分组时，allowCollapsing属性为false
       * virtual、虚拟==>行进入视口时将被加载，并且在离开视口后将其删除。如果这些行需要时间来加载和呈现，
       * 它们将显示灰色框。渲染优化可以减少渲染时间并删除灰色框。在这种模式下，用户可以立即移动到任何页面。
       */
      mode: propTypes.oneOf(['standard', 'Infinite', 'virtual']).def('standard'),
      /**
       * 指定UI组件是否应加载相邻页面。仅在滚动时适用。模式是“虚拟”或“无限”。
       * 在虚拟和无限滚动模式下，页面按需加载。如果将此属性设置为true，则会提前加载相邻页面，
       * 以使滚动更流畅。此属性可能会降低旧设备的性能。
       */
      preloadEnabled: propTypes.bool.def(true),
      /**
       * 指定已加载行的呈现方式。
       * 类型:string|默认值:standard
       * 接受的值: 'standard' | 'virtual'
       * standard一次
       * 渲染所有已加载的行。
       * virtual
       * 仅渲染进入视口的那些行。如果pageSize大，则使用此模式。当前正在渲染的行可以显示为灰色框。
       */
      rowRenderingMode: propTypes.oneOf(['standard', 'virtual']).def('standard'),
      /**
       * 指定用户是否可以使用滑动手势滚动内容。仅在useNative为false时适用。
       */
      scrollByContent: propTypes.bool.def(false),
      /**
       * 指定用户是否可以使用滚动条滚动内容。仅在useNative为false时适用。
       */
      scrollByThumb: propTypes.bool.def(false),
      /**
       * 指定何时显示滚动条。仅在useNative为false时适用。
       * 类型:string|默认值:standard
       * 接受的值: 'always' | 'never' | 'onHover' | 'onScroll'
       * 滚动条有助于垂直和水平滚动内容。当所有行都不适合UI组件的高度时，
       * 垂直滚动可用。当所有列都不适合UI组件的宽度时，可以使用水平滚动，
       * 当列具有固定宽度或columnAutoWidth属性设置为true时，可能会发生水平滚动。
       */
      showScrollbar: propTypes.oneOf(['always', 'never', 'onHover', 'onScroll']).def('onScroll'),
      /**
       * 指定UI组件应使用本机滚动还是模拟滚动。
       * 类型：Boolean | String
       * 默认值:auto
       */
      useNative: { type: [Boolean, String] as PropType<boolean | 'auto'>, default: 'auto' },
    },
    setup() {
      return {};
    },
  });
</script>
