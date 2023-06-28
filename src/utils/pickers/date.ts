import { DateTime } from 'luxon';
import type { PickerOptions } from '../types';
import { Picker } from '../core/picker';
import { ExtraOptionsPlugin, ExtraOptions } from '../plugins/extra-options';
import { KeyboardPlugin, KeyboardOptions } from '../plugins/keyboard';
import { LockPlugin, LockOptions } from '../plugins/lock';

export type DatePickerOptions = PickerOptions & {
  date?: string;
  extraOptions?: ExtraOptions;
  keyboardOptions?: KeyboardOptions;
  lockOptions?: LockOptions;
};

export class DatePicker extends Picker<DatePickerOptions> {
  constructor(options: DatePickerOptions) {
    const { extraOptions, keyboardOptions, lockOptions, ...rest } = options;
    const plugins: any[] = [KeyboardPlugin];
    if (extraOptions) {
      plugins.unshift(ExtraOptionsPlugin);
    }
    if (lockOptions) {
      plugins.unshift(LockPlugin);
    }
    super({
      ...rest,
      plugins,
      LockPlugin: lockOptions,
      KeyboardPlugin: keyboardOptions || {},
      ExtraOptionsPlugin: extraOptions,
    });

    const targetDate = this.options.scrollToDate ? this.getDate() : null;
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
        this.setDate(date.toISODate());

        this.trigger('select', {
          date: this.getDate(),
        });

        this.hide();
      } else {
        this.datePicked[0] = date;

        this.trigger('preselect', { date: this.getDate() });

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
        this.setDate(date.toISODate());
      }

      this.trigger('select', {
        date: this.getDate(),
      });

      this.hide();
    }
  }

  /**
   *
   * @returns DateTime
   */
  public getDate(): string | undefined {
    return this.options.element.dataset.value;
  }

  /**
   * Set date programmatically
   *
   * @param date
   */
  public setDate(date: string): void {
    if (this.options.element.dataset.value !== date) {
      if (date) {
        this.options.element.dataset.value = DateTime.fromISO(date).toISODate();
      } else {
        delete this.options.element.dataset.value;
      }
      if (this.calendars.length) {
        this.renderAll();
      }
    }
  }

  /**
   * Handling parameters passed by the user
   */
  public handleOptions() {
    this.options.element.dataset.value = this.options.date || '';
    const date = this.getDate();
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
    const date = this.getDate();
    return date ? DateTime.fromISO(date) : undefined;
  }
}
