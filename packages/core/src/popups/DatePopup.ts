import { PickerType, PlainType } from "../types";
import { GridPopup as UI } from "../ui/gridPopup/GridPopup";
import { DateTime } from "luxon";
import { PlainUnits, getPlainUnits, toInstant } from "../utils";

type Options = {
  element: HTMLElement;
  type: PickerType;
  palin: PlainType;
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
  };
};

export class DatePopup {
  public entry;
  public picked: string[] = [];

  public options: Options;
  public plainUnits: PlainUnits;
  public container: HTMLElement;
  public ui!: UI;

  constructor(options: Options) {
    this.options = options;

    this.plainUnits = getPlainUnits(this.options.palin);
    this.entry = toInstant(DateTime.now().startOf(this.plainUnits.entry));

    this.container = this.options.element;
    this.container.style.position = "relative";

    this.container.addEventListener("click", this.handleClick);

    // this.container.addEventListener("render", (e) => {
    //   if (e.detail.component === "Popup.Grid.Calendar.Days.Day") {
    //     e.preventDefault();
    //     e.detail.el.innerHTML = "X";
    //   }
    // });
    // this.container.addEventListener("layout", (e) => {
    //   if (e.detail.component === "Popup.Grid.Calendar.Days.Day") {
    //     e.detail.el.innerHTML = "X";
    //   }
    // });
    // this.container.addEventListener("render", (e) => console.log(e));
    // this.container.addEventListener("layout", (e) => console.log(e));
    // this.container.addEventListener("update", (e) => console.log(e));

    this.render();
  }

  protected getUI() {
    const ui = new UI({
      pickCount: 1,
      plainUnits: this.plainUnits,
      firstDay: 1,
      locale: "en-US",
      grid: 1,
      calendars: 1,
    });
    ui.render(this.container, {
      entry: this.entry,
      picked: this.picked,
    });
    return ui;
  }

  public destroy() {
    this.container.removeEventListener("click", this.handleClick);
  }

  /**
   *
   * @param element
   */
  public onClickHeaderButton(element: HTMLElement) {
    if (this.isCalendarHeaderButton(element)) {
      if (element.classList.contains("next-button")) {
        this.entry = toInstant(
          DateTime.fromISO(this.entry).plus(this.plainUnits.step),
          this.plainUnits.plain
        );
      } else {
        this.entry = toInstant(
          DateTime.fromISO(this.entry).minus(this.plainUnits.step),
          this.plainUnits.plain
        );
      }

      this.render();
    }
  }

  /**
   *
   * @param element
   */
  public onClickCalendarUnit(element: HTMLElement) {
    if (this.isCalendarUnit(element)) {
      const instant = element.dataset.instant;

      if (instant) {
        if (this.picked.length >= this.ui.context.pickCount) {
          this.picked = [];
        }

        this.picked = [...this.picked, instant];
        this.picked.sort();

        console.log(this.picked);

        if (
          this.options.autoApply &&
          this.picked.length === this.ui.context.pickCount
        ) {
          this.dispatchSelect();
        } else {
          this.dispatchPreselect();
        }
        this.update();
        this.onPicked();
      }
    }
  }

  protected onPicked() {}

  /**
   *
   * @param element
   */
  public onClickApplyButton(element: HTMLElement) {
    if (this.isApplyButton(element)) {
      this.dispatchSelect();
    }
  }

  /**
   *
   * @param element
   * @returns
   */
  public onClickCancelButton(element: HTMLElement) {
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

      this.onClickHeaderButton(element);
      this.onClickCalendarUnit(element);
      this.onClickApplyButton(element);
      this.onClickCancelButton(element);
    }
  };

  /**
   * Determines if the element is buttons of header (previous month, next month)
   *
   * @param element
   * @returns Boolean
   */
  private isCalendarHeaderButton(element: HTMLElement): boolean {
    return ["previous-button", "next-button"].some((x) =>
      element.classList.contains(x)
    );
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
  private isApplyButton(element: HTMLElement): boolean {
    return element.classList.contains("apply-button");
  }

  /**
   * Determines if the element is the cancel button
   *
   * @param element
   * @returns Boolean
   */
  private isCancelButton(element: HTMLElement): boolean {
    return element.classList.contains("cancel-button");
  }

  protected render() {
    if (!this.ui) {
      this.ui = this.getUI();
    }
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

  private dispatchSelect() {
    this.container.dispatchEvent(
      new CustomEvent("select", {
        detail: {
          values: this.picked,
        },
      })
    );
  }

  private dispatchPreselect() {
    this.container.dispatchEvent(
      new CustomEvent("preselect", {
        detail: {
          values: this.picked,
        },
      })
    );
  }

  private dispatchClose() {
    this.container.dispatchEvent(new CustomEvent("close"));
  }
}
