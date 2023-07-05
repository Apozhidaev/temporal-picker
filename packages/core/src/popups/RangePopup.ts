import { CalendarPopup as UI } from "../ui/calendarPopup/CalendarPopup";
import { CalendarPopup, PopupOptions, Dictionary } from "./CalendarPopup";
import { mergeOptions, t } from "../utils";
import { Preset } from "../ui/calendarPopup/types";
import defaults from "../defaults";

export type PluralDictionary = {
  zero?: string;
  one?: string;
  two?: string;
  few?: string;
  many?: string;
  other?: string;
};

export type RangeDictionary = Dictionary & {
  days?: PluralDictionary;
  months?: PluralDictionary;
};

export type RangePopupOptions = PopupOptions & {
  dictionary?: RangeDictionary;
  tooltip?: boolean;
  strict?: boolean;
  presets?: Preset[];
  presetPosition?: "left" | "right" | "top" | "bottom";
};

export class RangePopup extends CalendarPopup {
  public tooltipElement?: HTMLElement;

  constructor(element: HTMLElement, protected options: RangePopupOptions, private host = element) {
    super(element, options);

    if (options.tooltip ?? defaults.tooltip) {
      this.tooltipElement = document.createElement("span");
      this.hideTooltip();
    }
    this.ui = new UI(host, {
      actions: this,
      plain: this.plain,
      tooltipElement: this.tooltipElement,
      pickCount: 2,
      grid: 2,
      calendars: 2,
      firstDay: options.firstDay ?? defaults.firstDay,
      locale: options.locale ?? defaults.locale,
      resetButton: options.resetButton ?? defaults.resetButton,
      autoApply: options.autoApply ?? defaults.autoApply,
      strict: options.strict ?? defaults.strict,
      extraSelect: options.extraSelect,
      min: options.min,
      max: options.max,
      minYear: options.minYear,
      maxYear: options.maxYear,
      presets: options.presets,
      presetPosition: options.presetPosition,
      customLayout: options.customLayout,
      dictionary: mergeOptions(options.dictionary, {
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
      }),
    });

    if (this.ui.context.strict || this.ui.context.autoApply) {
      this.container.addEventListener("mouseenter", this.handleMouseenter, true);
    }

    this.render();
  }

  public setOptions(options: Partial<RangePopupOptions>): void {
    super.setOptions(options);

    if (options.tooltip ?? this.options.tooltip) {
      this.tooltipElement = document.createElement("span");
      this.hideTooltip();
    } else {
      delete this.tooltipElement;
    }

    this.ui = new UI(this.host, {
      actions: this,
      plain: this.plain,
      tooltipElement: this.tooltipElement,
      pickCount: 2,
      grid: 2,
      calendars: 2,
      firstDay: options.firstDay ?? this.ui.context.firstDay,
      locale: options.locale ?? this.ui.context.locale,
      resetButton: options.resetButton ?? this.ui.context.resetButton,
      autoApply: options.autoApply ?? this.ui.context.autoApply,
      strict: options.strict ?? this.ui.context.strict,
      extraSelect: options.extraSelect ?? this.ui.context.extraSelect,
      min: options.min ?? this.ui.context.min,
      max: options.max ?? this.ui.context.max,
      minYear: options.minYear ?? this.ui.context.minYear,
      maxYear: options.maxYear ?? this.ui.context.maxYear,
      presets: options.presets ?? this.ui.context.presets,
      presetPosition: options.presetPosition ?? this.ui.context.presetPosition,
      customLayout: options.customLayout,
      dictionary: mergeOptions(options.dictionary, this.ui.context.dictionary),
    });

    this.render();
  }

  public destroy() {
    super.destroy();
    this.container.removeEventListener("mouseenter", this.handleMouseenter, true);
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

          if (this.tooltipElement) {
            const values = [this.picked[0], instant];
            values.sort();
            const [start, end] = values;
            const diff = t(this.plain).diff(start, end);
            if (diff > 0) {
              const pluralKey = new Intl.PluralRules(this.ui.context.locale).select(diff);

              const text = `${diff} ${
                t(this.plain).durationRecord(this.ui.context.dictionary)?.[pluralKey]
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

  protected onClick(element: HTMLElement): void {
    super.onClick(element);

    this.onPresetButtonClick(element);
    this.hideTooltip();
  }

  public render(): void {
    super.render();
    this.hideTooltip();
  }

  private onPresetButtonClick(element: HTMLElement): void {
    if (this.isPresetButton(element)) {
      const { start, end } = element.dataset;

      this.picked = [start, end].filter(Boolean) as string[];
      this.picked.sort();

      if (this.ui.context.autoApply) {
        this.dispatchSelect([start, end]);
      } else {
        this.dispatchPreselect([start, end]);
      }

      if (this.picked.length > 0) {
        this.scrollTo(this.picked[0]);
      } else {
        this.update();
      }
    }
  }

  /**
   * Determines if HTMLElement is preset buttons
   *
   * @param element
   * @returns Boolean
   */
  private isPresetButton(element: HTMLElement) {
    return element.classList.contains("preset-button");
  }

  /**
   * Displays tooltip of selected units
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
    const unit = element.getBoundingClientRect();
    let top = unit.top;
    let left = unit.left;

    top -= container.top;
    left -= container.left;

    top -= tooltip.height;
    left -= tooltip.width / 2;
    left += unit.width / 2;

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
