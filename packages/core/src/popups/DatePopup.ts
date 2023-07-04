import defaults from "../defaults";
import { CalendarPopup as UI } from "../ui/calendarPopup/CalendarPopup";
import { CalendarPopup, PopupOptions } from "./CalendarPopup";

type Options = PopupOptions & {
  value?: string;
};

export class DatePopup extends CalendarPopup {
  constructor(options: Options) {
    super(options);

    this.ui = new UI({
      actions: this,
      plain: this.plain,
      firstDay: options.firstDay ?? defaults.firstDay,
      locale: options.locale ?? defaults.lacale,
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
      dictionary: options.dictionary,
    });
  }
}
