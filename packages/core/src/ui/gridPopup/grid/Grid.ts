import { DateTime } from "luxon";
import { Control } from "../../base/Control";
import { Calendar } from "./calendar/Calendar";
import { toInstant } from "../../../utils";
import { GridPopupContext } from "../types";

type Props = {
  entry: string;
  picked: string[];
  hover?: string;
};

export class Grid extends Control<Props, GridPopupContext> {
  private calendar = new Calendar();

  constructor() {
    super("main");
  }

  get type(): string {
    return "Grid";
  }

  protected render(el: HTMLElement, props: Props, namespace: string) {
    const { grid, calendars, plainUnits } = this.getContext(el);

    el.className = `calendars grid-${grid}`;

    let date = DateTime.fromISO(props.entry);
    for (let i = 0; i < calendars; i++) {
      this.calendar.memo(
        el,
        {
          index: i,
          entry: toInstant(date, plainUnits.plain),
          picked: props.picked,
          hover: props.hover,
        },
        namespace,
        `${i}_${props.entry}`
      );

      date = date.plus(plainUnits.step);
    }
  }
}
