<!-- 标题过滤器 -->
<template>
  <DxHeaderFilter />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { DxHeaderFilter } from 'devextreme-vue/data-grid';
  export default defineComponent({
    name: 'HeaderFilter',
    components: { DxHeaderFilter },
    props: {},
    setup() {
      return {};
    },
  });
</script>
