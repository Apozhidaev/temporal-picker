import { PickerType, PlainType } from "../types";
import { GridPopup as UI } from "../ui/gridPopup/GridPopup";
import { DatePopup } from "./DatePopup";
import { DateTime } from "luxon";
import { getPlainUnits, toInstant } from "../utils";

type Options = {
  element: HTMLElement;
  type: PickerType;
  palin: PlainType;
  pickCount: 1 | 2;
  header?: HTMLElement | string | boolean;
  autoApply?: boolean;
  grid?: number;
  calendars?: number;
  locale?: string;
  dictionary?: {
    previous?: string;
    next?: string;
    cancel?: string;
    apply?: string;
  };
};

export class RangePopup extends DatePopup {
  constructor(options: Options) {
    super(options);
    this.options = options;
    this.plainUnits = getPlainUnits(this.options.palin);
    this.entry = toInstant(DateTime.now().startOf(this.plainUnits.entry));
   
    this.container = this.options.element;

    this.container.addEventListener("mouseenter", this.handleMouseenter, true);
  }

  protected getUI() {
    return new UI({
      pickCount: 2,
      plainUnits: this.plainUnits,
      firstDay: 1,
      locale: "en-US",
      grid: 2,
      calendars: 2,
    });
  }

  public destroy() {
    super.destroy();
    this.container.removeEventListener(
      "mouseenter",
      this.handleMouseenter,
      true
    );
  }

  handleMouseenter = (e: MouseEvent) => {
    const target = e.target;

    if (target instanceof HTMLElement) {
      const element = target.closest(".unit");

      if (!(element instanceof HTMLElement)) return;

      if (this.isCalendarUnit(element)) {
        if (this.picked.length !== 1) return;
        const instant = element.dataset.instant;

        if (instant) {
          this.render(instant);
        }
      }
    }
  };
}
