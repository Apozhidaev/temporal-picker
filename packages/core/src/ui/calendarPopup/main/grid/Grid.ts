import { Control } from "../../../base/Control";
import { Calendar } from "./calendar/Calendar";
import { t } from "../../../../utils";
import { PopupContext } from "../../types";

type Props = {
  entry: string;
  picked: (string | undefined)[];
};

export class Grid extends Control<Props, PopupContext> {
  private calendar;

  constructor(host: HTMLElement, context: PopupContext) {
    super(host, context);
    this.calendar = new Calendar(host, context);
  }

  get type(): string {
    return "calendar-popup-grid";
  }

  protected onRender(el: HTMLElement, props: Props) {
    const { grid, calendars, plain } = this.context;

    el.className = `calendars grid-${grid}`;
    el.style.display = "grid";
    el.style.gridTemplateColumns = `repeat(${grid}, 1fr)`;

    let calendarEntry = props.entry;
    for (let i = 0; i < calendars; i++) {
      this.calendar.render(
        el,
        {
          index: i,
          entry: calendarEntry,
          picked: props.picked,
        },
        calendarEntry
      );

      calendarEntry = t(plain).next(calendarEntry);
    }
  }

  protected onUpdate(el: HTMLElement, props: Props): void {
    const { calendars, plain } = this.context;
    let calendarEntry = props.entry;
    for (let i = 0; i < calendars; i++) {
      this.calendar.update(
        {
          index: i,
          entry: calendarEntry,
          picked: props.picked,
        },
        calendarEntry
      );

      calendarEntry = t(plain).next(calendarEntry);
    }
  }
}
