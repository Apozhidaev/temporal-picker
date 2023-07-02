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

  protected render(el: HTMLElement, {}: Props, namespace: string) {
    const { firstDay } = this.getContext(el);

    el.className = "daynames-row";

    for (let i = 0; i < 7; i++) {
      this.dayName.appendTo(el, { weekday: i + firstDay }, namespace, `${i}`);
    }
  }
}
