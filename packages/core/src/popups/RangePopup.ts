import { CalendarPopup as UI } from "../ui/calendarPopup/CalendarPopup";
import { CalendarPopup, PopupOptions } from "./CalendarPopup";
import { t } from "../utils";
import { Preset } from "../ui/calendarPopup/types";
import defaults from "../defaults";
import { Picker } from "./Picker";

export type RangePopupOptions = PopupOptions & {
  tooltip?: boolean;
  strict?: boolean;
  presets?: Preset[];
  presetPosition?: "left" | "right" | "top" | "bottom";
  reselect?: boolean;
};

export class RangePopup extends CalendarPopup {
  public tooltipElement?: HTMLElement;

  constructor(
    public options: RangePopupOptions,
    public element: HTMLElement,
    private host = element
  ) {
    super(element);

    if (options.tooltip ?? defaults.tooltip) {
      this.tooltipElement = document.createElement("span");
      this.hideTooltip();
    }
    this.ui = new UI(host, {
      actions: this,
      tooltipElement: this.tooltipElement,
      grid: 2,
      calendars: 2,
      rowHeader: options.rowHeader,
      plain: options.plain,
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
      localeClear: options.localeClear,
      localeApply: options.localeApply,
      localeCancel: options.localeCancel,
    });
    this.picker = new Picker(
      options.plain,
      options.strict ?? defaults.strict,
      options.reselect ?? defaults.reselect,
      2,
      options.values
    );

    this.element.addEventListener("mouseenter", this.handleMouseenter, true);
    this.element.addEventListener("mouseleave", this.handleMouseleave, true);

    this.render();
  }

  public setOptions(options: Partial<RangePopupOptions>): void {
    if (options.tooltip ?? this.options.tooltip) {
      this.tooltipElement = document.createElement("span");
      this.hideTooltip();
    } else {
      delete this.tooltipElement;
    }

    this.ui = new UI(this.host, {
      actions: this,
      tooltipElement: this.tooltipElement,
      grid: 2,
      calendars: 2,
      rowHeader: options.rowHeader ?? this.ui.context.rowHeader,
      plain: options.plain ?? this.ui.context.plain,
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
      customLayout: options.customLayout ?? this.ui.context.customLayout,
      localeClear: options.localeClear ?? this.ui.context.localeClear,
      localeApply: options.localeApply ?? this.ui.context.localeApply,
      localeCancel: options.localeCancel ?? this.ui.context.localeCancel,
    });

    this.picker = new Picker(
      options.plain ?? this.picker.plain,
      options.strict ?? this.picker.strict,
      options.reselect ?? this.picker.reselect,
      2,
      options.values,
      this.picker.index
    );
    
    this.render();
  }

  public destroy() {
    super.destroy();
    this.element.removeEventListener("mouseenter", this.handleMouseenter, true);
    this.element.removeEventListener("mouseenter", this.handleMouseleave, true);
  }

  private handleMouseenter = (e: MouseEvent) => {
    const target = e.target;

    if (target instanceof HTMLElement) {
      if (target.classList.contains("header")) {
        this.hideTooltip();
        this.update();
      }

      const element = target.closest(".unit");

      if (!(element instanceof HTMLElement)) return;

      if (this.isCalendarUnit(element)) {
        const instant = element.dataset.instant;

        if (instant) {
          const diff = this.picker.getHoverDiff(instant, this.ui.context.locale);
          if (!diff) {
            // this.hideTooltip();
            return;
          }

          this.update(instant);

          if (this.tooltipElement) {
            this.showTooltip(element, diff);
          }
        }
      }
    }
  };

  private handleMouseleave = (e: MouseEvent) => {
    const target = e.target;

    if (target instanceof HTMLElement) {
      if (target.classList.contains("calendars")) {
        this.hideTooltip();
        this.update();
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

      this.picker.setValues([start, end]);

      if (this.ui.context.autoApply) {
        this.dispatchSelect();
      } else {
        this.dispatchPreselect();
      }

      this.render();
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

    const container = this.element.getBoundingClientRect();
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
