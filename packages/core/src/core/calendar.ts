import { DateTime } from "luxon";
import type { Picker } from "./picker";
import { PickerConfig } from "../types";

export default class Calendar<TOptions extends PickerConfig> {
  public picker: Picker<TOptions>;

  constructor(picker: Picker<TOptions>) {
    this.picker = picker;
  }

  /**
   * Render transferred date and view
   *
   * @param date
   * @param view
   */
  public render(date: DateTime, view: string): void {
    if (!date) {
      date = DateTime.now();
    }

    // find function for view
    // @ts-ignore
    if (typeof this[`get${view}View`] === "function") {
      // @ts-ignore
      this[`get${view}View`](date.startOf("month"));
    }
  }

  /**
   * Function for `Container` view
   *
   * @param date
   */
  public getContainerView(date: DateTime): void {
    this.picker.ui.container.innerHTML = "";

    if (this.picker.options.header) {
      this.picker.trigger("render", { date, view: "Header" });
    }

    this.picker.trigger("render", { date, view: "Main" });

    if (!this.picker.options.autoApply) {
      this.picker.trigger("render", { date, view: "Footer" });
    }
  }

  /**
   * Function for `Header` view
   *
   * @param date
   */
  public getHeaderView(date: DateTime): void {
    const element = document.createElement("header");

    if (this.picker.options.header instanceof HTMLElement) {
      element.appendChild(this.picker.options.header);
    }

    if (typeof this.picker.options.header === "string") {
      element.innerHTML = this.picker.options.header;
    }

    this.picker.ui.container.appendChild(element);
    this.picker.trigger("view", { target: element, date, view: "Header" });
  }

  /**
   * Function for `Main` view
   *
   * @param date
   */
  public getMainView(date: DateTime): void {
    const main = document.createElement("main");
    this.picker.ui.container.appendChild(main);

    const calendars = document.createElement("div");
    calendars.className = `calendars grid-${this.picker.options.grid}`;

    for (let i = 0; i < this.picker.options.calendars!; i++) {
      const month = document.createElement("div");
      month.className = "calendar";
      calendars.appendChild(month);

      const calendarHeader = this.getCalendarHeaderView(date);
      month.appendChild(calendarHeader);
      this.picker.trigger("view", {
        date,
        view: "CalendarHeader",
        index: i,
        target: calendarHeader,
      });

      const dayNames = this.getCalendarDayNamesView();
      month.appendChild(dayNames);
      this.picker.trigger("view", {
        date,
        view: "CalendarDayNames",
        index: i,
        target: dayNames,
      });

      const daysView = this.getCalendarDaysView(date);
      month.appendChild(daysView);
      this.picker.trigger("view", {
        date,
        view: "CalendarDays",
        index: i,
        target: daysView,
      });

      const calendarFooter = this.getCalendarFooterView();
      month.appendChild(calendarFooter);
      this.picker.trigger("view", {
        date,
        view: "CalendarFooter",
        index: i,
        target: calendarFooter,
      });

      this.picker.trigger("view", {
        date,
        view: "CalendarItem",
        index: i,
        target: month,
      });

      date = date.plus({ month: 1 });
    }

    main.appendChild(calendars);

    this.picker.trigger("view", {
      date,
      view: "Calendars",
      target: calendars,
    });
    this.picker.trigger("view", {
      date,
      view: "Main",
      target: main,
    });
  }

  /**
   * Function for `Footer` view
   *
   * @param date
   */
  public getFooterView(date: DateTime): void {
    const element = document.createElement("footer");

    const buttons = document.createElement("div");
    buttons.className = "footer-buttons";

    const cancelButton = document.createElement("button");
    cancelButton.className = "cancel-button unit";
    cancelButton.innerHTML = this.picker.options.locale!.cancel!;
    buttons.appendChild(cancelButton);

    const applyButton = document.createElement("button");
    applyButton.className = "apply-button unit";
    applyButton.innerHTML = this.picker.options.locale!.apply!;
    applyButton.disabled = true;
    buttons.appendChild(applyButton);
    element.appendChild(buttons);

    this.picker.ui.container.appendChild(element);
    this.picker.trigger("view", { date, target: element, view: "Footer" });
  }

