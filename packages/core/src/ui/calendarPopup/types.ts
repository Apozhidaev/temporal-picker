import { PlainType } from "../../types";

export type Preset = {
  label: string;
  start?: string;
  end?: string;
};

export type PopupContext = {
  plain?: PlainType;
  pickCount: number;
  grid: number;
  calendars: number;
  firstDay: number;
  locale: string;
  header?: HTMLElement | string | boolean;
  autoApply?: boolean;
  dictionary?: {
    previous?: string;
    next?: string;
    cancel?: string;
    apply?: string;
    reset?: string;
    days?: {
      zero: string;
      one: string;
      two: string;
      few: string;
      many: string;
      other: string;
    };
    months?: {
      zero: string;
      one: string;
      two: string;
      few: string;
      many: string;
      other: string;
    };
  };
  tooltipElement?: HTMLElement;
  resetButton?: boolean;
  extraSelect?: boolean;
  actions?: {
    gotoInstant: (instant: string, index?: number) => void;
  };
  presets?: Preset[];
  presetPosition?: 'left' | 'right' | 'top' | 'bottom';
  strict?: boolean;
  min?: string;
  max?: string;
  minYear?: number;
  maxYear?: number;
};
