import { Control } from "../../../base/Control";
import { DayName } from "./DayName";
import { GridPopupContext } from "../../types";

type Props = {};

export class DayNames extends Control<Props, GridPopupContext> {
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

    for (let i = 0; i < 7; i++) {
      this.dayName.render(el, { weekday: i + firstDay }, String(i));
    }
  }
}
