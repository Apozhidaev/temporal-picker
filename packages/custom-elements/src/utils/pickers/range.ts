import merge from 'lodash.merge';
import type { PickerOptions } from '../types';
import { Picker } from '../core/picker';
import { ExtraOptionsPlugin, ExtraOptions } from '../plugins/extra-options';
import { KeyboardPlugin, KeyboardOptions } from '../plugins/keyboard';
import { LockPlugin, LockOptions } from '../plugins/lock';
import { PresetPlugin, PresetOptions } from '../plugins/preset';
import { DateTime } from 'luxon';
import { EventDetail } from '../plugins/base';

export type RangePickerOptions = PickerOptions & {
  extraOptions?: ExtraOptions;
  keyboardOptions?: KeyboardOptions;
  lockOptions?: LockOptions;
  presetOptions?: PresetOptions;

  activeInput?: 'start' | 'end';
  startDate?: string;
  endDate?: string;
  strict?: boolean;
  tooltip?: boolean;
  tooltipNumber?: (num: number) => number;
  locale?: {
    zero?: string;
    one?: string;
    two?: string;
    few?: string;
    many?: string;
    other?: string;
  };
};

export class RangePicker extends Picker<RangePickerOptions> {
  public tooltipElement: HTMLElement | undefined;
  private start: string | undefined;
  private end: string | undefined;

  constructor(options: RangePickerOptions) {
    const { extraOptions, keyboardOptions, lockOptions, presetOptions, ...rest } = options;
    const plugins: any[] = [KeyboardPlugin];
    if (extraOptions) {
      plugins.unshift(ExtraOptionsPlugin);
    }
    if (lockOptions) {
      plugins.unshift(LockPlugin);
    }
    if (presetOptions) {
      plugins.unshift(PresetPlugin);
    }
    const _options = merge(
      {
        startDate: null,
        endDate: null,
        strict: true,
        tooltip: true,
        tooltipNumber: (num: number) => {
          return num;
        },
        locale: {
          zero: '',
          one: 'day',
          two: '',
          few: '',
          many: '',
          other: 'days',
        },
      },
      {
        ...rest,
        plugins,
        grid: rest.grid || 2,
        calendars: rest.calendars || 2,
        LockPlugin: lockOptions,
        KeyboardPlugin: keyboardOptions || {},
        ExtraOptionsPlugin: extraOptions,
        PresetPlugin: presetOptions,
      },
    );
    super(_options);

    this.binds.onRangeView = this.onRangeView.bind(this);
    this.binds.onMouseEnter = this.onMouseEnter.bind(this);

    this.on('view', this.binds.onRangeView);
    this.on('mouseenter', this.binds.onMouseEnter, true);

    this.checkIntlPluralLocales();

    const targetDate = this.options.scrollToDate ? this.getStartDate() : null;
    this.renderAll(targetDate ? DateTime.fromISO(targetDate) : undefined);
    this.ui.container.classList.add('range');
  }

