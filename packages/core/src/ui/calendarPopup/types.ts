import { PlainType } from "../../types";
import { Context } from "../base/Component";

export type Preset = {
  label: string;
  start?: string;
  end?: string;
};

export type PopupContext = Context & {
  plain?: PlainType;
  pickCount: number;
  grid: number;
  calendars: number;
  firstDay: number;
  locale: string;
  localeCancel?: string;
  localeApply?: string;
  localeClear?: string;
  header?: HTMLElement | string | boolean;
  autoApply?: boolean;
  tooltipElement?: HTMLElement;
  resetButton?: boolean;
  extraSelect?: boolean;
  presets?: Preset[];
  presetPosition?: 'left' | 'right' | 'top' | 'bottom';
  strict?: boolean;
  // reselect?: boolean;
  min?: string;
  max?: string;
  minYear?: number;
  maxYear?: number;
  actions?: {
    scrollTo: (value: string, shift?: number) => void;
  };
};
