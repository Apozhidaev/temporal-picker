import { DateTime } from "luxon";
import { BasePlugin, EventDetail, IPlugin } from "./base";

export interface LockOptions {
  minDate?: DateTime;
  maxDate?: DateTime;
  minDays?: number;
  maxDays?: number;
  selectForward?: boolean;
  selectBackward?: boolean;
  presets?: boolean;
  inseparable?: boolean;
  filter?: (date: DateTime | DateTime[], picked: DateTime[]) => boolean;
}

export class LockPlugin extends BasePlugin implements IPlugin {
  public priority = 1;

  public binds = {
    onView: this.onView.bind(this),
  };

  public options: LockOptions = {
    minDate: null,
    maxDate: null,
    minDays: null,
    maxDays: null,
    selectForward: null,
    selectBackward: null,
    presets: true,
    inseparable: false,
    filter: null,
  } as any;

  /**
   * Returns plugin name
   *
   * @returns String
   */
  public getName(): string {
    return "LockPlugin";
  }

  /**
   * - Called automatically via BasePlugin.attach() -
   * The function execute on initialize the picker
   */
  public onAttach(): void {
    if (this.options.maxDate) {
      if (
        this.picker.options.calendars! > 1 &&
        this.picker.calendars[0].hasSame(this.options.maxDate, "month")
      ) {
        const d = this.picker.calendars[0].minus({ month: 1 });
        this.picker.gotoDate(d.toISO());
      }
    }

    // if (
    //   this.options.minDays ||
    //   this.options.maxDays ||
    //   this.options.selectForward ||
    //   this.options.selectBackward
    // ) {
    //   if (!this.picker.options.plugins.includes("RangePlugin")) {
    //     const list = ["minDays", "maxDays", "selectForward", "selectBackward"];
    //     console.warn(
    //       `${this.getName()}: options ${list.join(", ")} required RangePlugin.`
    //     );
    //   }
    // }

    this.picker.on("view", this.binds.onView);
  }

  /**
   * - Called automatically via BasePlugin.attach() -
   * The function execute on initialize the picker
   */
  public onDetach(): void {
    this.picker.off("view", this.binds.onView);
  }

  /**
   * Function `view` event
   * Mark day elements as locked
   *
   * @param event
   */
  private onView(event: CustomEvent) {
    const { view, target, date }: Required<EventDetail> = event.detail;

    if (view === "CalendarHeader") {
      if (this.options.minDate instanceof DateTime) {
        if (
          date?.hasSame(this.options.minDate, "month") ||
          date < this.options.minDate
        ) {
          target.classList.add("no-previous-month");
        }
      }

      if (this.options.maxDate instanceof DateTime) {
        if (
          date.hasSame(this.options.maxDate, "month") ||
          date > this.options.maxDate
        ) {
          target.classList.add("no-next-month");
        }
      }
    }

    if (view === "CalendarDay") {
      const dateFrom = this.picker.datePicked[0];

      if (this.testFilter(date)) {
        target.classList.add("locked");
        return;
      }

      if (this.options.inseparable) {
        if (this.options.minDays) {
          let date1 = date
            .minus({ day: this.options.minDays - 1 })
            .startOf("day");
          let date2 = date
            .plus({ day: this.options.minDays - 1 })
            .startOf("day");
          let lockedInPrevDays = false;
          let lockedInNextDays = false;

          while (date1 < date) {
            if (this.testFilter(date1)) {
              lockedInPrevDays = true;
              break;
            }

            date1 = date1.plus({ day: 1 });
          }

          while (date2 > date) {
            if (this.testFilter(date2)) {
              lockedInNextDays = true;
              break;
            }

            date2 = date2.minus({ day: 1 });
          }

          if (lockedInPrevDays && lockedInNextDays) {
            target.classList.add("not-available");
          }
        }

        if (this.rangeIsNotAvailable(date, dateFrom)) {
          target.classList.add("not-available");
        }
      }

      if (this.dateIsNotAvailable(date, dateFrom)) {
        target.classList.add("not-available");
      }
    }

    if (this.options.presets && view === "PresetPluginButton") {
      const startDate = DateTime.fromISO(target.dataset.start!);
      const endDate = DateTime.fromISO(target.dataset.end!);
      const diff = endDate.diff(startDate, "day");

      const lessMinDays =
        this.options.minDays && diff.days < this.options.minDays;
      const moreMaxDays =
        this.options.maxDays && diff.days > this.options.maxDays;

      if (
        lessMinDays ||
        moreMaxDays ||
        this.lockMinDate(startDate) ||
        this.lockMaxDate(startDate) ||
        this.lockMinDate(endDate) ||
        this.lockMaxDate(endDate) ||
        this.rangeIsNotAvailable(startDate, endDate)
      ) {
        target.setAttribute("disabled", "disabled");
      }
    }
  }

