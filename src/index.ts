import type { IPickerConfig } from "./types";
import type { IEventDetail, IPlugin } from "./plugins/base";
import { Picker } from "./core/picker";
import { BasePlugin } from "./plugins/base";
import { ExtraOptionsPlugin } from "./plugins/extra-options";
import { LockPlugin } from "./plugins/lock";
import { PresetPlugin } from "./plugins/preset";
import { RangePlugin } from "./plugins/range";
import { KeyboardPlugin } from "./plugins/keyboard";
import { TimePlugin } from "./plugins/time";
import { extraOptionsCss } from "./assets/extra-options";
import { coreCss } from "./assets/core";
import { lockCss } from "./assets/lock";
import { presetCss } from "./assets/preset";
import { rangeCss } from "./assets/range";
import { timeCss } from "./assets/time";
import { keyboardCss } from "./assets/keyboard";
import { DatePicker, DatePickerOptions } from "./pickers/date";
import { RangePicker, RangePickerOptions } from "./pickers/range";

export type {
  DatePickerOptions,
  RangePickerOptions,
  IPickerConfig,
  IEventDetail,
  IPlugin,
};

export {
  DatePicker,
  RangePicker,
  Picker as PlainPicker,
  BasePlugin,
  ExtraOptionsPlugin,
  LockPlugin,
  PresetPlugin,
  RangePlugin,
  KeyboardPlugin,
  TimePlugin,
  extraOptionsCss,
  coreCss,
  lockCss,
  presetCss,
  rangeCss,
  timeCss,
  keyboardCss,
};

export default Picker;