  public onClickCalendarDay(element: HTMLElement): void {
    if (this.isCalendarDay(element)) {
      if (this.datePicked.length === 2) {
        this.datePicked.length = 0;
      }

      const date = DateTime.fromMillis(Number(element.dataset.time));
      this.datePicked[this.datePicked.length] = date;

      if (this.datePicked.length === 2 && this.datePicked[0] > this.datePicked[1]) {
        const tempDate = this.datePicked[1];
        this.datePicked[1] = this.datePicked[0];
        this.datePicked[0] = tempDate;
      }

      if (this.datePicked.length === 1 || !this.options.autoApply) {
        this.trigger('preselect', {
          start: this.datePicked[0] ? this.datePicked[0].toISODate() : null,
          end: this.datePicked[1] ? this.datePicked[1].toISODate() : null,
        });
      }

      if (this.datePicked.length === 1) {
        if (!this.options.strict && this.options.autoApply) {
          if (this.options.activeInput === 'end') {
            delete this.start;
            this.setEndDate(this.datePicked[0].toISODate());
          } else {
            delete this.end;
            this.setStartDate(this.datePicked[0].toISODate());
          }

          this.trigger('select', {
            start: this.getStartDate(),
            end: this.getEndDate(),
          });
        }

        this.renderAll();
      }

      if (this.datePicked.length === 2) {
        if (this.options.autoApply) {
          this.setDateRange(this.datePicked[0].toISODate(), this.datePicked[1].toISODate());

          this.trigger('select', {
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
        if (this.options.activeInput === 'end') {
          delete this.start;
          this.setEndDate(this.datePicked[0].toISODate());
        } else {
          delete this.end;
          this.setStartDate(this.datePicked[0].toISODate());
        }
      }

      if (this.datePicked.length === 2) {
        this.setDateRange(this.datePicked[0].toISODate(), this.datePicked[1].toISODate());
      }

      this.trigger('select', {
        start: this.getStartDate(),
        end: this.getEndDate(),
      });

      this.hide();
    }
  }

  public handleOptions(): void {
    this.start = this.options.startDate;
    this.end = this.options.endDate;
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
    delete this.start;
    delete this.end;
    super.clear();
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

    if (view === 'Main') {
      this.tooltipElement = document.createElement('span');
      this.tooltipElement.className = 'range-tooltip';
      target.appendChild(this.tooltipElement);
    }

    if (view === 'CalendarDay') {
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

      if (start && start.hasSame(date, 'day')) {
        target.classList.add('start');
      }

      if (end && end.hasSame(date, 'day')) {
        target.classList.add('end');
      }

      if (start && end) {
        // if (end.hasSame(date, "day")) {
        //   target.classList.add("end");
        // }

        if (date > start && date < end) {
          // todo check startOf
          target.classList.add('in-range');
        }
      }
    }

    if (view === 'Footer') {
      const allowApplyBtn =
        (this.datePicked.length === 1 && !this.options.strict) || this.datePicked.length === 2;
      const applyButton = target.querySelector('.apply-button') as HTMLButtonElement;
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
      const element = target.closest('.unit');

      if (!(element instanceof HTMLElement)) return;

      if (this.isCalendarDay(element)) {
        if (this.datePicked.length !== 1) return;

        let date1 = this.datePicked[0];
        let date2 = DateTime.fromMillis(Number(element.dataset.time));
        let isFlipped = false;

        if (date1.startOf('day') > date2.startOf('day')) {
          const tempDate = date1;
          date1 = date2;
          date2 = tempDate;
          isFlipped = true;
        }

        const days = Array.from(this.ui.container.querySelectorAll('.day')) as HTMLElement[];

        days.forEach((d: HTMLElement) => {
          const date = DateTime.fromMillis(Number(d.dataset.time));
          const dayView = this.Calendar.getCalendarDayView(date);

          if (date > date1 && date < date2) {
            dayView.classList.add('in-range');
          }

          if (date.hasSame(this.datePicked[0], 'day')) {
            dayView.classList.add('start');
            dayView.classList.toggle('flipped', isFlipped);
          }

          if (d === element) {
            dayView.classList.add('end');
            dayView.classList.toggle('flipped', isFlipped);
          }

          d.className = dayView.className;
        });

        if (this.options.tooltip) {
          const diff = this.options.tooltipNumber!(date2.diff(date1, 'day').days + 1);

          if (diff > 0) {
            const pluralKey = new Intl.PluralRules(this.options.lang).select(diff);
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

    if (!rules.every(x => locales.includes(x))) {
      console.warn(`RangePicker: provide locales (${rules.join(', ')}) for correct tooltip text.`);
    }
  }

  /**
   * Set startDate programmatically
   *
   * @param date
   */
  public setStartDate(date: string) {
    if (this.start !== date) {
      if (date) {
        this.start = DateTime.fromISO(date).toISODate();
      } else {
        delete this.start;
      }
      if (this.calendars.length) {
        this.renderAll();
      }
    }
  }

  /**
   * Set endDate programmatically
   *
   * @param date
   */
  public setEndDate(date: string) {
    if (this.end !== date) {
      if (date) {
        this.end = DateTime.fromISO(date).toISODate();
      } else {
        delete this.end;
      }
      if (this.calendars.length) {
        this.renderAll();
      }
    }
  }

  /**
   * Set date range programmatically
   *
   * @param start
   * @param end
   */
  public setDateRange(start: string, end: string) {
    if (this.start !== start || this.end !== end) {
      if (start) {
        this.start = DateTime.fromISO(start).toISODate();
      } else {
        delete this.start;
      }
      if (end) {
        this.end = DateTime.fromISO(end).toISODate();
      } else {
        delete this.end;
      }
      if (this.calendars.length) {
        this.renderAll();
      }
    }
  }

  public getStartDate() {
    return this.start;
  }

  public getEndDate() {
    return this.end;
  }

  /**
   * Change visible month
   *
   * @param date
   */
  public gotoStart(): void {
    const start = this.getStartDate();
    if (start) {
      this.calendars[0] = DateTime.fromISO(start).startOf('minute');
    } else {
      this.calendars[0] = DateTime.now().startOf('minute');
    }
    this.renderAll();
  }

  /**
   * Change visible month
   *
   * @param date
   */
  public gotoEnd(): void {
    const end = this.getEndDate();
    if (end) {
      this.calendars[0] = DateTime.fromISO(end).minus({ month: 1 }).startOf('minute');
    } else {
      this.calendars[0] = DateTime.now().startOf('minute');
    }

    this.renderAll();
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
    this.tooltipElement.style.visibility = 'visible';
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
      this.tooltipElement.style.visibility = 'hidden';
    }
  }
}
