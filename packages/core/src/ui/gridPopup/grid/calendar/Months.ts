import { Control } from "../../../base/Control";
import { DateTime } from "luxon";
import { Month } from "./Month";
import { toInstant } from "../../../../utils";
import { GridPopupContext } from "../../types";

type Props = {
  entry: string;
  picked: string[];
  hover?: string;
};

export class Months extends Control<Props, GridPopupContext> {
  private month = new Month();
  constructor() {
    super();
  }

  get type(): string {
    return "Months";
  }

  protected onRender(el: HTMLElement, { entry, picked, hover }: Props) {
    const { plainUnits } = this.getContext(el);

    el.className = "days-grid";
    el.style.display = "grid";
    el.style.gridTemplateColumns = `repeat(${6}, 1fr)`;

    let date = DateTime.fromISO(entry);

    for (let idx = 1; idx <= 12; idx++) {
      date = date.set({ month: idx });
      this.month.render(
        el,
        {
          month: toInstant(date, plainUnits.plain),
          picked,
          hover,
        },
        `${idx}_${entry}`
      );
    }
  }

  protected onUpdate(el: HTMLElement, { entry, picked, hover }: Props): void {
    const { plainUnits } = this.getContext(el);

    let date = DateTime.fromISO(entry);
    for (let idx = 1; idx <= 12; idx++) {
      date = date.set({ month: idx });
      this.month.update(
        {
          month: toInstant(date, plainUnits.plain),
          picked,
          hover,
        },
        `${idx}_${entry}`
      );
    }
  }
}
