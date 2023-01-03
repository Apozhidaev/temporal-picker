import type { IPickerConfig } from "./types";
import type { IEventDetail, IPlugin } from "./plugins/base";
import { Picker } from "./picker";
import { BasePlugin } from "./plugins/base";
import { AmpPlugin } from "./plugins/amp";
import { LockPlugin } from "./plugins/lock";
import { PresetPlugin } from "./plugins/preset";
import { RangePlugin } from "./plugins/range";
import { KeyboardPlugin } from "./plugins/keyboard";
import { ampCss } from "./assets/amp";
import { coreCss } from "./assets/core";
import { lockCss } from "./assets/lock";
import { presetCss } from "./assets/preset";
import { rangeCss } from "./assets/range";

export type { IPickerConfig, IEventDetail, IPlugin };

export {
  Picker,
  BasePlugin,
  AmpPlugin,
  LockPlugin,
  PresetPlugin,
  RangePlugin,
  KeyboardPlugin,
  ampCss,
  coreCss,
  lockCss,
  presetCss,
  rangeCss,
};

export default Picker;
