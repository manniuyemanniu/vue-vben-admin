import type { App } from 'vue';
import { Button } from './Button';
import { Input, Layout } from 'ant-design-vue';

// import DxAutocomplete from 'devextreme-vue/autocomplete'; //文本框，可在用户输入时提供建议。
// import DxCheckBox from 'devextreme-vue/check-box'; //复选框
// import DxCalendar from 'devextreme-vue/calendar'; // 日历
// import DxColorBox from 'devextreme-vue/color-box'; // 演示选择器
// import DxDateBox from 'devextreme-vue/date-box'; // 时间选择器
// import DxDropDownBox from 'devextreme-vue/drop-down-box'; // 下拉框
// import DxHtmlEditor from 'devextreme-vue/html-editor';
// import DxLookup from 'devextreme-vue/lookup';
// import DxNumberBox from 'devextreme-vue/number-box';
// import DxRadioGroup from 'devextreme-vue/radio-group';
// import DxRangeSlider from 'devextreme-vue/range-slider';
// import DxSelectBox from 'devextreme-vue/select-box';
// import DxSlider from 'devextreme-vue/slider';
// import DxSwitch from 'devextreme-vue/switch';
// import DxTagBox from 'devextreme-vue/tag-box';
// import DxTextArea from 'devextreme-vue/text-area';
// import DxTextBox from 'devextreme-vue/text-box';

export function registerGlobComp(app: App) {
  app.use(Input).use(Button).use(Layout);
  // .use(DxAutocomplete)
  // .use(DxCheckBox)
  // .use(DxCalendar)
  // .use(DxColorBox)
  // .use(DxDateBox)
  // .use(DxDropDownBox)
  // .use(DxHtmlEditor)
  // .use(DxLookup)
  // .use(DxNumberBox)
  // .use(DxRadioGroup)
  // .use(DxRangeSlider)
  // .use(DxSelectBox)
  // .use(DxSlider)
  // .use(DxSwitch)
  // .use(DxTagBox)
  // .use(DxTextArea)
  // .use(DxTextBox);
}
