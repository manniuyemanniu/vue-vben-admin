# 封装 devextreme-form 组件

## 组件目录详解

```
├── src
   ├──components 【其他组件(如:编辑)】
   ├──hooks 【自定义API】
   ├──types 【组件所有属性】
   ├──DataGrid.vue 【主组件】
   ├──props.ts 【props属性】
├── index  【import总入口】

```

### 文档概要

1. 组件属性

| 属性名 | 类型 | 定义 | 默认值 | 是否必传 |
| --- | --- | --- | --- | --- |
| alignItemLabels | boolean | _标签是否对齐_ | true | 否 |
| alignItemLabelsInAllGroups | boolean | _组标签是否对齐_ | true | 否 |
| formData | {} | _表单数据_ | {} | 否 |
| colCount | number | _表单布局中的列数。_ | 4 | 否 |
| caption | string | 暂不使用 | '' | 否 |
| minColWidth | number | _最小列宽_ | 200 | 否 |
| colCountByScreen | ColCountByScreen(不需要配置) | _用于计算表单布局中列数的最小列宽\*\*指定屏幕因子和表单布局中的列数之间的依赖关系。_ | { lg: 4, MD: 3, sm: 2, xs: 1 } | 否 |
| disabled | boolean | _元素_ | false | 否 |
| elementAttr | Object | _元素属性_ | {} | 否 |
| labelLocation | 'left'\| 'right',\|'top' | _标签位置_ | left | 否 |
| labelMode | 'static'\|'floating'\|'hidden'\|'outside' | _标签样式_ | outside | 否 |
| readOnly | boolean | _是否只读_ | false | 否 |
| requiredMark | string | _必填显示标记_ | \* | 否 |
| requiredMessage | string | _必填显示文本_ | {0} is required | 否 |
| screenByWidth | Function | _根据屏幕宽度返回对应的屏幕分类_ | 已自定义 | 否 |
| showColonAfterLabel | boolean | _指定是否在表单标签的末尾显示冒号。仅适用于其编辑器之外的标签_ | true | 否 |
| showRequiredMark | boolean | _是否为必填字段显示_ | true | 否 |
| showValidationSummary | boolean | _指定表单上是否显示总验证摘要。_ | false | 否 |
| schemas | Array<dxFormItemOption> | _表单配置规则_ | [] | 是 |

2. schemas 属性

   | 表单项 | 类型 | 描述 |
   | --- | --- | --- |
   | typeOption | simple\|empty | 当且仅有这两种 <br />empty 仅占位，使用时只需配置 colSpan 属性<br />dev 流式布局无法处理 |
   | colSpan | number | _指定项所跨的列数。_ |
   | dataField | string | _指定绑定到当前表单项的 formData 对象字段的路径。_ |
   | editorType | ComponentType | _指定用于显示和编辑表单项值的编辑器 UI 组件。_ |
   | editorOptions | {} | editorType 中使用的组件的配置 |
   | visible | boolean | 显示/隐藏 |
   | isRequired | boolean | _指定是否需要当前表单项验证。_ |
   | label | {text:'标签'} | 标签文本 |
   | name | string | _指定标识表单项的名称。_ |

   ```tsx
   export type ComponentType =
     | 'dxAutocomplete'
     | 'dxCalendar'
     | 'dxCheckBox'
     | 'dxColorBox'
     | 'dxDateBox'
     | 'dxDropDownBox'
     | 'dxHtmlEditor'
     | 'dxLookup'
     | 'dxNumberBox'
     | 'dxRadioGroup'
     | 'dxRangeSlider'
     | 'dxSelectBox'
     | 'dxSlider'
     | 'dxSwitch'
     | 'dxTagBox'
     | 'dxTextArea'
     | 'dxTextBox';
   ```

3. 组件返回事件

   ```
   //表单组件信息
   instance: () => any;
   表单验证信息
   customizeValidate: () => Promise<ValidationResult>;
   ```

