import type { PickerConfig, PlainType } from "./types";
import type { EventDetail, IPlugin } from "./plugins/base";
import { Picker } from "./core/picker";
import { BasePlugin } from "./plugins/base";
import { ExtraOptionsPlugin, ExtraOptions } from "./plugins/extra-options";
import { LockPlugin, LockOptions } from "./plugins/lock";
import { PresetPlugin, PresetOptions } from "./plugins/preset";
import { KeyboardPlugin, KeyboardOptions } from "./plugins/keyboard";
import { DatePicker, DatePickerOptions } from "./pickers/date";
import { RangePicker, RangePickerOptions } from "./pickers/range";

export type {
  PlainType,
  DatePickerOptions,
  RangePickerOptions,
  ExtraOptions,
  LockOptions,
  PresetOptions,
  KeyboardOptions,
  PickerConfig,
  EventDetail,
  IPlugin,
};

export {
  DatePicker,
  RangePicker,
  Picker,
  BasePlugin,
  ExtraOptionsPlugin,
  LockPlugin,
  PresetPlugin,
  KeyboardPlugin,
};
