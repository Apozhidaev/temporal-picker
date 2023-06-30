import { DateTime } from 'luxon';
import type { Picker } from './picker';
import { PickerConfig } from '../types';

export default class MonthCalendar<TOptions extends PickerConfig> {
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
    if (typeof this[`get${view}View`] === 'function') {
      // @ts-ignore
      this[`get${view}View`](date.startOf('year'));
    }
  }

  /**
   * Function for `Container` view
   *
   * @param date
   */
  public getContainerView(date: DateTime): void {
    this.picker.ui.container.innerHTML = '';

    if (this.picker.options.header) {
      this.picker.trigger('render', { date, view: 'Header' });
    }

    this.picker.trigger('render', { date, view: 'Main' });

    if (!this.picker.options.autoApply) {
      this.picker.trigger('render', { date, view: 'Footer' });
    }
  }

  /**
   * Function for `Header` view
   *
   * @param date
   */
  public getHeaderView(date: DateTime): void {
    const element = document.createElement('header');

    if (this.picker.options.header instanceof HTMLElement) {
      element.appendChild(this.picker.options.header);
    }

    if (typeof this.picker.options.header === 'string') {
      element.innerHTML = this.picker.options.header;
    }

    this.picker.ui.container.appendChild(element);
    this.picker.trigger('view', { target: element, date, view: 'Header' });
  }

  /**
   * Function for `Main` view
   *
   * @param date
   */
  public getMainView(date: DateTime): void {
    const main = document.createElement('main');
    this.picker.ui.container.appendChild(main);

    const calendars = document.createElement('div');
    calendars.className = `calendars grid-${this.picker.options.grid}`;

    for (let i = 0; i < this.picker.options.calendars!; i++) {
      const month = document.createElement('div');
      month.className = 'calendar';
      calendars.appendChild(month);

      const calendarHeader = this.getCalendarHeaderView(date);
      month.appendChild(calendarHeader);
      this.picker.trigger('view', {
        date,
        view: 'CalendarHeader',
        index: i,
        target: calendarHeader,
      });

      const dayNames = this.getCalendarDayNamesView();
      month.appendChild(dayNames);
      this.picker.trigger('view', {
        date,
        view: 'CalendarDayNames',
        index: i,
        target: dayNames,
      });

      const daysView = this.getCalendarDaysView(date);
      month.appendChild(daysView);
      this.picker.trigger('view', {
        date,
        view: 'CalendarDays',
        index: i,
        target: daysView,
      });

      const calendarFooter = this.getCalendarFooterView();
      month.appendChild(calendarFooter);
      this.picker.trigger('view', {
        date,
        view: 'CalendarFooter',
        index: i,
        target: calendarFooter,
      });

      this.picker.trigger('view', {
        date,
        view: 'CalendarItem',
        index: i,
        target: month,
      });

      date = date.plus({ year: 1 });
    }

    main.appendChild(calendars);

    this.picker.trigger('view', {
      date,
      view: 'Calendars',
      target: calendars,
    });
    this.picker.trigger('view', {
      date,
      view: 'Main',
      target: main,
    });
  }

  /**
   * Function for `Footer` view
   *
   * @param date
   */
  public getFooterView(date: DateTime): void {
    const element = document.createElement('footer');

    const buttons = document.createElement('div');
    buttons.className = 'footer-buttons';

    const cancelButton = document.createElement('button');
    cancelButton.className = 'cancel-button unit';
    cancelButton.innerHTML = this.picker.options.locale!.cancel!;
    buttons.appendChild(cancelButton);

    const applyButton = document.createElement('button');
    applyButton.className = 'apply-button unit';
    applyButton.innerHTML = this.picker.options.locale!.apply!;
    applyButton.disabled = true;
    buttons.appendChild(applyButton);
    element.appendChild(buttons);

    this.picker.ui.container.appendChild(element);
    this.picker.trigger('view', { date, target: element, view: 'Footer' });
  }

  /**
   * Function for `CalendarHeader` view
   *
   * @param date
   * @returns HTMLElement
   */
  public getCalendarHeaderView(date: DateTime): HTMLElement {
    const element = document.createElement('div');
    element.className = 'header';

    const monthName = document.createElement('div');
    monthName.className = 'month-name';
    monthName.innerHTML = `<span></span><span>${date.toFormat('yyyy')}</span>`;
    element.appendChild(monthName);

    const prevMonth = document.createElement('button');
    prevMonth.className = 'previous-button unit';
    prevMonth.innerHTML = this.picker.options.locale!.previousMonth!;
    element.appendChild(prevMonth);

    const nextMonth = document.createElement('button');
    nextMonth.className = 'next-button unit';
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
    const element = document.createElement('div');
    element.className = 'daynames-row monthsorder-row';

    for (let w = 1; w <= 6; w++) {
      const dayName = document.createElement('div');
      dayName.className = 'dayname';
      dayName.innerHTML = `${w}`;

      element.appendChild(dayName);

      this.picker.trigger('view', {
        dayIdx: w,
        view: 'CalendarDayName',
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
    const element = document.createElement('div');
    element.className = 'days-grid months-grid';
    const totalDays = 12;

    for (let idx = 1; idx <= totalDays; idx++) {
      date = date.set({ month: idx });

      const calendarDay = this.getCalendarDayView(date);

      element.appendChild(calendarDay);

      this.picker.trigger('view', {
        date,
        view: 'CalendarDay',
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

    const element = document.createElement('div');
    element.className = 'day unit';
    element.innerHTML = date.toFormat('LLL');
    element.dataset.time = String(date.toMillis());

    if (date.hasSame(today, 'month')) {
      element.classList.add('today');
    }

    if (this.picker.datePicked.length) {
      if (this.picker.datePicked[0].hasSame(date, 'month')) {
        element.classList.add('selected');
      }
    } else {
      if (optionsDate && date.hasSame(optionsDate, 'month')) {
        element.classList.add('selected');
      }
    }

    this.picker.trigger('view', { date, view: 'CalendarDay', target: element });

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
    const element = document.createElement('div');
    element.className = 'footer';

    return element;
  }
}
