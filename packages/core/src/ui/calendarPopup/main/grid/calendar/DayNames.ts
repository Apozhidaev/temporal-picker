import { Control } from "../../../../base/Control";
import { DayName } from "./DayName";
import { PopupContext } from "../../../types";

type Props = {};

export class DayNames extends Control<Props, PopupContext> {
  private dayName = new DayName();
  constructor() {
    super();
  }

  get type(): string {
    return "DayNames";
  }

  protected onRender(el: HTMLElement, {}: Props) {
    const { firstDay } = this.getContext(el);

    el.className = "daynames-row";
    el.style.display = "grid";
    el.style.gridTemplateColumns = "repeat(7, 1fr)";

    for (let i = 0; i < 7; i++) {
      this.dayName.render(el, { weekday: i + firstDay }, String(i));
    }
  }
}
