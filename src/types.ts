import type { Picker } from './picker';
import { DateTime } from './datetime';
import { IExtraOptionsPlugin } from './plugins/extra-options';
import { IKeyboardPlugin } from './plugins/keyboard';
import { ILockConfig } from './plugins/lock';
import { IPresetConfig } from './plugins/preset';
import { IRangeConfig } from './plugins/range';
import { ITimeConfig } from './plugins/time';


declare module './picker' {
  interface Picker {
    setStartDate(date: Date | string | number): void;
    setEndDate(date: Date | string | number): void;
    setDateRange(start: Date | string | number, end: Date | string | number): void;
    getStartDate(): DateTime;
    getEndDate(): DateTime;
    setTime(value: string): void;
    setStartTime(value: string): void;
    setEndTime(value: string): void;
  }
}

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

export interface IPickerConfig {
  element: HTMLElement | string;
  doc?: Document | ShadowRoot;
  css?: string | string[] | ((picker: Picker) => void);
  firstDay?: number;
  lang?: string;
  date?: Date | string | number;
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
  plugins?: any[];
  documentClick?: boolean | (() => void);
  zIndex?: number;
  inline?: boolean;
  scrollToDate?: boolean;
  setup?(picker: Picker): void;
  ExtraOptionsPlugin?: IExtraOptionsPlugin;
  LockPlugin?: ILockConfig;
  PresetPlugin?: IPresetConfig;
  RangePlugin?: IRangeConfig;
  KeyboardPlugin?: IKeyboardPlugin;
  TimePlugin?: ITimeConfig;
}