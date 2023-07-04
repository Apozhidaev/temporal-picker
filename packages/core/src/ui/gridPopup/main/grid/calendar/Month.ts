import { DateTime } from "luxon";
import { Control } from "../../../../base/Control";


type Props = {
  month: string;
  picked: string[];
  hover?: string;
};

export class Month extends Control<Props> {
  constructor() {
    super();
  }

  get type(): string {
    return "Month";
  }

  protected onRender(el: HTMLElement, props: Props) {
    el.className = "day unit";

    const today = DateTime.now();

    const instant = DateTime.fromISO(props.month);
    let picked = props.picked;
    if (props.hover) {
      picked = [...props.picked, props.hover];
      picked.sort();
    }
    const dayPicked = picked.map((x) => DateTime.fromISO(x));

    el.innerText = instant.toFormat("LLL");
    el.dataset.instant = props.month;

    if (instant.hasSame(today, "month")) {
      el.classList.add("today");
    }

    switch (dayPicked.length) {
      case 2: {
        const [start, end] = dayPicked;
        if (start.hasSame(instant, "month")) {
          el.classList.add("start");
        }

        if (end.hasSame(instant, "month")) {
          el.classList.add("end");
        }

        if (instant > start && instant < end) {
          el.classList.add("in-range");
        }
        break;
      }

      case 1: {
        if (dayPicked[0].hasSame(instant, "month")) {
          el.classList.add("selected");
        }
        break;
      }

      default:
        break;
    }
  }

  protected onUpdate(el: HTMLElement, props: Props): void {
    this.onRender(el, props);
  }
}
