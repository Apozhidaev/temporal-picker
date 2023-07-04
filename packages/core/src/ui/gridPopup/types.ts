import { PlainUnits } from "../../utils";

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
};