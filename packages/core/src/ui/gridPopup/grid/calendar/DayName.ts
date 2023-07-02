import { Control } from "../../../base/Control";
import { DateTime } from "luxon";
import { GridPopupContext } from "../../types";

type Props = {
  weekday: number;
};

export class DayName extends Control<Props, GridPopupContext> {
  constructor() {
    super();
  }

  get type(): string {
    return "DayName";
  }

  protected render(el: HTMLElement, { weekday }: Props) {
    const { locale } = this.getContext(el);

    el.className = "dayname";

    const dt = DateTime.utc(2016, 11, 13 + weekday).setLocale(locale);

    el.innerHTML = dt.toLocaleString({ weekday: "short" });
    el.title = dt.toLocaleString({ weekday: "long" });
  }
}
