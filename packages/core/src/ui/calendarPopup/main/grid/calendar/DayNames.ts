import { Control } from "../../../../base/Control";
import { DayName } from "./DayName";
import { PopupContext } from "../../../types";

type Props = {};

export class DayNames extends Control<Props, PopupContext> {
  private dayName;

  constructor(host: HTMLElement, context: PopupContext) {
    super(host, context);
    this.dayName = new DayName(host, context);
  }

  get type(): string {
    return "day-names";
  }

  protected onRender(el: HTMLElement, {}: Props) {
    const { firstDay } = this.context;

    el.className = "daynames-row";
    el.style.display = "grid";
    el.style.gridTemplateColumns = "repeat(7, 1fr)";

    for (let i = 0; i < 7; i++) {
      this.dayName.render(el, { weekday: i + firstDay }, String(i));
    }
  }
}
