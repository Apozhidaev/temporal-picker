import { DateTime, Duration } from "luxon";
import { Control } from "../../../../base/Control";
import { Day } from "./Day";
import { t } from "../../../../../utils";
import { PopupContext } from "../../../types";

function calcOffsetDays(date: DateTime, firstDay: number): number {
  return date.weekday - firstDay;
}

type Props = {
  entry: string;
  picked: (string | undefined)[];
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

  protected onRender(el: HTMLElement, { entry, picked }: Props) {
    const { firstDay, plain, rowHeader, locale } = this.context;

    el.className = "days-grid";
    el.style.display = "grid";
    if (rowHeader) {
      el.style.gridTemplateColumns = "30px repeat(7, 1fr)";
    } else {
      el.style.gridTemplateColumns = "repeat(7, 1fr)";
    }

    const weekTitle = t(plain).weekTitle(locale);

    let date = DateTime.fromISO(entry).setLocale(locale);
    const offsetDays = calcOffsetDays(date, firstDay);
    const totalDays = new Date(date.get("year"), date.get("month"), 0).getDate();

    if (rowHeader) {
      const w = document.createElement("div");
      w.className = "wnum-item";
      w.title = weekTitle;
      w.innerText = date.toFormat("W");
      el.append(w);
    }

    let index = 0;
    for (let idx = 0; idx < offsetDays; idx++) {
      const offsetDay = document.createElement("div");
      offsetDay.className = "offset";
      el.appendChild(offsetDay);
      ++index;
    }

    for (let idx = 1; idx <= totalDays; idx++) {
      date = date.set({ day: idx });

      if (rowHeader && index > 0 && index % 7 === 0) {
        const w = document.createElement("div");
        w.className = "wnum-item";
        w.title = weekTitle;
        w.innerText = date.toFormat("W");
        el.append(w);
      }

      this.day.render(
        el,
        {
          day: t(plain).toInstant(date),
          picked,
        },
        `${idx}_${entry}`
      );
      ++index;
    }
  }

  protected onUpdate(el: HTMLElement, { entry, picked }: Props): void {
    const { plain } = this.context;

    let date = DateTime.fromISO(entry);
    const totalDays = new Date(date.get("year"), date.get("month"), 0).getDate();

    for (let idx = 1; idx <= totalDays; idx++) {
      date = date.set({ day: idx });
      this.day.update(
        {
          day: t(plain).toInstant(date),
          picked,
        },
        `${idx}_${entry}`
      );
    }
  }
}
