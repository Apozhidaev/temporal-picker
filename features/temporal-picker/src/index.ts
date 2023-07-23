import {
  defineCustomElements,
  TemporalInput,
  TemporalPicker,
  TemporalPopup,
  TemporalPreset,
} from "@temporal-picker/custom";

export const define = defineCustomElements.bind(null, [
  TemporalInput,
  TemporalPicker,
  TemporalPopup,
  TemporalPreset,
]);

export const defineCustomElement = define;

export {
  TemporalInput,
  TemporalPicker,
  TemporalPopup,
  TemporalPreset,
  camelCase,
  kebabCase,
  t,
  toKebabCase,
} from "@temporal-picker/custom";
