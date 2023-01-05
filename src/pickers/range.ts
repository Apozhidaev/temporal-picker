import type { PickerOptions } from "../types";
import { Picker } from "../core/picker";
import {
  ExtraOptionsPlugin,
  IExtraOptionsPlugin,
} from "../plugins/extra-options";
import { KeyboardPlugin, IKeyboardPlugin } from "../plugins/keyboard";
import { LockPlugin, ILockConfig } from "../plugins/lock";
import { RangePlugin, IRangeConfig } from "../plugins/range";
import { PresetPlugin, IPresetConfig } from "../plugins/preset";
import { coreCss } from "../assets/core";
import { extraOptionsCss } from "../assets/extra-options";
import { lockCss } from "../assets/lock";
import { rangeCss } from "../assets/range";
import { presetCss } from "../assets/preset";
import { keyboardCss } from "../assets/keyboard";

export type RangePickerOptions = Omit<PickerOptions, "date" | "css"> & {
  css?: string;
  extraOptions?: IExtraOptionsPlugin;
  keyboardOptions?: IKeyboardPlugin;
  lockOptions?: ILockConfig;
  rangeOptions?: IRangeConfig;
  presetOptions?: IPresetConfig;
};

export class RangePicker extends Picker {
  constructor(options: RangePickerOptions) {
    const {
      extraOptions,
      keyboardOptions,
      lockOptions,
      rangeOptions,
      presetOptions,
      ...rest
    } = options;
    let css = coreCss + rangeCss + keyboardCss;
    const plugins: any[] = [RangePlugin, KeyboardPlugin];
    if (extraOptions) {
      plugins.unshift(ExtraOptionsPlugin);
      css += extraOptionsCss;
    }
    if (lockOptions) {
      plugins.unshift(LockPlugin);
      css += lockCss;
    }
    if (presetOptions) {
      plugins.unshift(PresetPlugin);
      css += presetCss;
    }
    if (rest.css) {
      css += rest.css;
    }
    super({
      ...rest,
      css,
      plugins,
      grid: rest.grid || 2,
      calendars: rest.calendars || 2,
      LockPlugin: lockOptions,
      KeyboardPlugin: keyboardOptions || {},
      ExtraOptionsPlugin: extraOptions,
      RangePlugin: rangeOptions || {},
      PresetPlugin: presetOptions,
    });
  }
}
