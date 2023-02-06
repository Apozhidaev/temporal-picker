import merge from "lodash.merge";
import type { PickerConfig, PickerOptions } from "../types";
import { Picker } from "../core/picker";
import { ExtraOptionsPlugin, ExtraOptions } from "../plugins/extra-options";
import { KeyboardPlugin, KeyboardOptions } from "../plugins/keyboard";
import { LockPlugin, LockOptions } from "../plugins/lock";
import { PresetPlugin, PresetOptions } from "../plugins/preset";
import { coreCss } from "../assets/core";
import { extraOptionsCss } from "../assets/extra-options";
import { lockCss } from "../assets/lock";
import { rangeCss } from "../assets/range";
import { presetCss } from "../assets/preset";
import { keyboardCss } from "../assets/keyboard";
import { DateTime } from "luxon";
import { EventDetail } from "../plugins/base";

export type RangePickerOptions = PickerOptions & {
  extraOptions?: ExtraOptions;
  keyboardOptions?: KeyboardOptions;
  lockOptions?: LockOptions;
  presetOptions?: PresetOptions;

  activeInput?: "start" | "end";
  startDate?: string;
  endDate?: string;
  strict?: boolean;
  delimiter?: string;
  tooltip?: boolean;
  tooltipNumber?: (num: number) => number;
  locale?: {
    zero?: string;
    one?: string;
    two?: string;
    few?: string;
    many?: string;
    other?: string;
    startDate?: string;
    endDate?: string;
  };
};

export class RangePicker extends Picker<RangePickerOptions> {
  public tooltipElement: HTMLElement | undefined;

  constructor(options: RangePickerOptions) {
    const {
      extraOptions,
      keyboardOptions,
      lockOptions,
      presetOptions,
      ...rest
    } = options;
    let css = coreCss + rangeCss + keyboardCss;
    const plugins: any[] = [KeyboardPlugin];
    if (extraOptions) {
      plugins.unshift(ExtraOptionsPlugin);
      css += extraOptionsCss;
    }
    if (lockOptions) {
      plugins.unshift(LockPlugin);
      css += lockCss;
    }
    if (presetOptions) {
      plugins.unshift(PresetPlugin);
      css += presetCss;
    }
    if (rest.css) {
      css += rest.css;
    }
    const _options = merge(
      {
        startDate: null,
        endDate: null,
        strict: true,
        delimiter: " - ",
        tooltip: true,
        tooltipNumber: (num: number) => {
          return num;
        },
        locale: {
          zero: "",
          one: "day",
          two: "",
          few: "",
          many: "",
          other: "days",
          startDate: "Start Date",
          endDate: "End Date",
        },
      },
      {
        ...rest,
        css,
        plugins,
        grid: rest.grid || 2,
        calendars: rest.calendars || 2,
        LockPlugin: lockOptions,
        KeyboardPlugin: keyboardOptions || {},
        ExtraOptionsPlugin: extraOptions,
        PresetPlugin: presetOptions,
      }
    );
    super(_options);
    if (!this.options.documentClick) {
      this.options.documentClick = this.hidePicker.bind(this) as any;
    }

    this.binds.onRangeView = this.onRangeView.bind(this);
    this.binds.onShow = this.onShow.bind(this);
    this.binds.onMouseEnter = this.onMouseEnter.bind(this);

    this.on("view", this.binds.onRangeView);
    this.on("show", this.binds.onShow);
    this.on("mouseenter", this.binds.onMouseEnter, true);

    this.checkIntlPluralLocales();

    const targetDate = this.options.scrollToDate ? this.getStartDate() : null;
    this.renderAll(targetDate ? DateTime.fromISO(targetDate) : undefined);
    this.ui.container.classList.add("range");
  }

  public onClickCalendarDay(element: HTMLElement): void {
    if (this.isCalendarDay(element)) {
      if (this.datePicked.length === 2) {
        this.datePicked.length = 0;
      }

      const date = DateTime.fromMillis(Number(element.dataset.time));
      this.datePicked[this.datePicked.length] = date;

      if (
        this.datePicked.length === 2 &&
        this.datePicked[0] > this.datePicked[1]
      ) {
        const tempDate = this.datePicked[1];
        this.datePicked[1] = this.datePicked[0];
        this.datePicked[0] = tempDate;
      }

      if (this.datePicked.length === 1 || !this.options.autoApply) {
        this.trigger("preselect", {
          start: this.datePicked[0] ? this.datePicked[0].toISODate() : null,
          end: this.datePicked[1] ? this.datePicked[1].toISODate() : null,
        });
      }

      if (this.datePicked.length === 1) {
        if (!this.options.strict && this.options.autoApply) {
          if (this.options.activeInput === "end") {
            delete this.options.element.dataset.start;
            this.setEndDate(this.datePicked[0].toISODate());
          } else {
            delete this.options.element.dataset.end;
            this.setStartDate(this.datePicked[0].toISODate());
          }

          this.trigger("select", {
            start: this.getStartDate(),
            end: this.getEndDate(),
          });
        }

        this.renderAll();
      }

      if (this.datePicked.length === 2) {
        if (this.options.autoApply) {
          this.setDateRange(
            this.datePicked[0].toISODate(),
            this.datePicked[1].toISODate()
          );

          this.trigger("select", {
            start: this.getStartDate(),
            end: this.getEndDate(),
          });

          this.hide();
        } else {
          this.hideTooltip();

          this.renderAll();
        }
      }
    }
  }

