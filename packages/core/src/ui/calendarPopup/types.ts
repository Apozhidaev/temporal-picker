import { PlainType } from "../../types";
import { Context } from "../base/Component";

export type Preset = {
  label: string;
  start?: string;
  end?: string;
};

export type PopupContext = Context & {
  plain?: PlainType;
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
  min?: string;
  max?: string;
  minYear?: number;
  maxYear?: number;
  rowHeader?: boolean;
  actions?: {
    scrollTo: (value: string, shift?: number) => void;
  };
};
