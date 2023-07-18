import { DateTime } from "luxon";
import { PlainType } from "../types";
import { CalendarPopup as UI } from "../ui/calendarPopup/CalendarPopup";
import { Picker } from "./Picker";
import { getCalendarIndex } from "../ui/calendarPopup/main/grid/calendar/Calendar";

export type PopupOptions = {
  plain: PlainType;
  values?: string[];
  locale?: string | null;
  localeCancel?: string | null;
  localeApply?: string | null;
  localeClear?: string | null;
  header?: HTMLElement | string | boolean | null;
  autoApply?: boolean | null;
  resetButton?: boolean | null;
  extraSelect?: boolean | null;
  min?: string | null;
  max?: string | null;
  minYear?: number | null;
  maxYear?: number | null;
  firstDay?: number | null;
  customLayout?: boolean | null;
  rowHeader?: boolean | null;
  pickLabel?: boolean | null;
};

export abstract class CalendarPopup {
  protected ui!: UI;
  protected picker!: Picker;

  constructor(public element: HTMLElement) {
    this.element.style.position = "relative";
    this.element.addEventListener("click", this.handleClick);
  }

  public scrollTo(value: string = DateTime.now().toISO()!, shift = 0) {
    this.picker.scrollTo(value, shift);
    this.render();
  }

  public select(values: string[], index = 0) {
    this.picker.setValues(values, index);
    this.render();
  }

  public getValues() {
    return this.picker.getValues();
  }

  public destroy() {
    this.element.removeEventListener("click", this.handleClick);
    this.element.innerHTML = "";
  }

  /**
   *
   * @param element
   */
  private onClickHeaderButton(element: HTMLElement) {
    if (this.isCalendarHeaderButton(element)) {
      if (element.classList.contains("next-button")) {
        this.picker.next();
      } else {
        this.picker.previous();
      }
      this.render();
    }
  }

  /**
   *
   * @param element
   */
  private onClickResetButton(element: HTMLElement) {
    if (this.isResetButton(element)) {
      this.picker.reset();
      this.render();
      this.dispatchReset();
    }
  }

  /**
   *
   * @param element
   */
  private onClickCalendarUnit(element: HTMLElement) {
    if (this.isCalendarUnit(element)) {
      const instant = element.dataset.instant;

      if (instant) {
        const index = getCalendarIndex(element);
        this.picker.select(instant, index);

        if (this.ui.context.autoApply && this.picker.isValid()) {
          this.dispatchSelect();
        } else {
          this.dispatchPreselect();
        }
        this.update();
      }
    }
  }

  /**
   *
   * @param element
   */
  private onClickApplyButton(element: HTMLElement) {
    if (this.isApplyButton(element)) {
      this.dispatchSelect();
    }
  }

  /**
   *
   * @param element
   * @returns
   */
  private onClickCancelButton(element: HTMLElement) {
    if (this.isCancelButton(element)) {
      this.dispatchClose();
      return;
    }
  }

  private handleClick = (e: MouseEvent) => {
    const target = e.target;

    if (target instanceof HTMLElement) {
      const element = target.closest(".unit");

      if (!(element instanceof HTMLElement)) return;
      this.onClick(element);
    }
  };

  protected onClick(element: HTMLElement) {
    this.onClickHeaderButton(element);
    this.onClickResetButton(element);
    this.onClickCalendarUnit(element);
    this.onClickApplyButton(element);
    this.onClickCancelButton(element);
  }

  /**
   * Determines if the element is buttons of header (previous month, next month)
   *
   * @param element
   * @returns Boolean
   */
  protected isCalendarHeaderButton(element: HTMLElement): boolean {
    return ["previous-button", "next-button"].some((x) => element.classList.contains(x));
  }

  /**
   * Determines if the element is buttons of header (previous month, next month)
   *
   * @param element
   * @returns Boolean
   */
  protected isResetButton(element: HTMLElement): boolean {
    return element.classList.contains("reset-button");
  }

  /**
   * Determines if the element is day element
   *
   * @param element
   * @returns Boolean
   */
  protected isCalendarUnit(element: HTMLElement): boolean {
    return element.classList.contains("day");
  }

  /**
   * Determines if the element is the apply button
   *
   * @param element
   * @returns Boolean
   */
  protected isApplyButton(element: HTMLElement): boolean {
    return element.classList.contains("apply-button");
  }

  /**
   * Determines if the element is the cancel button
   *
   * @param element
   * @returns Boolean
   */
  protected isCancelButton(element: HTMLElement): boolean {
    return element.classList.contains("cancel-button");
  }

  protected render() {
    this.ui.render(this.element, {
      entry: this.picker.entry,
      picked: this.picker.getValues(),
      isValid: this.picker.isValid(),
    });
  }

  protected update(hover?: string) {
    this.ui.update({
      entry: this.picker.entry,
      picked: this.picker.getValues(hover),
      isValid: this.picker.isValid(),
    });
  }

  protected dispatchSelect() {
    this.element.dispatchEvent(
      new CustomEvent("t-select", {
        detail: {
          values: this.picker.getValues(),
        },
      })
    );
  }

  protected dispatchPreselect() {
    this.element.dispatchEvent(
      new CustomEvent("t-pre-select", {
        detail: {
          values: this.picker.getValues(),
        },
      })
    );
  }

  protected dispatchClose() {
    this.element.dispatchEvent(new CustomEvent("t-close"));
  }

  protected dispatchReset() {
    this.element.dispatchEvent(new CustomEvent("t-reset"));
  }
}
