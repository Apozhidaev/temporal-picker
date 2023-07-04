import { PlainUnits } from "../../utils";

export type Preset = {
  label: string;
  start?: string;
  end?: string;
};

export type GridPopupContext = {
  pickCount: number;
  plainUnits: PlainUnits;
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
    days: {
      zero: string;
      one: string;
      two: string;
      few: string;
      many: string;
      other: string;
    };
    months: {
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
};
