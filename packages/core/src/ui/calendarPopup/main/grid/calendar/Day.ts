import { DateTime } from "luxon";
import { Control } from "../../../../base/Control";
import { PopupContext } from "../../../types";
import { datesIsNotAvailable } from "../../../../../utils";

type Props = {
  day: string;
  picked: string[];
  hover?: string;
};

export class Day extends Control<Props, PopupContext> {
  constructor() {
    super();
  }

  get type(): string {
    return "Day";
  }

  protected onRender(el: HTMLElement, props: Props) {
    const { min, max } = this.getContext(el);
    el.className = "day unit";

    const today = DateTime.now();
    const minDate = min ? DateTime.fromISO(min) : undefined;
    const maxDate = max ? DateTime.fromISO(max) : undefined;

    const instant = DateTime.fromISO(props.day);
    let picked = props.picked;
    if (props.hover) {
      picked = [...props.picked, props.hover];
      picked.sort();
    }
    const dayPicked = picked.map((x) => DateTime.fromISO(x));

    el.innerText = instant.toFormat("d");
    el.dataset.instant = props.day;

    if (instant.hasSame(today, "day")) {
      el.classList.add("today");
    }

    if ([6, 7].includes(instant.weekday)) {
      el.classList.add("weekend");
    }

    switch (dayPicked.length) {
      case 2: {
        const [start, end] = dayPicked;
        if (start.hasSame(instant, "day")) {
          el.classList.add("start");
        }

        if (end.hasSame(instant, "day")) {
          el.classList.add("end");
        }

        if (instant > start && instant < end) {
          el.classList.add("in-range");
        }
        break;
      }

      case 1: {
        if (dayPicked[0].hasSame(instant, "day")) {
          el.classList.add("selected");
        }
        break;
      }

      default:
        break;
    }

    if (datesIsNotAvailable(minDate, maxDate, instant)) {
      el.classList.add("not-available");
    }
  }

  protected onUpdate(el: HTMLElement, props: Props): void {
    this.onRender(el, props);
  }
}