import type { PickerOptions } from "../types";
import { Picker } from "../core/picker";
import {
  ExtraOptionsPlugin,
  IExtraOptionsPlugin,
} from "../plugins/extra-options";
import { KeyboardPlugin, IKeyboardPlugin } from "../plugins/keyboard";
import { LockPlugin, ILockConfig } from "../plugins/lock";
import { coreCss } from "../assets/core";
import { extraOptionsCss } from "../assets/extra-options";
import { lockCss } from "../assets/lock";
import { keyboardCss } from "../assets/keyboard";

export type DatePickerOptions = Omit<PickerOptions, "date" | "css"> & {
  date?: string;
  css?: string;
  extraOptions?: IExtraOptionsPlugin;
  keyboardOptions?: IKeyboardPlugin;
  lockOptions?: ILockConfig;
};

export class DatePicker extends Picker {
  constructor(options: DatePickerOptions) {
    const { extraOptions, keyboardOptions, lockOptions, ...rest } = options;
    let css = coreCss + keyboardCss;
    const plugins: any[] = [KeyboardPlugin];
    if (extraOptions) {
      plugins.unshift(ExtraOptionsPlugin);
      css += extraOptionsCss;
    }
    if (lockOptions) {
      plugins.unshift(LockPlugin);
      css += lockCss;
    }
    if (rest.css) {
      css += rest.css;
    }
    super({
      ...rest,
      css,
      plugins,
      date: options.date,
      LockPlugin: lockOptions,
      KeyboardPlugin: keyboardOptions || {},
      ExtraOptionsPlugin: extraOptions,
    });
  }
}
