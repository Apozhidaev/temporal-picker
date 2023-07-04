import { DateTime } from "luxon";
import { PlainType } from "../types";
import { CalendarPopup as UI } from "../ui/calendarPopup/CalendarPopup";
import { t } from "../utils";

type Options = {
  element: HTMLElement;
  plain: PlainType;
};

export type Dictionary = {
  cancel?: string;
  apply?: string;
  reset?: string;
  next?: string;
  previous?: string;
};

export type PopupOptions = Options & {
  locale?: string;
  header?: HTMLElement | string | boolean;
  autoApply?: boolean;
  resetButton?: boolean;
  extraSelect?: boolean;
  min?: string;
  max?: string;
  minYear?: number;
  maxYear?: number;
  firstDay?: number;
  dictionary?: Dictionary;
};

export abstract class CalendarPopup {
  public entry;
  public picked: string[] = [];

  public plain: PlainType;
  public container: HTMLElement;
  protected ui!: UI;

  constructor(options: Options) {
    this.plain = options.plain;
    this.entry = t(this.plain).entry();

    this.container = options.element;
    this.container.style.position = "relative";

    this.container.addEventListener("click", this.handleClick);
  }

  public scrollTo(value: string, shift = 0) {
    if (value) {
      this.entry = t(this.plain).startOf(value, shift);
      this.render();
    }
  }

  public select(values: string[], scrollToIndex = 0, shift = scrollToIndex) {
    this.picked = values.filter(Boolean).map(t(this.plain).instant);
    this.picked.sort();
    this.scrollTo(values[scrollToIndex] || DateTime.now().toISO()!, shift);
  }

  public destroy() {
    this.container.removeEventListener("click", this.handleClick);
    this.container.innerHTML = "";
  }

  /**
   *
   * @param element
   */
  private onClickHeaderButton(element: HTMLElement) {
    if (this.isCalendarHeaderButton(element)) {
      if (element.classList.contains("next-button")) {
        this.entry = t(this.plain).next(this.entry);
      } else {
        this.entry = t(this.plain).previous(this.entry);
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
      this.picked = [];
      this.render();
      this.dispatchClear();
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
        if (this.picked.length >= this.ui.context.pickCount) {
          this.picked = [];
        }

        this.picked = [...this.picked, instant];
        this.picked.sort();

        if (
          this.ui.context.autoApply &&
          this.picked.length === this.ui.context.pickCount
        ) {
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
    return ["previous-button", "next-button"].some((x) =>
      element.classList.contains(x)
    );
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

  public render() {
    this.ui.render(this.container, {
      entry: this.entry,
      picked: this.picked,
    });
  }

  protected update(hover?: string) {
    this.ui.update({
      hover,
      entry: this.entry,
      picked: this.picked,
    });
  }

  protected dispatchSelect(values?: (string | undefined)[]) {
    this.container.dispatchEvent(
      new CustomEvent("t-select", {
        detail: {
          values: values || this.picked,
        },
      })
    );
  }

  protected dispatchPreselect(values?: (string | undefined)[]) {
    this.container.dispatchEvent(
      new CustomEvent("t-pre-select", {
        detail: {
          values: values || this.picked,
        },
      })
    );
  }

  protected dispatchClose() {
    this.container.dispatchEvent(new CustomEvent("t-close"));
  }

  protected dispatchClear() {
    this.container.dispatchEvent(new CustomEvent("t-reset"));
  }
}
