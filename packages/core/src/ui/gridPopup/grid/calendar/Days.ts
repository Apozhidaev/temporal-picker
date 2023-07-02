import { Control } from "../../../base/Control";
import { DateTime } from "luxon";
import { Day } from "./Day";
import { toInstant } from "../../../../utils";
import { GridPopupContext } from "../../types";

function calcOffsetDays(date: DateTime, firstDay: number): number {
  return date.weekday - firstDay;
}

type Props = {
  entry: string;
  picked: string[];
  hover?: string;
};

export class Days extends Control<Props, GridPopupContext> {
  private day = new Day();
  constructor() {
    super();
  }

  get type(): string {
    return "Days";
  }

  protected render(
    el: HTMLElement,
    { entry, picked, hover }: Props,
    namespace: string
  ) {
    const { firstDay, plainUnits } = this.getContext(el);

    el.className = "days-grid";
    let date = DateTime.fromISO(entry);
    const offsetDays = calcOffsetDays(date, firstDay);
    const totalDays = new Date(
      date.get("year"),
      date.get("month"),
      0
    ).getDate();

    for (let idx = 0; idx < offsetDays; idx++) {
      const offsetDay = document.createElement("div");
      offsetDay.className = "offset";
      el.appendChild(offsetDay);
    }

    for (let idx = 1; idx <= totalDays; idx++) {
      date = date.set({ day: idx });
      this.day.appendTo(
        el,
        {
          day: toInstant(date, plainUnits.plain),
          picked,
          hover,
        },
        namespace,
        `${idx}_${entry}`
      );
    }
  }
}
