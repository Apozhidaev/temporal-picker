import { DateTime } from "luxon";
import { Control } from "../../../../base/Control";
import { Month } from "./Month";
import { dt, toInstant } from "../../../../../utils";
import { PopupContext } from "../../../types";

type Props = {
  entry: string;
  picked: string[];
  hover?: string;
};

export class Months extends Control<Props, PopupContext> {
  private month = new Month();
  constructor() {
    super();
  }

  get type(): string {
    return "Months";
  }

  protected onRender(el: HTMLElement, { entry, picked, hover }: Props) {
    const { plain } = this.getContext(el);

    el.className = "days-grid";
    el.style.display = "grid";
    el.style.gridTemplateColumns = `repeat(${6}, 1fr)`;
    el.style.marginTop = "8px";

    let date = DateTime.fromISO(entry);

    for (let idx = 1; idx <= 12; idx++) {
      date = date.set({ month: idx });
      this.month.render(
        el,
        {
          month: dt(plain).toInstant(date),
          picked,
          hover,
        },
        `${idx}_${entry}`
      );
    }
  }

  protected onUpdate(el: HTMLElement, { entry, picked, hover }: Props): void {
    const { plain } = this.getContext(el);

    let date = DateTime.fromISO(entry);
    for (let idx = 1; idx <= 12; idx++) {
      date = date.set({ month: idx });
      this.month.update(
        {
          month: dt(plain).toInstant(date),
          picked,
          hover,
        },
        `${idx}_${entry}`
      );
    }
  }
}