  /**
   * Checks availability date
   *
   * @param date
   * @param start
   * @returns Boolean
   */
  private dateIsNotAvailable(date: DateTime, start: DateTime): boolean {
    return (
      this.lockMinDate(date) ||
      this.lockMaxDate(date) ||
      this.lockMinDays(date, start) ||
      this.lockMaxDays(date, start) ||
      this.lockSelectForward(date) ||
      this.lockSelectBackward(date)
    );
  }

  /**
   * Checks the date range for availability
   *
   * @param date1
   * @param date2
   * @returns Boolean
   */
  private rangeIsNotAvailable(date1?: DateTime, date2?: DateTime): boolean {
    if (!date1 || !date2) return false;

    let start = date1.hasSame(date2, "day") || date1 < date2 ? date1 : date2;
    const end = date2.hasSame(date1, "day") || date2 > date1 ? date2 : date1;

    while (start.hasSame(end, "day") || start < end) {
      if (this.testFilter(start)) {
        return true;
      }

      start = start.plus({ day: 1 });
    }

    return false;
  }

  /**
   * Handle `minDate` option
   *
   * @param date
   * @returns Boolean
   */
  private lockMinDate(date: DateTime): boolean {
    return this.options.minDate ? date < this.options.minDate : false;
  }

  /**
   * Handle `maxDate` option
   *
   * @param date
   * @returns Boolean
   */
  private lockMaxDate(date: DateTime): boolean {
    return this.options.maxDate ? date < this.options.maxDate : false;
  }

  /**
   * Handle `minDays` option
   *
   * @param date
   * @returns Boolean
   */
  private lockMinDays(date: DateTime, start: DateTime): boolean {
    if (this.options.minDays && start) {
      const minPrev = start
        .minus({ day: this.options.minDays - 1 })
        .startOf("day");
      const minNext = start
        .plus({ day: this.options.minDays - 1 })
        .endOf("day");

      return minPrev <= date && date <= minNext;
    }

    return false;
  }

  /**
   * Handle `maxDays` option
   *
   * @param date
   * @returns Boolean
   */
  private lockMaxDays(date: DateTime, start: DateTime): boolean {
    if (this.options.maxDays && start) {
      const maxPrev = start.minus({ day: this.options.maxDays }).startOf("day");
      const maxNext = start.plus({ day: this.options.maxDays }).endOf("day");

      return date < maxPrev && maxNext < date;
    }

    return false;
  }

  /**
   * Handle `selectForward` option
   *
   * @param date
   * @returns Boolean
   */
  private lockSelectForward(date: DateTime): boolean {
    if (this.picker.datePicked.length === 1 && this.options.selectForward) {
      const start = this.picker.datePicked[0].startOf("day");

      return date < start;
    }

    return false;
  }

  /**
   * Handle `selectBackward` option
   *
   * @param date
   * @returns Boolean
   */
  private lockSelectBackward(date: DateTime): boolean {
    if (this.picker.datePicked.length === 1 && this.options.selectBackward) {
      const start = this.picker.datePicked[0].endOf("day");

      return start < date;
    }

    return false;
  }

  /**
   * Handle `filter` option
   *
   * @param date
   * @returns Boolean
   */
  private testFilter(date: DateTime): boolean {
    return typeof this.options.filter === "function"
      ? this.options.filter(date, this.picker.datePicked)
      : false;
  }
}