  public onClickApplyButton(element: HTMLElement): void {
    if (this.isApplyButton(element)) {
      if (this.datePicked.length === 1 && !this.options.strict) {
        if (this.options.activeInput === "end") {
          delete this.options.element.dataset.start;
          this.setEndDate(this.datePicked[0].toISODate());
        } else {
          delete this.options.element.dataset.end;
          this.setStartDate(this.datePicked[0].toISODate());
        }
      }

      if (this.datePicked.length === 2) {
        this.setDateRange(
          this.datePicked[0].toISODate(),
          this.datePicked[1].toISODate()
        );
      }

      this.trigger("select", {
        start: this.getStartDate(),
        end: this.getEndDate(),
      });

      this.hide();
    }
  }

  public handleOptions(): void {
    this.options.element.dataset.start = this.options.startDate || "";
    this.options.element.dataset.end = this.options.endDate || "";
    const date = this.getStartDate();
    if (date) {
      this.calendars[0] = DateTime.fromISO(date);
    } else {
      this.calendars[0] = DateTime.now();
    }
  }

  public getOptionDate(): DateTime | undefined {
    return undefined;
  }

  /**
   * Clear date selection
   */
  public clear() {
    delete this.options.element.dataset.start;
    delete this.options.element.dataset.end;
    super.clear();
  }

  /**
   * Function `show` event
   *
   * @param event
   */
  private onShow() {
    const date = this.getStartDate() || this.getEndDate();
    if (this.options.scrollToDate && date) {
      this.gotoDate(date);
    }
  }

  /**
   * Function `view` event
   * Adds HTML layout of current plugin to the picker layout
   *
   * @param event
   */
  private onRangeView(event: CustomEvent) {
    const { view, target }: EventDetail = event.detail;

    if (!target) {
      return;
    }

    if (view === "Main") {
      this.tooltipElement = document.createElement("span");
      this.tooltipElement.className = "range-tooltip";
      target.appendChild(this.tooltipElement);
    }

    if (view === "CalendarDay") {
      const date = DateTime.fromMillis(Number(target.dataset.time));
      const datePicked = this.datePicked;
      const startDate = this.getStartDate();
      const endDate = this.getEndDate();
      const start = datePicked.length
        ? this.datePicked[0]
        : startDate
        ? DateTime.fromISO(startDate)
        : undefined;
      const end = datePicked.length
        ? this.datePicked[1]
        : endDate
        ? DateTime.fromISO(endDate)
        : undefined;

      if (start && start.hasSame(date, "day")) {
        target.classList.add("start");
      }

      if (end && end.hasSame(date, "day")) {
        target.classList.add("end");
      }

      if (start && end) {
        // if (end.hasSame(date, "day")) {
        //   target.classList.add("end");
        // }

        if (date > start && date < end) {
          // todo check startOf
          target.classList.add("in-range");
        }
      }
    }

    if (view === "Footer") {
      const allowApplyBtn =
        (this.datePicked.length === 1 && !this.options.strict) ||
        this.datePicked.length === 2;
      const applyButton = target.querySelector(
        ".apply-button"
      ) as HTMLButtonElement;
      applyButton.disabled = !allowApplyBtn;
    }
  }

