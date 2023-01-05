import type { Picker } from './core/picker';
import { DateTime } from './core/datetime';
import { IExtraOptionsPlugin } from './plugins/extra-options';
import { IKeyboardPlugin } from './plugins/keyboard';
import { ILockConfig } from './plugins/lock';
import { IPresetConfig } from './plugins/preset';
import { IRangeConfig } from './plugins/range';
import { ITimeConfig } from './plugins/time';


declare module './core/picker' {
  interface Picker {
    setStartDate(date: Date | string | number): void;
    setEndDate(date: Date | string | number): void;
    setDateRange(start: Date | string | number, end: Date | string | number): void;
    setISOStartDate(date: string): void;
    setISOEndDate(date: string ): void;
    setISODateRange(start: string, end: string): void;
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

export interface PickerOptions {
  element: HTMLElement;
  css?: string | string[] | ((picker: Picker) => void);
  firstDay?: number;
  lang?: string;
  date?: Date | string | number | null;
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
  zIndex?: number;
  inline?: boolean;
  scrollToDate?: boolean;
  position?: "left" | "right",
  offsetTop?: number,
  offsetLeft?: number
  setup?(picker: Picker): void;
}

export interface IPickerConfig extends PickerOptions {
  plugins?: any[];
  ExtraOptionsPlugin?: IExtraOptionsPlugin;
  LockPlugin?: ILockConfig;
  PresetPlugin?: IPresetConfig;
  RangePlugin?: IRangeConfig;
  KeyboardPlugin?: IKeyboardPlugin;
  TimePlugin?: ITimeConfig;
}
