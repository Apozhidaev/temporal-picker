import { defineCustomElements } from "@temporal-picker/custom";
import { DatePicker } from "./date";

defineCustomElements();

export { t } from "@temporal-picker/custom";

export * from './types';
export * from './date';
export * from './range';
export * from './hooks';

export default DatePicker;