  /**
   * Handle `mouseenter` event
   *
   * @param event
   */
  private onMouseEnter(event: any) {
    const target = event.target;

    if (target instanceof HTMLElement) {
      const element = target.closest(".unit");

      if (!(element instanceof HTMLElement)) return;

      if (this.isCalendarDay(element)) {
        if (this.datePicked.length !== 1) return;

        let date1 = this.datePicked[0];
        let date2 = DateTime.fromMillis(Number(element.dataset.time));
        let isFlipped = false;

        if (date1.startOf("day") > date2.startOf("day")) {
          const tempDate = date1;
          date1 = date2;
          date2 = tempDate;
          isFlipped = true;
        }

        const days = [
          ...this.ui.container.querySelectorAll(".day"),
        ] as HTMLElement[];

        days.forEach((d: HTMLElement) => {
          const date = DateTime.fromMillis(Number(d.dataset.time));
          const dayView = this.Calendar.getCalendarDayView(date);

          if (date > date1 && date < date2) {
            dayView.classList.add("in-range");
          }

          if (date.hasSame(this.datePicked[0], "day")) {
            dayView.classList.add("start");
            dayView.classList.toggle("flipped", isFlipped);
          }

          if (d === element) {
            dayView.classList.add("end");
            dayView.classList.toggle("flipped", isFlipped);
          }

          d.className = dayView.className;
        });

        if (this.options.tooltip) {
          const diff = this.options.tooltipNumber!(
            date2.diff(date1, "day").days + 1
          );

          if (diff > 0) {
            const pluralKey = new Intl.PluralRules(this.options.lang).select(
              diff
            );
            const text = `${diff} ${this.options.locale?.[pluralKey]}`;

            this.showTooltip(element, text);
          } else {
            this.hideTooltip();
          }
        }
      }
    }
  }

  /**
   * Determines if the locale option contains all required plurals
   */
  private checkIntlPluralLocales() {
    if (!this.options.tooltip) return;

    const rules = [
      ...new Set([
        new Intl.PluralRules(this.options.lang).select(0),
        new Intl.PluralRules(this.options.lang).select(1),
        new Intl.PluralRules(this.options.lang).select(2),
        new Intl.PluralRules(this.options.lang).select(6),
        new Intl.PluralRules(this.options.lang).select(18),
      ]),
    ];

    const locales = Object.keys(this.options.locale!);

    if (!rules.every((x) => locales.includes(x))) {
      console.warn(
        `RangePicker: provide locales (${rules.join(
          ", "
        )}) for correct tooltip text.`
      );
    }
  }

  /**
   * Set startDate programmatically
   *
   * @param date
   */
  public setStartDate(date: string) {
    this.options.element.dataset.start = date;

    const updated = this.updateInputValues();

    if (updated) {
      this.renderAll();
    }
  }

  /**
   * Set endDate programmatically
   *
   * @param date
   */
  public setEndDate(date: string) {
    this.options.element.dataset.end = date;

    const updated = this.updateInputValues();

    if (updated) {
      this.renderAll();
    }
  }

  /**
   * Set date range programmatically
   *
   * @param start
   * @param end
   */
  public setDateRange(start: string, end: string) {
    this.options.element.dataset.start = start;
    this.options.element.dataset.end = end;

    const updated = this.updateInputValues();

    if (updated) {
      this.renderAll();
    }
  }

  public getStartDate() {
    return this.options.element.dataset.start;
  }

  public getEndDate() {
    return this.options.element.dataset.end;
  }

  /**
   * Update value of input element
   */
  public updateInputValues() {
    const el = this.options.element;
    const start = this.getStartDate();
    const end = this.getEndDate();
    const startString = start
      ? DateTime.fromISO(start)
          .setLocale(this.options.lang!)
          .toFormat(this.options.format!)
      : "";
    const endString = end
      ? DateTime.fromISO(end)
          .setLocale(this.options.lang!)
          .toFormat(this.options.format!)
      : "";

    let updated = false;
    const delimiter = startString || endString ? this.options.delimiter : "";
    const formatString = delimiter
      ? `${startString || this.options.locale?.startDate}${delimiter}${
          endString || this.options.locale?.endDate
        }`
      : "";

    if (el instanceof HTMLInputElement) {
      if (el.value !== formatString) {
        el.value = formatString;
        updated = true;
      }
    } else if (el instanceof HTMLElement) {
      el.innerText = formatString;
      updated = true;
    }

    return updated;
  }

  /**
   * Displays tooltip of selected days
   *
   * @param element
   * @param text
   */
  private showTooltip(element: HTMLElement, text: string) {
    if (!this.tooltipElement) {
      return;
    }
    this.tooltipElement.style.visibility = "visible";
    this.tooltipElement.innerHTML = text;

    const container = this.ui.container.getBoundingClientRect();
    const tooltip = this.tooltipElement.getBoundingClientRect();
    const day = element.getBoundingClientRect();
    let top = day.top;
    let left = day.left;

    top -= container.top;
    left -= container.left;

    top -= tooltip.height;
    left -= tooltip.width / 2;
    left += day.width / 2;

    this.tooltipElement.style.top = `${top}px`;
    this.tooltipElement.style.left = `${left}px`;
  }

  /**
   * Hide tooltip
   */
  private hideTooltip() {
    if (this.tooltipElement) {
      this.tooltipElement.style.visibility = "hidden";
    }
  }
}