  /**
   * Function for `CalendarHeader` view
   *
   * @param date
   * @returns HTMLElement
   */
  public getCalendarHeaderView(date: DateTime): HTMLElement {
    const element = document.createElement("div");
    element.className = "header";

    const monthName = document.createElement("div");
    monthName.className = "month-name";
    monthName.innerHTML = `<span>${date.setLocale(this.picker.options.lang!).toLocaleString(
      { month: "long" }
    )}</span> ${date.toFormat("yyyy")}`;
    element.appendChild(monthName);

    const prevMonth = document.createElement("button");
    prevMonth.className = "previous-button unit";
    prevMonth.innerHTML = this.picker.options.locale!.previousMonth!;
    element.appendChild(prevMonth);

    const nextMonth = document.createElement("button");
    nextMonth.className = "next-button unit";
    nextMonth.innerHTML = this.picker.options.locale!.nextMonth!;
    element.appendChild(nextMonth);

    return element;
  }

  /**
   * Function for `CalendarDayNames` view
   *
   * @param date
   * @returns HTMLElement
   */
  public getCalendarDayNamesView(): HTMLElement {
    const element = document.createElement("div");
    element.className = "daynames-row";

    for (let w = 1; w <= 7; w++) {
      // 7 days, 4 is «Thursday» (new Date(1970, 0, 1, 12, 0, 0, 0))
      const dayIdx = 7 - 4 + this.picker.options.firstDay! + w;

      const dayName = document.createElement("div");
      dayName.className = "dayname";
      dayName.innerHTML = new Date(1970, 0, dayIdx, 12, 0, 0, 0).toLocaleString(
        this.picker.options.lang,
        { weekday: "short" }
      );

      dayName.title = new Date(1970, 0, dayIdx, 12, 0, 0, 0).toLocaleString(
        this.picker.options.lang,
        { weekday: "long" }
      );

      element.appendChild(dayName);

      this.picker.trigger("view", {
        dayIdx,
        view: "CalendarDayName",
        target: dayName,
      });
    }

    return element;
  }

  /**
   * Function for `CalendarDays` view
   *
   * @param date
   * @returns HTMLElement
   */
  public getCalendarDaysView(date: DateTime): HTMLElement {
    const element = document.createElement("div");
    element.className = "days-grid";
    const offsetDays = this.calcOffsetDays(date, this.picker.options.firstDay!);
    const totalDays =
      32 - new Date(date.get('year'), date.get('month'), 32).getDate();

    for (let idx = 0; idx < offsetDays; idx++) {
      const offsetDay = document.createElement("div");
      offsetDay.className = "offset";
      element.appendChild(offsetDay);
    }

    for (let idx = 1; idx <= totalDays; idx++) {
      date = date.set({ day: idx });

      const calendarDay = this.getCalendarDayView(date);

      element.appendChild(calendarDay);

      this.picker.trigger("view", {
        date,
        view: "CalendarDay",
        target: calendarDay,
      });
    }

    return element;
  }

  /**
   * Function for `CalendarDay` view
   *
   * @param date
   * @returns HTMLElement
   */
  public getCalendarDayView(date: DateTime): HTMLElement {
    const optionsDate = this.picker.getOptionDate();
    const today = DateTime.now();

    const element = document.createElement("div");
    element.className = "day unit";
    element.innerHTML = date.toFormat("d");
    element.dataset.time = String(date.toMillis());

    if (date.hasSame(today, "day")) {
      element.classList.add("today");
    }

    if ([6, 7].includes(date.weekday)) {
      element.classList.add("weekend");
    }

    if (this.picker.datePicked.length) {
      if (this.picker.datePicked[0].hasSame(date, "day")) {
        element.classList.add("selected");
      }
    } else {
      if (optionsDate && date.hasSame(optionsDate, "day")) {
        element.classList.add("selected");
      }
    }

    this.picker.trigger("view", { date, view: "CalendarDay", target: element });

    return element;
  }

  /**
   * Function for `CalendarFooter` view
   *
   * @param lang
   * @param date
   * @returns HTMLElement
   */
  public getCalendarFooterView(): HTMLElement {
    const element = document.createElement("div");
    element.className = "footer";

    return element;
  }

  /**
   * Count the number of days of indentation
   *
   * @param date
   * @param firstDay
   * @returns Number
   */
  public calcOffsetDays(date: DateTime, firstDay: number): number {
    return date.weekday - firstDay;
  }
}
