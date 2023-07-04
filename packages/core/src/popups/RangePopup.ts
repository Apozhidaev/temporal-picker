import { PickerType, PlainType } from "../types";
import { GridPopup as UI } from "../ui/gridPopup/GridPopup";
import { DatePopup } from "./DatePopup";
import { DateTime } from "luxon";

type Options = {
  element: HTMLElement;
  type: PickerType;
  palin: PlainType;
  pickCount: 1 | 2;
  header?: HTMLElement | string | boolean;
  autoApply?: boolean;
  grid?: number;
  calendars?: number;
  locale?: string;
  dictionary?: {
    previous?: string;
    next?: string;
    cancel?: string;
    apply?: string;
    days: {
      zero: string;
      one: string;
      two: string;
      few: string;
      many: string;
      other: string;
    };
    months: {
      zero: string;
      one: string;
      two: string;
      few: string;
      many: string;
      other: string;
    };
  };
  tooltip?: boolean;
};

export class RangePopup extends DatePopup {
  public tooltipElement?: HTMLElement;
  public options: Options;

  constructor(options: Options) {
    super(options);
    this.options = options;

    this.container.addEventListener("mouseenter", this.handleMouseenter, true);
  }

  protected getUI() {
    if (this.options.tooltip) {
      this.tooltipElement = document.createElement("span");
      this.hideTooltip();
    }
    const ui = new UI({
      pickCount: 2,
      plainUnits: this.plainUnits,
      firstDay: 1,
      locale: "en-US",
      grid: 2,
      calendars: 2,
      tooltipElement: this.tooltipElement,
      dictionary: {
        days: {
          zero: "",
          one: "day",
          two: "",
          few: "",
          many: "",
          other: "days",
        },
        months: {
          zero: "",
          one: "month",
          two: "",
          few: "",
          many: "",
          other: "months",
        },
      } as Options["dictionary"],
    });
    ui.render(this.container, {
      entry: this.entry,
      picked: this.picked,
    });
    return ui;
  }

  public destroy() {
    super.destroy();
    this.container.removeEventListener(
      "mouseenter",
      this.handleMouseenter,
      true
    );
  }

  handleMouseenter = (e: MouseEvent) => {
    const target = e.target;

    if (target instanceof HTMLElement) {
      const element = target.closest(".unit");

      if (!(element instanceof HTMLElement)) return;

      if (this.isCalendarUnit(element)) {
        if (this.picked.length !== 1) return;
        const instant = element.dataset.instant;

        if (instant) {
          this.update(instant);

          if (this.options.tooltip) {
            const values = [this.picked[0], instant];
            values.sort();
            const [start, end] = values.map((x) => DateTime.fromISO(x));
            const diff =
              end.diff(start, this.plainUnits.diff)[this.plainUnits.duration] +
              1;
            if (diff > 0) {
              const pluralKey = new Intl.PluralRules(
                this.ui.context.locale
              ).select(diff);

              const text = `${diff} ${
                this.ui.context.dictionary?.[this.plainUnits.duration]?.[
                  pluralKey
                ]
              }`;

              this.showTooltip(element, text);
            } else {
              this.hideTooltip();
            }
          }
        }
      }
    }
  };

  protected onPicked(): void {
    super.onPicked();
    this.hideTooltip();
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

    const container = this.container.getBoundingClientRect();
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
