import { define } from "temporal-picker";
import { DatePicker } from "./date";

define();

export { t } from "temporal-picker";

export * from './types';
export * from './date';
export * from './range';
export * from './hooks';

export default DatePicker;
