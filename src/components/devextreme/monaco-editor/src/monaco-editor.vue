<template>
  <div class="editor" ref="dom"></div>
</template>

<script lang="ts">
  import { computed, defineComponent, onMounted, ref } from 'vue';
  import * as monaco from 'monaco-editor';
  import { monacoEditorOption } from './types/monaco-editor';
  import { monacoEditorProps } from './props';
  import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
  import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
  import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
  import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
  import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

  export default defineComponent({
    name: 'MonacoEditor',
    components: {},
    props: monacoEditorProps,
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const dom = ref();
      // const monacoEditorPropsRef = ref<Partial<monacoEditorOption>>();
      (self as any).MonacoEnvironment = {
        getWorker(_workerId, label) {
          if (label === 'json') {
            return new jsonWorker();
          }
          if (label === 'css') {
            return new cssWorker();
          }
          if (label === 'html') {
            return new htmlWorker();
          }
          if (label === 'ts') {
            return new tsWorker();
          }
          return new EditorWorker();
        },
      };
      const getProps = computed(() => {
        return {
          ...props,
        } as monacoEditorOption;
      });
      let instance;
      onMounted(() => {
        const jsonModel = monaco.editor.createModel(
          getProps.value.modelValue,
          'json',
          monaco.Uri.parse('json://grid/settings.json'),
        );

        instance = monaco.editor.create(dom.value, {
          model: jsonModel,
          tabSize: 2,
          automaticLayout: true,
          scrollBeyondLastLine: false,
        });

        instance.onDidChangeModelContent(() => {
          const value = instance.getValue();
          emit('update:modelValue', value);
        });
      });

      return { dom };
    },
  });
</script>

<style lang="less" scoped>
  .editor {
    height: 600px;
  }
</style>
