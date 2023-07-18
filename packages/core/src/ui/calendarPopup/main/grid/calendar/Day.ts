import { DateTime } from "luxon";
import { Control } from "../../../../base/Control";
import { PopupContext } from "../../../types";
import { t } from "../../../../../utils";

type Props = {
  day: string;
  picked: string[];
};

export class Day extends Control<Props, PopupContext> {
  constructor(host: HTMLElement, context: PopupContext) {
    super(host, context, "button");
  }

  get type(): string {
    return "grid-day";
  }

  protected onRender(el: HTMLElement, props: Props) {
    const { min, max, locale, strict } = this.context;
    el.className = "day unit";

    const today = DateTime.now();
    const minDate = min ? DateTime.fromISO(min) : undefined;
    const maxDate = max ? DateTime.fromISO(max) : undefined;

    const instant = DateTime.fromISO(props.day);
    const picked = props.picked.map((x) => (x ? DateTime.fromISO(x) : undefined));

    el.innerText = instant.setLocale(locale).toFormat("d");
    el.dataset.instant = props.day;

    if (instant.hasSame(today, "day")) {
      el.classList.add("today");
    }

    if ([6, 7].includes(instant.weekday)) {
      el.classList.add("weekend");
    }

    switch (picked.length) {
      case 3: {
        const [start, mid, end] = picked;
        if (start?.hasSame(instant, "day")) {
          el.classList.add("start");
        }

        if (end?.hasSame(instant, "day")) {
          el.classList.add("end");
        }

        if (mid?.hasSame(instant, "day")) {
          el.classList.add("selected");
        } else {
          if (start && end) {
            if (instant > start && instant < end) {
              el.classList.add("in-range");
            }
          }
        }

        break;
      }

      case 2: {
        const [start, end] = picked;
        if (start?.hasSame(instant, "day")) {
          el.classList.add("start");
        }

        if (end?.hasSame(instant, "day")) {
          el.classList.add("end");
        }

        if (start && end) {
          if (instant > start && instant < end) {
            el.classList.add("in-range");
          }
        } else if (!strict) {
          if (start) {
            if (instant > start) {
              el.classList.add("in-range", "in-range-inf");
            }
          } else if (end) {
            if (instant < end) {
              el.classList.add("in-range", "in-range-inf");
            }
          }
        }
        break;
      }

      case 1: {
        const [date] = picked;
        if (date?.hasSame(instant, "day")) {
          el.classList.add("selected");
        }
        break;
      }

      default:
        break;
    }

    if (t.datesIsNotAvailable(minDate, maxDate, instant)) {
      el.classList.add("not-available");
    }
  }

  protected onUpdate(el: HTMLElement, props: Props): void {
    this.onRender(el, props);
  }
}
