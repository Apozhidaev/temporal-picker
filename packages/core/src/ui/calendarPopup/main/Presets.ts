import { DateTime } from "luxon";
import { Control } from "../../base/Control";
import { PopupContext } from "../types";
import { t } from "../../../utils";

type Props = {
  picked: string[];
};

export class Presets extends Control<Props, PopupContext> {
  get type(): string {
    return "calendar-popup-presets";
  }

  protected onRender(el: HTMLElement, props: Props) {
    const { presets, min, max, plain } = this.context;

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
        t(plain).sameRanges([startPicked, endPicked], [startDate, endDate])
      ) {
        item.classList.add("selected");
      } else {
        item.classList.remove("selected");
      }
      item.innerHTML = label;
      if (start) {
        item.dataset.start = t(plain).instant(start);
      }
      if (end) {
        item.dataset.end = t(plain).instant(end);
      }

      if (t(plain).datesIsNotAvailable(minDate, maxDate, startDate, endDate)) {
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
