import { defineCustomElements } from "@temporal-picker/custom-elements";
import { DatePicker } from "./date";

defineCustomElements();

export * from './types';
export * from './date';
export * from './range';

export default DatePicker;
