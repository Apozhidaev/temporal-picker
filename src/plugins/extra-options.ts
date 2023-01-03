import type { LockPlugin } from './lock';
import { BasePlugin, IEventDetail, IPlugin } from './base';
import { DateTime } from '../datetime';

export interface IExtraOptionsPlugin {
  dropdown?: {
    minYear?: number;
    maxYear?: number;
    months?: boolean;
    years?: boolean | string;
  }
  resetButton?: (() => boolean) | boolean;
  darkMode?: boolean;
  weekNumbers?: boolean;
  locale?: {
    resetButton?: string;
    weeksHeader?: string;
  }
}

export class ExtraOptionsPlugin extends BasePlugin implements IPlugin {
  public lockPlugin: LockPlugin | null = null;
  public priority = 10;

  public binds = {
    onView: this.onView.bind(this),
    onColorScheme: this.onColorScheme.bind(this),
  }

  public options: IExtraOptionsPlugin = {
    dropdown: {
      months: false,
      years: false,
      minYear: 1970,
      maxYear: undefined,
    },
    darkMode: false,
    locale: {
      resetButton: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="24" width="24" style="fill:none;">
      <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>`
    },
  };

  protected matchMedia: MediaQueryList | undefined;

  /**
   * Returns plugin name
   * 
   * @returns String
   */
  public getName(): string {
    return 'ExtraOptionsPlugin';
  }

  /**
   * - Called automatically via BasePlugin.attach() -
   * The function execute on initialize the picker
   */
  public onAttach(): void {
    if (this.options.darkMode && window && 'matchMedia' in window) {
      this.matchMedia = window.matchMedia('(prefers-color-scheme: dark)');

      if (this.matchMedia.matches) {
        this.picker.ui.container.dataset.theme = 'dark';
      }

      this.matchMedia.addEventListener('change', this.binds.onColorScheme);
    }

    if (this.options.weekNumbers) {
      this.picker.ui.container.classList.add('week-numbers');
    }

    this.picker.on('view', this.binds.onView);
  }

  /**
   * - Called automatically via BasePlugin.detach() -
   */
  public onDetach(): void {
    this.matchMedia?.removeEventListener('change', this.binds.onColorScheme);

    this.picker.ui.container.removeAttribute('data-theme');
    this.picker.ui.container.classList.remove('week-numbers');

    this.picker.off('view', this.binds.onView);
  }

  /**
   * Function `view` event
   * Adds `tabIndex` to the picker elements
   * 
   * @param event 
   */
  private onView(event: CustomEvent) {
    this.lockPlugin = this.picker.PluginManager.getInstance('LockPlugin');

    this.handleDropdown(event);
    this.handleResetButton(event);
    this.handleWeekNumbers(event);
  }

  /**
   * 
   * @param evt 
   */
  private onColorScheme(evt: any) {
    const colorScheme = evt.matches ? 'dark' : 'light';
    this.picker.ui.container.dataset.theme = colorScheme;
  }

  /**
   * 
   * @param evt 
   */
  public handleDropdown(evt: any) {
    const { view, target, date, index }: Required<IEventDetail> = evt.detail;

    if (view === 'CalendarHeader') {
      const monthNameWrapper = target.querySelector('.month-name')!;

      if (this.options.dropdown?.months) {
        monthNameWrapper.childNodes[0].remove();

        const selectMonths = document.createElement('select');
        selectMonths.className = 'month-name--select month-name--dropdown unit';

        for (let x = 0; x < 12; x += 1) {
          const option = document.createElement('option');
          // day 2 due to iOS bug (?) with `toLocaleString`
          const monthName = new DateTime(new Date(date.getFullYear(), x, 2, 0, 0, 0));
          const optionMonth = new DateTime(new Date(date.getFullYear(), x, 1, 0, 0, 0));

          option.value = String(x);
          option.text = monthName.toLocaleString(this.picker.options.lang, { month: 'long' });

          if (this.lockPlugin) {
            option.disabled = Boolean((this.lockPlugin.options.minDate
              && optionMonth.isBefore(new DateTime(this.lockPlugin.options.minDate), 'month'))
              || (this.lockPlugin.options.maxDate && optionMonth.isAfter(new DateTime(this.lockPlugin.options.maxDate), 'month')));
          }

          option.selected = optionMonth.getMonth() === date.getMonth();

          selectMonths.appendChild(option);
        }

        selectMonths.addEventListener('change', (e) => {
          const target = e.target as HTMLSelectElement;

          if (index) {
            this.picker.calendars[0].add(index, 'months');
          }
          this.picker.calendars[0].setDate(1);
          this.picker.calendars[0].setMonth(Number(target.value));
          if (index) {
            this.picker.calendars[0].subtract(index || 0, 'months');
          }
          this.picker.renderAll();
        });

        monthNameWrapper.prepend(selectMonths);
      }

      if (this.options.dropdown?.years) {
        monthNameWrapper.childNodes[1].remove();

        const selectYears = document.createElement('select');
        selectYears.className = 'month-name--select unit';

        const minYear = this.options.dropdown.minYear!;
        const maxYear = this.options.dropdown.maxYear ? this.options.dropdown.maxYear : (new Date()).getFullYear();

        if (date.getFullYear() > maxYear) {
          const option = document.createElement('option');
          option.value = String(date.getFullYear());
          option.text = String(date.getFullYear());
          option.selected = true;
          option.disabled = true;

          selectYears.appendChild(option);
        }

        for (let x = maxYear; x >= minYear; x -= 1) {
          const option = document.createElement('option');
          const optionYear = new DateTime(new Date(x, 0, 1, 0, 0, 0));
          option.value = String(x);
          option.text = String(x);

          if (this.lockPlugin) {
            option.disabled = Boolean((this.lockPlugin.options.minDate
              && optionYear.isBefore(new DateTime(this.lockPlugin.options.minDate), 'year'))
              || (this.lockPlugin.options.maxDate
                && optionYear.isAfter(new DateTime(this.lockPlugin.options.maxDate), 'year')));
          }

          option.selected = date.getFullYear() === x;

          selectYears.appendChild(option);
        }

        if (date.getFullYear() < minYear) {
          const option = document.createElement('option');
          option.value = String(date.getFullYear());
          option.text = String(date.getFullYear());
          option.selected = true;
          option.disabled = true;

          selectYears.appendChild(option);
        }

        if (this.options.dropdown.years === 'asc') {
          const childs = Array.prototype.slice.call(selectYears.childNodes);
          const options = childs.reverse();
          selectYears.innerHTML = '';
          options.forEach((y) => {
            y.innerHTML = y.value;
            selectYears.appendChild(y);
          });
        }

        selectYears.addEventListener('change', (e) => {
          const target = e.target as HTMLSelectElement;

          if (index) {
            this.picker.calendars[0].add(index, 'months');
          }
          this.picker.calendars[0].setFullYear(Number(target.value));
          if (index) {
            this.picker.calendars[0].subtract(index || 0, 'months');
          }
          this.picker.renderAll();
        });

        monthNameWrapper.appendChild(selectYears);
      }
    }
  }

  /**
   * 
   * @param event 
   */
  private handleResetButton(event: any) {
    const { view, target }: Required<IEventDetail> = event.detail;

    if (view === 'CalendarHeader' && this.options.resetButton) {
      const button = document.createElement('button');
      button.className = 'reset-button unit';
      button.innerHTML = this.options.locale!.resetButton!;
      button.title = 'Clear';

      button.addEventListener('click', (evt) => {
        evt.preventDefault();

        let shouldReset = true;

        if (typeof this.options.resetButton === 'function') {
          shouldReset = this.options.resetButton.call(this);
        }

        if (shouldReset) {
          this.picker.clear();
          this.picker.hide();
        }
      });

      target.appendChild(button);
    }
  }

  /**
   * 
   * @param event 
   */
  private handleWeekNumbers(event: any) {
    if (this.options.weekNumbers) {
      const { view, target }: Required<IEventDetail> = event.detail;

      if (view === 'CalendarDayNames') {
        const w = document.createElement('div');
        w.className = 'wnum-header';
        w.innerHTML = this.options.locale?.weeksHeader || '';
        target.prepend(w);
      }

      if (view === 'CalendarDays') {
        [...target.children].forEach((element, index) => {
          if (index === 0 || index % 7 === 0) {
            let date;
            if (element.classList.contains('day')) {
              date = new DateTime((element as HTMLElement).dataset.time);
            } else {
              const elDate = target.querySelector('.day') as HTMLElement;
              date = new DateTime(elDate.dataset.time);
            }

            let weekNum: number | string = date.getWeek(this.picker.options.firstDay!);
            if (weekNum === 53 && date.getMonth() === 0) {
              weekNum = '53/1';
            }

            const w = document.createElement('div');
            w.className = 'wnum-item';
            w.title = "week";
            w.innerHTML = String(weekNum);
            target.insertBefore(w, element);
          }
        });
      }
    }
  }
}