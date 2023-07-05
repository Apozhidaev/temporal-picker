import { DateTime } from "luxon";
import { Control } from "../../../../base/Control";
import { PopupContext } from "../../../types";

type Props = {
  weekday: number;
};

export class DayName extends Control<Props, PopupContext> {
  get type(): string {
    return "day-name";
  }

  protected onRender(el: HTMLElement, { weekday }: Props) {
    const { locale } = this.context;

    el.className = "dayname";

    const dt = DateTime.utc(2016, 11, 13 + weekday).setLocale(locale);

    el.innerText = dt.toLocaleString({ weekday: "short" });
    el.title = dt.toLocaleString({ weekday: "long" });
  }
}
