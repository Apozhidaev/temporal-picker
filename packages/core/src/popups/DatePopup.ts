import defaults from "../defaults";
import { CalendarPopup as UI } from "../ui/calendarPopup/CalendarPopup";
import { CalendarPopup, PopupOptions } from "./CalendarPopup";

export type DatePopupOptions = PopupOptions;

export class DatePopup extends CalendarPopup {
  constructor(
    public options: DatePopupOptions,
    public element: HTMLElement,
    private host = element
  ) {
    super(options, element);
    this.ui = new UI(host, {
      actions: this,
      plain: this.plain,
      firstDay: options.firstDay ?? defaults.firstDay,
      locale: options.locale ?? defaults.locale,
      pickCount: 1,
      grid: 1,
      calendars: 1,
      resetButton: options.resetButton ?? defaults.resetButton,
      extraSelect: options.extraSelect,
      autoApply: options.autoApply ?? defaults.autoApply,
      min: options.min,
      max: options.max,
      minYear: options.minYear,
      maxYear: options.maxYear,
      customLayout: options.customLayout,
      localeClear: options.localeClear,
      localeApply: options.localeApply,
      localeCancel: options.localeCancel,
    });
    this.render();
  }

  public setOptions(options: Partial<PopupOptions>): void {
    super.setOptions(options);
    this.ui = new UI(this.host, {
      actions: this,
      plain: this.plain,
      firstDay: options.firstDay ?? this.ui.context.firstDay,
      locale: options.locale ?? this.ui.context.locale,
      pickCount: 1,
      grid: 1,
      calendars: 1,
      resetButton: options.resetButton ?? this.ui.context.resetButton,
      extraSelect: options.extraSelect ?? this.ui.context.extraSelect,
      autoApply: options.autoApply ?? this.ui.context.autoApply,
      min: options.min ?? this.ui.context.min,
      max: options.max ?? this.ui.context.max,
      minYear: options.minYear ?? this.ui.context.minYear,
      maxYear: options.maxYear ?? this.ui.context.maxYear,
      customLayout: options.customLayout ?? this.ui.context.customLayout,
      localeClear: options.localeClear ?? this.ui.context.localeClear,
      localeApply: options.localeApply ?? this.ui.context.localeApply,
      localeCancel: options.localeCancel ?? this.ui.context.localeCancel,
    });
    this.render();
  }
}
