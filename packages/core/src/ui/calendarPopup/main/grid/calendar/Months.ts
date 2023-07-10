import { DateTime } from "luxon";
import { Control } from "../../../../base/Control";
import { Month } from "./Month";
import { t } from "../../../../../utils";
import { PopupContext } from "../../../types";

type Props = {
  entry: string;
  picked: (string | undefined)[];
  action?: string;
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

  protected onRender(el: HTMLElement, { entry, picked, action }: Props) {
    const { plain, rowHeader } = this.context;

    el.className = "days-grid";
    el.style.display = "grid";

    const columns = 3;

    if (rowHeader) {
      el.style.gridTemplateColumns = `30px repeat(${columns}, 1fr)`;
    } else {
      el.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    }

    if(action){
      el.classList.add(action);
    }

    let date = DateTime.fromISO(entry);

    for (let idx = 1; idx <= 12; idx++) {
      date = date.set({ month: idx });

      if (rowHeader && (idx - 1) % columns === 0) {
        const q = document.createElement("div");
        q.className = "wnum-item";
        q.innerText = date.toFormat("q");
        el.append(q);
      }

      this.month.render(
        el,
        {
          month: t(plain).toInstant(date),
          picked,
        },
        `${idx}_${entry}`
      );
    }
  }

  protected onUpdate(el: HTMLElement, { entry, picked }: Props): void {
    const { plain } = this.context;

    let date = DateTime.fromISO(entry);
    for (let idx = 1; idx <= 12; idx++) {
      date = date.set({ month: idx });
      this.month.update(
        {
          month: t(plain).toInstant(date),
          picked,
        },
        `${idx}_${entry}`
      );
    }
  }
}
