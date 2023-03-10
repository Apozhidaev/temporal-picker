import { DateTime } from 'luxon';
import type { Picker } from './core/picker';
import { ExtraOptions } from './plugins/extra-options';
import { KeyboardOptions } from './plugins/keyboard';
import { LockOptions } from './plugins/lock';
import { PresetOptions } from './plugins/preset';

export interface IEventDetail {
  view?: string;
  date?: DateTime;
  target?: HTMLElement;
  index?: number;
}

export interface IPickerElements {
  container: HTMLElement;
  shadowRoot: ShadowRoot;
  wrapper: HTMLElement;
}

export interface PickerOptions {
  element: HTMLElement;
  css?: string;
  firstDay?: number;
  lang?: string;
  format?: string;
  grid?: number;
  calendars?: number;
  readonly?: boolean;
  autoApply?: boolean;
  header?: boolean | string | HTMLElement;
  locale?: {
    previousMonth?: string;
    nextMonth?: string;
    cancel?: string;
    apply?: string;
  }
  documentClick?: boolean | (() => void);
  scrollToDate?: boolean;
  placement?: "bottom-start" | "bottom-end",
  offsetTop?: number,
  offsetLeft?: number
  setup?(picker: Picker<PickerOptions>): void;
}

export interface PickerConfig extends PickerOptions {
  plugins?: any[];
  ExtraOptionsPlugin?: ExtraOptions;
  LockPlugin?: LockOptions;
  PresetPlugin?: PresetOptions;
  KeyboardPlugin?: KeyboardOptions;
}
