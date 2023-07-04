import { DateTime, DateTimeUnit } from "luxon";
import { Control } from "../../base/Control";
import { GridPopupContext } from "../types";
import { datesIsNotAvailable } from "../../../utils";

function sameDate(
  date1: DateTime | undefined,
  date2: DateTime | undefined,
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
  return date1.hasSame(date2, unit);
}

type Props = {
  picked: string[];
};

export class Presets extends Control<Props, GridPopupContext> {
  constructor() {
    super();
  }

  get type(): string {
    return "Presets";
  }

  protected onRender(el: HTMLElement, props: Props) {
    const { presets, plainUnits, min, max } = this.getContext(el);

    el.className = "preset-plugin-container";

    const [startPicked, endPicked] = props.picked.map((x) =>
      DateTime.fromISO(x)
    );
    const minDate = min ? DateTime.fromISO(min) : undefined;
    const maxDate = max ? DateTime.fromISO(max) : undefined;

    presets!.forEach(({ label, start, end }) => {
      if (!start && !end) {
        return;
      }
      const startDate = start ? DateTime.fromISO(start) : undefined;
      const endDate = end ? DateTime.fromISO(end) : undefined;
      const item = document.createElement("button");
      item.className = "preset-button unit";

      if (
        sameDate(startPicked, startDate || endDate, plainUnits.same) &&
        sameDate(endPicked || startPicked, endDate, plainUnits.same)
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

      if (datesIsNotAvailable(minDate, maxDate, startDate, endDate)) {
        item.disabled = true;
      }

      el.appendChild(item);
    });
  }

  protected onUpdate(el: HTMLElement, props: Props): void {
    el.innerHTML = "";
    this.onRender(el, props);
  }
}
