import merge from "lodash.merge";
import { DateTime } from "luxon";
import { createPopper, Instance } from "@popperjs/core";
import Calendar from "./calendar";
import { PluginManager } from "./pluginManager";
import { IEventDetail, PickerConfig, IPickerElements } from "../types";

export abstract class Picker<TOptions extends PickerConfig> {
  public Calendar = new Calendar<TOptions>(this);
  public PluginManager: PluginManager;

  public calendars: DateTime[] = [];
  public datePicked: DateTime[] = [];
  public binds: Record<string, any> = {
    hidePicker: this.hidePicker.bind(this),
    show: this.show.bind(this),
  };

  public options: TOptions;

  public ui: IPickerElements = {
    container: null as unknown as HTMLElement,
    shadowRoot: null as unknown as ShadowRoot,
    wrapper: null as unknown as HTMLElement,
  };

  public popperInstance: Instance;

  constructor(options: PickerConfig) {
    this.PluginManager = new PluginManager(this);
    this.options = merge(
      {
        firstDay: 1,
        grid: 1,
        calendars: 1,
        lang: "en-US",
        format: "dd LLL, yyyy",
        readonly: true,
        autoApply: true,
        header: false,
        scrollToDate: true,
        locale: {
          nextMonth:
            '<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M2.748 16L0 13.333 5.333 8 0 2.667 2.748 0l7.919 8z" fill-rule="nonzero"/></svg>',
          previousMonth:
            '<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M7.919 0l2.748 2.667L5.333 8l5.334 5.333L7.919 16 0 8z" fill-rule="nonzero"/></svg>',
          cancel: "Cancel",
          apply: "Apply",
        },
        documentClick: this.binds.hidePicker as any,
        plugins: [],
      },
      options
    ) as unknown as TOptions;

    if (typeof this.options.documentClick === "function") {
      document.addEventListener("click", this.options.documentClick, true);
    }

    if (this.options.element instanceof HTMLInputElement) {
      this.options.element.readOnly = this.options.readonly!;
    }

    this.handleOptions();

    this.ui.wrapper = document.createElement("span");
    this.ui.wrapper.style.display = "none";
    this.ui.wrapper.style.position = "absolute";
    this.ui.wrapper.style.pointerEvents = "none";
    this.ui.wrapper.className = "temporal-picker";
    this.ui.wrapper.attachShadow({ mode: "open" });
    this.ui.shadowRoot = this.ui.wrapper.shadowRoot!;

    this.ui.container = document.createElement("div");
    this.ui.container.className = "container";

    this.ui.shadowRoot.appendChild(this.ui.container);
    (this.options.element as HTMLElement).after(this.ui.wrapper);

    this.handleCSS();

    (this.options.element as HTMLElement).addEventListener(
      "click",
      this.binds.show
    );

    this.on("view", this.onView.bind(this));
    this.on("render", this.onRender.bind(this));

    this.PluginManager.initialize();

    if (typeof this.options.setup === "function") {
      this.options.setup(this);
    }

    this.on("click", this.onClick.bind(this));

    this.popperInstance = createPopper(
      this.options.element,
      this.ui.container,
      {
        placement: this.options.placement || "bottom-start",
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [
                this.options.offsetLeft || 0,
                this.options.offsetTop || 0,
              ],
            },
          },
        ],
      }
    );
  }

  /**
   * Add listener to container element
   *
   * @param type
   * @param listener
   * @param options
   */
  public on(
    type: any,
    listener: (event: any) => void,
    options: any = {}
  ): void {
    this.ui.container.addEventListener(type, listener, options);
  }

  /**
   * Remove listener from container element
   *
   * @param type
   * @param listener
   * @param options
   */
  public off(
    type: any,
    listener: (event: any) => void,
    options: any = {}
  ): void {
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
    (this.options.element as HTMLElement).removeEventListener(
      "click",
      this.binds.show
    );
    if (typeof this.options.documentClick === "function") {
      document.removeEventListener("click", this.options.documentClick, true);
    }

    // detach all plugins
    Object.keys(this.PluginManager.instances).forEach((plugin) => {
      this.PluginManager.removeInstance(plugin);
    });

    this.ui.wrapper.remove();
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

    if (view === "Footer" && this.datePicked.length) {
      const applyButton = target.querySelector(".apply-button");
      applyButton.disabled = false;
    }
  }

  /**
   *
   * @param element
   */
  public onClickHeaderButton(element: HTMLElement) {
    if (this.isCalendarHeaderButton(element)) {
      if (element.classList.contains("next-button")) {
        this.calendars[0] = this.calendars[0].plus({ month: 1 });
      } else {
        this.calendars[0] = this.calendars[0].minus({ month: 1 });
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
      const element = target.closest(".unit");

      if (!(element instanceof HTMLElement)) return;

      this.onClickHeaderButton(element);
      this.onClickCalendarDay(element);
      this.onClickApplyButton(element);
      this.onClickCancelButton(element);
    }
  }

  /**
   * Determine if the picker is visible or not
   *
   * @returns Boolean
   */
  public isShown(): boolean {
    return this.ui.container.classList.contains("show");
  }

  /**
   * Show the picker
   *
   * @param event
   */
  public show(event?: any): void {
    if (this.isShown()) return;

    const target =
      event && "target" in event ? event.target : this.options.element;
    this.ui.container.classList.add("show");

    this.trigger("show", { target: target });
    this.popperInstance.update();
  }

  /**
   * Hide the picker
   */
  public hide(): void {
    this.ui.container.classList.remove("show");

    this.datePicked.length = 0;

    this.renderAll();

    this.trigger("hide");
  }

  /**
   * Update value of input element
   */
  public abstract updateInputValues(): boolean;

  /**
   * Function for documentClick option
   * Allows the picker to close when the user clicks outside
   *
   * @param e
   */
  public hidePicker(e: any): void {
    let target = e.target;
    let host = null;

    if (target.shadowRoot) {
      target = e.composedPath()[0];
      host = target.getRootNode().host;
    }

    if (
      this.isShown() &&
      host !== this.ui.wrapper &&
      target !== this.options.element
    ) {
      this.hide();
    }
  }

  /**
   * Render entire picker layout
   *
   * @param date
   */
  public renderAll(date?: DateTime | null): void {
    this.trigger("render", {
      view: "Container",
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
  public isCalendarDay(element: HTMLElement): boolean {
    return element.classList.contains("day");
  }

  /**
   * Determines if the element is the apply button
   *
   * @param element
   * @returns Boolean
   */
  public isApplyButton(element: HTMLElement): boolean {
    return element.classList.contains("apply-button");
  }

  /**
   * Determines if the element is the cancel button
   *
   * @param element
   * @returns Boolean
   */
  public isCancelButton(element: HTMLElement): boolean {
    return element.classList.contains("cancel-button");
  }

  /**
   * Change visible month
   *
   * @param date
   */
  public gotoDate(date: string): void {
    this.calendars[0] = DateTime.fromISO(date).startOf("minute");
    this.renderAll();
  }

  /**
   * Clear date selection
   */
  public clear() {
    this.datePicked.length = 0;
    this.updateInputValues();
    this.renderAll();
    this.trigger("clear");
  }

  /**
   * Handling parameters passed by the user
   */
  public abstract handleOptions(): void;

  public abstract getOptionDate(): DateTime | undefined;

  /**
   * Apply CSS passed by the user
   */
  private handleCSS(): void {
    if (this.options.css) {
      const style = document.createElement("style") as HTMLStyleElement;
      const styleText = document.createTextNode(this.options.css);
      style.appendChild(styleText);

      this.ui.shadowRoot.append(style);
      this.ui.wrapper.style.display = "";
    }
  }
}
