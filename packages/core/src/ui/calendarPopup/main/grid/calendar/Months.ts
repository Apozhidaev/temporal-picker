import { DateTime } from "luxon";
import { Control } from "../../../../base/Control";
import { Month } from "./Month";
import { t } from "../../../../../utils";
import { PopupContext } from "../../../types";

type Props = {
  entry: string;
  picked: string[];
  hover?: string;
};

export class Months extends Control<Props, PopupContext> {
  private month;

  constructor(host: HTMLElement, context: PopupContext) {
    super(host, context);
    this.month = new Month(host, context);
  }

  get type(): string {
    return "months-grid";
  }

  protected onRender(el: HTMLElement, { entry, picked, hover }: Props) {
    const { plain } = this.context;

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
          month: t(plain).toInstant(date),
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
    for (let idx = 1; idx <= 12; idx++) {
      date = date.set({ month: idx });
      this.month.update(
        {
          month: t(plain).toInstant(date),
          picked,
          hover,
        },
        `${idx}_${entry}`
      );
    }
  }
}
