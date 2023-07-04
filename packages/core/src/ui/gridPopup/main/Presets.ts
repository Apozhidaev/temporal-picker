import { DateTime, DateTimeUnit } from "luxon";
import { Control } from "../../base/Control";
import { GridPopupContext } from "../types";
import { Grid } from "./grid/Grid";

export function sameDate(
  date1: string | undefined,
  date2: string | undefined,
  unit: DateTimeUnit
) {
  if (!date1 && !date2) {
    return true;
  }
  if (date1 === date2) {
    return true;
  }
  if (!date1 || !date2) {
    return false;
  }
  return DateTime.fromISO(date1).hasSame(DateTime.fromISO(date2), unit);
}

type Props = {
  picked: string[];
};

export class Presets extends Control<Props, GridPopupContext> {
  private grid = new Grid();

  constructor() {
    super();
  }

  get type(): string {
    return "Presets";
  }

  protected onRender(el: HTMLElement, props: Props) {
    const { presets, plainUnits } = this.getContext(el);

    el.className = "preset-plugin-container";

    const [startDate, endDate] = props.picked;

    presets!.forEach(({ label, start, end }) => {
      if (!start && !end) {
        return;
      }
      const item = document.createElement("button");
      item.className = "preset-button unit";

      if (
        sameDate(startDate, start || end, plainUnits.same) &&
        sameDate(endDate || startDate, end, plainUnits.same)
      ) {
        item.classList.add("selected");
      } else {
        item.classList.remove("selected");
      }
      item.innerHTML = label;
      if (start) {
        item.dataset.start = start;
      }
      if (end) {
        item.dataset.end = end;
      }

      el.appendChild(item);
    });
  }

  protected onUpdate(el: HTMLElement, props: Props): void {
    el.innerHTML = "";
    this.onRender(el, props);
  }
}
