import { DateTime } from "luxon";
import type { PickerOptions } from "../types";
import { Picker } from "../core/picker";
import {
  ExtraOptionsPlugin,
  ExtraOptions,
} from "../plugins/extra-options";
import { KeyboardPlugin, KeyboardOptions } from "../plugins/keyboard";
import { LockPlugin, LockOptions } from "../plugins/lock";
import { coreCss } from "../assets/core";
import { extraOptionsCss } from "../assets/extra-options";
import { lockCss } from "../assets/lock";
import { keyboardCss } from "../assets/keyboard";

export type DatePickerOptions = PickerOptions & {
  date?: string;
  extraOptions?: ExtraOptions;
  keyboardOptions?: KeyboardOptions;
  lockOptions?: LockOptions;
};

export class DatePicker extends Picker<DatePickerOptions> {
  constructor(options: DatePickerOptions) {
    const { extraOptions, keyboardOptions, lockOptions, ...rest } = options;
    let css = coreCss + keyboardCss;
    const plugins: any[] = [KeyboardPlugin];
    if (extraOptions) {
      plugins.unshift(ExtraOptionsPlugin);
      css += extraOptionsCss;
    }
    if (lockOptions) {
      plugins.unshift(LockPlugin);
      css += lockCss;
    }
    if (rest.css) {
      css += rest.css;
    }
    super({
      ...rest,
      css,
      plugins,
      date: options.date,
      LockPlugin: lockOptions,
      KeyboardPlugin: keyboardOptions || {},
      ExtraOptionsPlugin: extraOptions,
    });

    const targetDate = this.options.scrollToDate ? this.getValue() : null;
    this.renderAll(targetDate ? DateTime.fromISO(targetDate) : undefined);
  }

  /**
   *
   * @param element
   */
  public onClickCalendarDay(element: HTMLElement) {
    if (this.isCalendarDay(element)) {
      const date = DateTime.fromMillis(Number(element.dataset.time));

      if (this.options.autoApply) {
        this.setValue(date.toISODate());

        this.trigger("select", {
          date: this.getValue(),
        });

        this.hide();
      } else {
        this.datePicked[0] = date;

        this.trigger("preselect", { date: this.getValue() });

        this.renderAll();
      }
    }
  }

  /**
   *
   * @param element
   */
  public onClickApplyButton(element: HTMLElement) {
    if (this.isApplyButton(element)) {
      if (this.datePicked[0] instanceof DateTime) {
        const date = this.datePicked[0];
        this.setValue(date.toISODate());
      }

      this.hide();

      this.trigger("select", {
        date: this.getValue(),
      });
    }
  }

  /**
   *
   * @returns DateTime
   */
  public getValue(): string | undefined {
    return this.options.element.dataset.value;
  }

  /**
   * Set date programmatically
   *
   * @param date
   */
  public setValue(date: string): void {
    this.options.element.dataset.value = date;

    const updated = this.updateInputValues();

    if (updated && this.calendars.length) {
      this.renderAll();
    }
  }

  /**
   * Update value of input element
   */
  public updateInputValues() {
    const date = this.getValue();
    const formatString = date
      ? DateTime.fromISO(date)
          .setLocale(this.options.lang!)
          .toFormat(this.options.format!)
      : "";

    const el = this.options.element;
    if (el instanceof HTMLInputElement) {
      if (el.value !== formatString) {
        el.value = formatString;
        return true;
      }
    } else if (el instanceof HTMLElement) {
      el.innerText = formatString;
      return true;
    }
    return false;
  }

  /**
   * Handling parameters passed by the user
   */
  public handleOptions() {
    const date = this.getValue();
    if (date) {
      this.calendars[0] = DateTime.fromISO(date);
    } else {
      this.calendars[0] = DateTime.now();
    }
  }

  /**
   * Clear date selection
   */
  public clear() {
    delete this.options.element.dataset.value;
    super.clear();
  }

  public getOptionDate(): DateTime | undefined {
    const date = this.getValue();
    return date ? DateTime.fromISO(date) : undefined;
  }
}