4. 使用示例

   ```vue
   <!--  -->
   <template>
     <div class="p-0">
       <PageWrapper title="devextreme-from">
         <CollapseContainer title="devextreme-from表单示例">
           <!-- <DevExtremeForm :schemas="schemas" :formData="formData" /> -->
           <DevExtremeForm @register="register" />
         </CollapseContainer>

         <template #rightFooter>
           <DxButton :onClick="onClickinstance" text="onClickinstance" />

           <DxButton :onClick="onClickvalidate" text="onClickvalidate" />
         </template>
       </PageWrapper>
     </div>
   </template>

   <script lang="ts">
     import { defineComponent } from 'vue';
     import { CollapseContainer } from '/@/components/Container';
     import { PageWrapper } from '/@/components/Page';
     import {
       DevExtremeForm,
       dxFormItemOption,
       useDxForm,
     } from '/@/components/devextreme/devextreme-form/index';

     import DxButton from 'devextreme-vue/button';
     export default defineComponent({
       // name: '',
       components: { PageWrapper, CollapseContainer, DevExtremeForm, DxButton },
       setup() {
         const getSchemas = (): Array<dxFormItemOption> => {
           return [
             {
               typeOption: 'simple',
               colSpan: 1,
               dataField: 'ID',
               editorOptions: { mode: 'text', readonly: false, name: 'dxTextBox' },
               editorType: 'dxTextBox',
               isRequired: true,
               visible: true,
               label: {
                 text: '表单项1',
               },
             },
             {
               typeOption: 'simple',
               colSpan: 1,
               dataField: 'Name',
               editorOptions: { mode: 'text', readonly: false },
               editorType: 'dxTextBox',
               visible: true,
               label: {
                 text: '表单项2',
               },
             },
             {
               typeOption: 'simple',
               colSpan: 1,
               dataField: 'Position',
               editorOptions: { mode: 'text', readonly: false },
               editorType: 'dxTextBox',
               visible: true,
               label: {
                 text: '表单项3',
               },
             },
             {
               typeOption: 'simple',
               colSpan: 1,
               dataField: 'BirthDate',
               editorOptions: {
                 showClearButton: true,
                 useMaskBehavior: true,
                 displayFormat: 'yyyy-MM-dd hh:mm:ss',
                 type: 'datetime',
                 showAnalogClock: false,
               },
               editorType: 'dxDateBox',
               visible: true,
               label: {
                 text: '表单项4',
               },
             },
             {
               typeOption: 'simple',
               colSpan: 1,
               dataField: 'HireDate',
               editorOptions: {
                 showClearButton: true,
                 useMaskBehavior: true,
                 displayFormat: 'yyyy-MM-dd',
                 type: 'date',
                 showAnalogClock: false,
               },
               editorType: 'dxDateBox',
               visible: true,
               label: {
                 text: '表单项5',
               },
             },
             {
               typeOption: 'simple',
               colSpan: 1,
               dataField: 'Address',
               editorOptions: { mode: 'text', readonly: false },
               editorType: 'dxTextBox',
               visible: true,
               label: {
                 text: '表单项6',
               },
             },
             {
               typeOption: 'simple',
               colSpan: 1,
               dataField: 'City',
               editorOptions: { mode: 'text', readonly: false },
               editorType: 'dxTextBox',
               visible: true,
               label: {
                 text: '表单项7',
               },
             },
             {
               typeOption: 'empty',
               colSpan: 1,
             },
             {
               typeOption: 'simple',
               colSpan: 4,
               dataField: 'State',
               editorOptions: { mode: 'text', readonly: false },
               editorType: 'dxTextBox',
               visible: true,
               label: {
                 text: '表单项8',
               },
             },
             {
               typeOption: 'simple',
               colSpan: 1,
               dataField: 'ZipCode',
               editorOptions: { mode: 'text', readonly: false },
               editorType: 'dxTextBox',
               visible: true,
               label: {
                 text: '表单项9',
               },
             },
             {
               typeOption: 'simple',
               colSpan: 1,
               dataField: 'Home',
               editorOptions: { mode: 'text', readonly: false },
               editorType: 'dxTextBox',
               visible: true,
               label: {
                 text: '表单项10',
               },
             },
             {
               typeOption: 'simple',
               colSpan: 1,
               dataField: 'Mobile',
               editorOptions: { mode: 'text', readonly: false },
               editorType: 'dxTextBox',
               visible: true,
               label: {
                 text: '表单项11',
               },
             },
             {
               typeOption: 'empty',
               colSpan: 1,
             },
             {
               typeOption: 'simple',
               colSpan: 4,
               dataField: 'Email',
               editorOptions: { mode: 'email', readonly: false },
               editorType: 'dxTextBox',
               visible: true,
               label: {
                 text: '表单项12',
               },
             },
             {
               typeOption: 'simple',
               colSpan: 2,
               dataField: 'Skype',
               editorType: 'dxTextArea',
               visible: true,
               label: {
                 text: '表单项1',
               },
             },
           ];
         };
         const schemas = [...getSchemas()];
         const formData = {
           ID: 1,
           Name: 'John Heart',
           Position: 'CEO',
           BirthDate: '1964/03/16',
           HireDate: '1995/01/15',
           Notes:
             'John has been in the Audio/Video industry since 1990. He has led DevAV as its CEO since 2003.\r\nWhen not working hard as the CEO, John loves to golf and bowl. He once bowled a perfect game of 300.',
           Address: '351 S Hill St.',
           City: 'Los Angeles',
           State: 'CA',
           ZipCode: '90013',
           Home: '555-684-1334',
           Mobile: '555-684-1335',
           Email: 'jheart@dx-email.com',
           Skype:
             'John has been in the Audio/Video industry since 1990. He has led DevAV as its CEO since 2003.\r\nWhen not working hard as the CEO, John loves to golf and bowl. He once bowled a perfect game of 300.',
         };
         const [register, { instance, customizeValidate }] = useDxForm({
           formData: formData,
           schemas: schemas,
         });
         const onClickinstance = async () => {
           const result = await instance();
           console.log('onClickinstance', result);
         };
         const onClickvalidate = async () => {
           const result = await customizeValidate();

           console.log('onClickvalidate', result);
           console.log('onClickvalidate', formData);
         };

         return { register, onClickinstance, onClickvalidate };
       },
     });
   </script>
   ```

   ```vue
   <!--  -->
   <template>
     <div class="p-0">
       <PageWrapper title="devextreme-from">
         <CollapseContainer title="devextreme-from表单示例">
           <DevExtremeForm ref="dxFormRef" :schemas="schemas" :formData="formData" />
           <!-- <DevExtremeForm @register="register" /> -->
         </CollapseContainer>

         <template #rightFooter>
           <DxButton :onClick="onClickinstance" text="onClickinstance" />

           <DxButton :onClick="onClickvalidate" text="onClickvalidate" />
         </template>
       </PageWrapper>
     </div>
   </template>

   <script lang="ts">
     import { defineComponent, ref, unref } from 'vue';
     import { CollapseContainer } from '/@/components/Container';
     import { PageWrapper } from '/@/components/Page';
     import {
       DevExtremeForm,
       dxFormActionType,
       dxFormItemOption,
     } from '/@/components/devextreme/devextreme-form/index';

     import DxButton from 'devextreme-vue/button';
     export default defineComponent({
       // name: '',
       components: { PageWrapper, CollapseContainer, DevExtremeForm, DxButton },
       setup() {
         const getSchemas = (): Array<dxFormItemOption> => {
           return return [
             {
               typeOption: 'simple',
               colSpan: 1,
               dataField: 'ID',
               editorOptions: { mode: 'text', readonly: false, name: 'dxTextBox' },
               editorType: 'dxTextBox',
               isRequired: true,
               visible: true,
               label: {
                 text: '表单项1',
               },
             },
             {
               typeOption: 'simple',
               colSpan: 1,
               dataField: 'Name',
               editorOptions: { mode: 'text', readonly: false },
               editorType: 'dxTextBox',
               visible: true,
               label: {
                 text: '表单项2',
               },
             },
             {
               typeOption: 'simple',
               colSpan: 1,
               dataField: 'Position',
               editorOptions: { mode: 'text', readonly: false },
               editorType: 'dxTextBox',
               visible: true,
               label: {
                 text: '表单项3',
               },
             },
             {
               typeOption: 'simple',
               colSpan: 1,
               dataField: 'BirthDate',
               editorOptions: {
                 showClearButton: true,
                 useMaskBehavior: true,
                 displayFormat: 'yyyy-MM-dd hh:mm:ss',
                 type: 'datetime',
                 showAnalogClock: false,
               },
               editorType: 'dxDateBox',
               visible: true,
               label: {
                 text: '表单项4',
               },
             },
             {
               typeOption: 'simple',
               colSpan: 1,
               dataField: 'HireDate',
               editorOptions: {
                 showClearButton: true,
                 useMaskBehavior: true,
                 displayFormat: 'yyyy-MM-dd',
                 type: 'date',
                 showAnalogClock: false,
               },
               editorType: 'dxDateBox',
               visible: true,
               label: {
                 text: '表单项5',
               },
             },
             {
               typeOption: 'simple',
               colSpan: 1,
               dataField: 'Address',
               editorOptions: { mode: 'text', readonly: false },
               editorType: 'dxTextBox',
               visible: true,
               label: {
                 text: '表单项6',
               },
             },
             {
               typeOption: 'simple',
               colSpan: 1,
               dataField: 'City',
               editorOptions: { mode: 'text', readonly: false },
               editorType: 'dxTextBox',
               visible: true,
               label: {
                 text: '表单项7',
               },
             },
             {
               typeOption: 'empty',
               colSpan: 1,
             },
             {
               typeOption: 'simple',
               colSpan: 4,
               dataField: 'State',
               editorOptions: { mode: 'text', readonly: false },
               editorType: 'dxTextBox',
               visible: true,
               label: {
                 text: '表单项8',
               },
             },
             {
               typeOption: 'simple',
               colSpan: 1,
               dataField: 'ZipCode',
               editorOptions: { mode: 'text', readonly: false },
               editorType: 'dxTextBox',
               visible: true,
               label: {
                 text: '表单项9',
               },
             },
             {
               typeOption: 'simple',
               colSpan: 1,
               dataField: 'Home',
               editorOptions: { mode: 'text', readonly: false },
               editorType: 'dxTextBox',
               visible: true,
               label: {
                 text: '表单项10',
               },
             },
             {
               typeOption: 'simple',
               colSpan: 1,
               dataField: 'Mobile',
               editorOptions: { mode: 'text', readonly: false },
               editorType: 'dxTextBox',
               visible: true,
               label: {
                 text: '表单项11',
               },
             },
             {
               typeOption: 'empty',
               colSpan: 1,
             },
             {
               typeOption: 'simple',
               colSpan: 4,
               dataField: 'Email',
               editorOptions: { mode: 'email', readonly: false },
               editorType: 'dxTextBox',
               visible: true,
               label: {
                 text: '表单项12',
               },
             },
             {
               typeOption: 'simple',
               colSpan: 2,
               dataField: 'Skype',
               editorType: 'dxTextArea',
               visible: true,
               label: {
                 text: '表单项1',
               },
             },
           ];
         };
         const schemas = [...getSchemas()];
         const formData = {
           ID: 1,
           Name: 'John Heart',
           Position: 'CEO',
           BirthDate: '1964/03/16',
           HireDate: '1995/01/15',
           Notes:
             'John has been in the Audio/Video industry since 1990. He has led DevAV as its CEO since 2003.\r\nWhen not working hard as the CEO, John loves to golf and bowl. He once bowled a perfect game of 300.',
           Address: '351 S Hill St.',
           City: 'Los Angeles',
           State: 'CA',
           ZipCode: '90013',
           Home: '555-684-1334',
           Mobile: '555-684-1335',
           Email: 'jheart@dx-email.com',
           Skype:
             'John has been in the Audio/Video industry since 1990. He has led DevAV as its CEO since 2003.\r\nWhen not working hard as the CEO, John loves to golf and bowl. He once bowled a perfect game of 300.',
         };

         const dxFormRef = ref<Nullable<dxFormActionType>>(null);
         function getDxFormAction() {
           const dxFormAction = unref(dxFormRef);
           if (!dxFormAction) {
             throw new Error('tableAction is null');
           }
           return dxFormAction;
         }

         const onClickinstance = async () => {
           const result = await getDxFormAction().instance();
           console.log('onClickinstance', result);
         };
         const onClickvalidate = async () => {
           const result = await getDxFormAction().customizeValidate();

           console.log('onClickvalidate', result);
           console.log('onClickvalidate', formData);
         };

         return { schemas, formData, dxFormRef, onClickinstance, onClickvalidate };
       },
     });
   </script>
   ```
