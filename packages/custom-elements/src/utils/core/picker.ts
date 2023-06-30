import merge from 'lodash.merge';
import { DateTime } from 'luxon';
import Calendar from './calendar';
import MonthCalendar from './monthCalendar';
import { PluginManager } from './pluginManager';
import { IEventDetail, PickerConfig, IPickerElements } from '../types';

export abstract class Picker<TOptions extends PickerConfig> {
  public Calendar: Calendar<TOptions> | MonthCalendar<TOptions>;
  public PluginManager: PluginManager;

  public calendars: DateTime[] = [];
  public datePicked: DateTime[] = [];
  public binds: Record<string, any> = {};

  public options: TOptions;

  public ui: IPickerElements = {
    container: null as unknown as HTMLElement,
    shadowRoot: null as unknown as ShadowRoot,
  };

  constructor(options: PickerConfig) {
    this.PluginManager = new PluginManager(this);
    this.Calendar =
      options.plain === 'month' ? new MonthCalendar<TOptions>(this) : new Calendar<TOptions>(this);
    this.options = merge(
      {
        firstDay: 1,
        grid: 1,
        calendars: 1,
        lang: 'en-US',
        format: 'dd LLL, yyyy',
        readonly: true,
        autoApply: true,
        header: false,
        scrollToDate: true,
        locale: {
          nextMonth:
            '<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M2.748 16L0 13.333 5.333 8 0 2.667 2.748 0l7.919 8z" fill-rule="nonzero"/></svg>',
          previousMonth:
            '<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M7.919 0l2.748 2.667L5.333 8l5.334 5.333L7.919 16 0 8z" fill-rule="nonzero"/></svg>',
          cancel: 'Cancel',
          apply: 'Apply',
        },
        plugins: [],
      },
      options,
    ) as unknown as TOptions;

    this.handleOptions();

    this.ui.shadowRoot = this.options.popup.shadowRoot;

    this.ui.container = document.createElement('div');
    this.ui.container.className = 'container';

    this.ui.shadowRoot.appendChild(this.ui.container);

    this.on('view', this.onView.bind(this));
    this.on('render', this.onRender.bind(this));

    this.PluginManager.initialize();

    if (typeof this.options.setup === 'function') {
      this.options.setup(this);
    }

    this.on('click', this.onClick.bind(this));
  }

  /**
   * Add listener to container element
   *
   * @param type
   * @param listener
   * @param options
   */
  public on(type: any, listener: (event: any) => void, options: any = {}): void {
    this.ui.container.addEventListener(type, listener, options);
  }

  /**
   * Remove listener from container element
   *
   * @param type
   * @param listener
   * @param options
   */
  public off(type: any, listener: (event: any) => void, options: any = {}): void {
    this.ui.container.removeEventListener(type, listener, options);
  }

  /**
   * Dispatch an event
   *
   * @param type
   * @param detail
   * @returns
   */
  public trigger(type: string, detail: unknown = {}): boolean {
    return this.ui.container.dispatchEvent(new CustomEvent(type, { detail }));
  }

  /**
   * Destroy picker
   */
  public destroy() {
    // detach all plugins
    Object.keys(this.PluginManager.instances).forEach(plugin => {
      this.PluginManager.removeInstance(plugin);
    });
  }

  /**
   * Fired on render event
   *
   * @param event
   */
  public onRender(event: CustomEvent) {
    const { view, date }: IEventDetail = event.detail;

    this.Calendar.render(date!, view!);
  }

  public onView(event: CustomEvent) {
    const { view, target } = event.detail;

    if (view === 'Footer' && this.datePicked.length) {
      const applyButton = target.querySelector('.apply-button');
      applyButton.disabled = false;
    }
  }

  /**
   *
   * @param element
   */
  public onClickHeaderButton(element: HTMLElement) {
    if (this.isCalendarHeaderButton(element)) {
      if (element.classList.contains('next-button')) {
        this.calendars[0] = this.calendars[0].plus(
          this.options.plain === 'month' ? { year: 1 } : { month: 1 },
        );
      } else {
        this.calendars[0] = this.calendars[0].minus(
          this.options.plain === 'month' ? { year: 1 } : { month: 1 },
        );
      }

      this.renderAll(this.calendars[0]);
    }
  }

  /**
   *
   * @param element
   */
  public abstract onClickCalendarDay(element: HTMLElement): void;

  /**
   *
   * @param element
   */
  public abstract onClickApplyButton(element: HTMLElement): void;

  /**
   *
   * @param element
   * @returns
   */
  public onClickCancelButton(element: HTMLElement) {
    if (this.isCancelButton(element)) {
      this.hide();
      return;
    }
  }

  /**
   * Fired on click event
   *
   * @param event
   */
  public onClick(event: any): void {
    const target = event.target;

    if (target instanceof HTMLElement) {
      const element = target.closest('.unit');

      if (!(element instanceof HTMLElement)) return;

      this.onClickHeaderButton(element);
      this.onClickCalendarDay(element);
      this.onClickApplyButton(element);
      this.onClickCancelButton(element);
    }
  }

  /**
   * Hide the picker
   */
  public hide(): void {
    this.datePicked.length = 0;

    this.renderAll();

    this.trigger('close');
  }

  /**
   * Render entire picker layout
   *
   * @param date
   */
  public renderAll(date?: DateTime | null): void {
    this.trigger('render', {
      view: 'Container',
      date: date || this.calendars[0],
    });
  }

  /**
   * Determines if the element is buttons of header (previous month, next month)
   *
   * @param element
   * @returns Boolean
   */
  public isCalendarHeaderButton(element: HTMLElement): boolean {
    return ['previous-button', 'next-button'].some(x => element.classList.contains(x));
  }

  /**
   * Determines if the element is day element
   *
   * @param element
   * @returns Boolean
   */
  public isCalendarDay(element: HTMLElement): boolean {
    return element.classList.contains('day');
  }

  /**
   * Determines if the element is the apply button
   *
   * @param element
   * @returns Boolean
   */
  public isApplyButton(element: HTMLElement): boolean {
    return element.classList.contains('apply-button');
  }

  /**
   * Determines if the element is the cancel button
   *
   * @param element
   * @returns Boolean
   */
  public isCancelButton(element: HTMLElement): boolean {
    return element.classList.contains('cancel-button');
  }

  /**
   * Change visible month
   *
   * @param date
   */
  public gotoDate(date: string): void {
    this.calendars[0] = DateTime.fromISO(date).startOf(this.options.plain === 'month' ? 'year' : 'month');
    this.renderAll();
  }

  /**
   * Clear date selection
   */
  public clear() {
    this.datePicked.length = 0;
    this.renderAll();
    this.trigger('clear');
  }

  /**
   * Handling parameters passed by the user
   */
  public abstract handleOptions(): void;

  public abstract getOptionDate(): DateTime | undefined;

  protected fromDateTime(value?: DateTime): string | undefined {
    if (value) {
      return this.options.plain === 'month' ? value.toFormat('yyyy-LL') : value.toISODate();
    }
    return undefined;
  }
}
