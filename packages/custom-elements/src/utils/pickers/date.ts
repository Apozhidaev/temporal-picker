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
  private value: string | undefined;

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
    return this.value;
  }

  /**
   * Set date programmatically
   *
   * @param date
   */
  public setDate(date: string): void {
    if (this.value !== date) {
      if (date) {
        this.value = DateTime.fromISO(date).toISODate();
      } else {
        delete this.value;
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
    this.value = this.options.date;
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
    delete this.value;
    super.clear();
  }

  public getOptionDate(): DateTime | undefined {
    const date = this.getDate();
    return date ? DateTime.fromISO(date) : undefined;
  }
}
