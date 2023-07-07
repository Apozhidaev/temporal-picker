import { DateTime } from "luxon";
import { Control } from "../../../../base/Control";
import { Day } from "./Day";
import { t } from "../../../../../utils";
import { PopupContext } from "../../../types";

function calcOffsetDays(date: DateTime, firstDay: number): number {
  return date.weekday - firstDay;
}

type Props = {
  entry: string;
  picked: string[];
  hover?: string;
};

export class Days extends Control<Props, PopupContext> {
  private day;

  constructor(host: HTMLElement, context: PopupContext) {
    super(host, context);
    this.day = new Day(host, context);
  }

  get type(): string {
    return "days-grid";
  }

  protected onRender(el: HTMLElement, { entry, picked, hover }: Props) {
    const { firstDay, plain } = this.context;

    el.className = "days-grid";
    el.style.display = "grid";
    el.style.gridTemplateColumns = "repeat(7, 1fr)";

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
      this.day.render(
        el,
        {
          day: t(plain).toInstant(date),
          picked,
          hover,
        },
        `${idx}_${entry}`
      );
    }
  }

  protected onUpdate(el: HTMLElement, { entry, picked, hover }: Props): void {
    const { plain } = this.context;

    let date = DateTime.fromISO(entry);
    const totalDays = new Date(
      date.get("year"),
      date.get("month"),
      0
    ).getDate();

    for (let idx = 1; idx <= totalDays; idx++) {
      date = date.set({ day: idx });
      this.day.update(
        {
          day: t(plain).toInstant(date),
          picked,
          hover,
        },
        `${idx}_${entry}`
      );
    }
  }
}
