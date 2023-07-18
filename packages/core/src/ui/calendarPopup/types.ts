import { PlainType } from "../../types";
import { Context } from "../base/Component";

export type Preset = {
  label: string;
  start?: string | null;
  end?: string | null;
};

export type PopupContext = Context & {
  plain?: PlainType;
  grid: number;
  calendars: number;
  firstDay: number;
  locale: string;
  localeCancel?: string | null;
  localeApply?: string | null;
  localeClear?: string | null;
  header?: HTMLElement | string | boolean | null;
  autoApply?: boolean | null;
  tooltipElement?: HTMLElement;
  resetButton?: boolean | null;
  extraSelect?: boolean | null;
  presets?: Preset[];
  presetPosition?: "left" | "right" | "top" | "bottom" | null;
  strict?: boolean | null;
  min?: string | null;
  max?: string | null;
  minYear?: number | null;
  maxYear?: number | null;
  rowHeader?: boolean | null;
  pickLabel?: boolean | null;
  actions?: {
    scrollTo: (value: string, shift?: number) => void;
  };
};
