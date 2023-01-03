import { BasePlugin, IPlugin } from "./base";

export interface IKeyboardPlugin {
  unitIndex?: number;
  dayIndex?: number;
  openHotkeys?: string[];
}

export class KeyboardPlugin extends BasePlugin implements IPlugin {
  public binds = {
    onKeydown: this.onKeydown.bind(this),
    handleShow: this.handleShow.bind(this),
    updateTabIndex: this.updateTabIndex.bind(this),
  };

  public options: IKeyboardPlugin = {
    unitIndex: 1,
    dayIndex: 2,
    openHotkeys: ["Enter", "Space"],
  };

  /**
   * Returns plugin name
   *
   * @returns String
   */
  public getName(): string {
    return "KeyboardPlugin";
  }

  /**
   * - Called automatically via BasePlugin.attach() -
   * The function execute on initialize the picker
   */
  public onAttach(): void {
    const element = this.picker.options.element as HTMLElement;
    element.addEventListener("keydown", this.binds.handleShow, {
      capture: true,
    });

    this.picker.on("keydown", this.binds.onKeydown);

    this.picker.on("show", this.binds.updateTabIndex);
    this.picker.on("hide", this.binds.updateTabIndex);
    this.picker.on("render", this.binds.updateTabIndex);
  }

  /**
   * - Called automatically via BasePlugin.detach() -
   */
  public onDetach(): void {
    const element = this.picker.options.element as HTMLElement;
    element.removeEventListener("keydown", this.binds.handleShow, {
      capture: true,
    });

    this.picker.off("keydown", this.binds.onKeydown);
    this.picker.off("show", this.binds.updateTabIndex);
    this.picker.off("hide", this.binds.updateTabIndex);
    this.picker.off("render", this.binds.updateTabIndex);
  }

  private updateTabIndex() {
    const show = this.picker.ui.container.classList.contains("show");
    const days = this.picker.ui.container.querySelectorAll<HTMLElement>(
      ".unit.day:not(.locked,.not-available)"
    );
    [...days].forEach(
      (el) => (el.tabIndex = show ? this.options.dayIndex || 0 : -1)
    );
    const units =
      this.picker.ui.container.querySelectorAll<HTMLElement>(".unit:not(.day)");
    [...units].forEach(
      (el) => (el.tabIndex = show ? this.options.unitIndex || 0 : -1)
    );
  }

  private handleShow(event: KeyboardEvent) {
    const { openHotkeys } = this.options;
    switch (true) {
      case openHotkeys?.includes(event.code):
        event.preventDefault();

        this.picker.show({ target: this.picker.options.element });
        break;

      case ["Escape"].includes(event.code):
        this.picker.hide();
        break;
    }
  }

  /**
   * Function for `keydown` event
   * Handle keys when the picker has focus
   *
   * @param event
   */
  private onKeydown(event: KeyboardEvent) {
    this.onMouseEnter(event);

    switch (event.code) {
      case "ArrowUp":
      case "ArrowDown":
        this.verticalMove(event);
        break;

      case "ArrowLeft":
      case "ArrowRight":
        this.horizontalMove(event);
        break;

      case "Enter":
      case "Space":
        this.handleEnter(event);
        break;

      case "Escape":
        this.picker.hide();
        break;
    }
  }

  /**
   * Find closest day elements
   *
   * @param layout
   * @param target
   * @param isAllow
   * @returns Boolean
   */
  private findAllowableDaySibling(
    layout: HTMLElement,
    target: HTMLElement,
    isAllow: (idx: number, targetIdx: number) => boolean
  ) {
    const elms = Array.from(
      layout.querySelectorAll<HTMLElement>(
        `.day[tabindex="${this.options.dayIndex}"]`
      )
    );
    const targetIdx = elms.indexOf(target);

    return elms.filter((el, idx) => {
      return isAllow(idx, targetIdx) && el.tabIndex === this.options.dayIndex;
    })[0];
  }

  /**
   * Switch month via buttons (previous month, next month)
   *
   * @param evt
   */
  private changeMonth(evt: KeyboardEvent) {
    const arrows: Record<string, string> = {
      ArrowLeft: "previous",
      ArrowRight: "next",
    };
    const button = this.picker.ui.container.querySelector<HTMLButtonElement>(
      `.${arrows[evt.code]}-button[tabindex="${this.options.unitIndex}"]`
    );

    if (
      button &&
      !button.parentElement?.classList.contains(`no-${arrows[evt.code]}-month`)
    ) {
      button.dispatchEvent(new Event("click", { bubbles: true }));

      setTimeout(() => {
        let focusEl = null;

        switch (evt.code) {
          case "ArrowLeft": {
            const elms = this.picker.ui.container.querySelectorAll<HTMLElement>(
              `.day[tabindex="${this.options.dayIndex}"]`
            );
            focusEl = elms[elms.length - 1];
            break;
          }

          case "ArrowRight":
            focusEl = this.picker.ui.container.querySelector<HTMLElement>(
              `.day[tabindex="${this.options.dayIndex}"]`
            );
            break;
        }

        if (focusEl) {
          focusEl.focus();
        }
      });
    }
  }

  /**
   * Handle ArrowUp and ArrowDown keys
   *
   * @param evt
   */
  private verticalMove(evt: KeyboardEvent) {
    const target = evt.target as HTMLElement;

    if (target.classList.contains("day")) {
      evt.preventDefault();

      const nextElement = this.findAllowableDaySibling(
        this.picker.ui.container,
        target,
        (idx, targetIdx) => {
          targetIdx = evt.code === "ArrowUp" ? targetIdx - 7 : targetIdx + 7;
          return idx === targetIdx;
        }
      );

      if (nextElement) {
        (nextElement as HTMLElement).focus();
      }
    }
  }

  /**
   * Handle ArrowLeft and ArrowRight keys
   *
   * @param evt
   */
  private horizontalMove(evt: KeyboardEvent) {
    const target = evt.target as HTMLElement;

    if (target.classList.contains("day")) {
      evt.preventDefault();

      const nextElement = this.findAllowableDaySibling(
        this.picker.ui.container,
        target,
        (idx, targetIdx) => {
          targetIdx = evt.code === "ArrowLeft" ? targetIdx - 1 : targetIdx + 1;
          return idx === targetIdx;
        }
      );

      if (nextElement) {
        (nextElement as HTMLElement).focus();
      } else {
        this.changeMonth(evt);
      }
    }
  }

  /**
   * Handle Enter and Space keys
   *
   * @param evt
   */
  private handleEnter(evt: KeyboardEvent) {
    const target = evt.target as HTMLElement;

    if (target.classList.contains("day")) {
      evt.preventDefault();

      target.dispatchEvent(new Event("click", { bubbles: true }));

      setTimeout(() => {
        const rangePlugin =
          this.picker.PluginManager.getInstance("RangePlugin");

        if (rangePlugin || !this.picker.options.autoApply) {
          const { container } = this.picker.ui;
          const endSelected = container.querySelector(".day.end");

          if (endSelected) {
            this.focusTo(".apply-button");
          } else {
            this.focusTo(".day.selected");
          }
        }
      });
    }

    if (target.classList.contains("unit")) {
      if (target.classList.contains("preset-button")) {
        if (!this.picker.options.autoApply) {
          this.focusTo(".apply-button");
        }
      }

      if (target.classList.contains("previous-button")) {
        this.focusTo(".calendar:first-child > .header .previous-button");
      }

      if (target.classList.contains("next-button")) {
        this.focusTo(".calendar:last-child > .header .next-button");
      }
    }
  }

  /**
   * Manually fire `mouseenter` event to display date range correctly
   *
   * @param evt
   */
  private onMouseEnter(evt: Event) {
    const target = evt.target as HTMLElement;

    if (target.classList.contains("day")) {
      setTimeout(() => {
        const e = this.picker.ui.shadowRoot.activeElement;
        if (e) {
          e.dispatchEvent(new Event("mouseenter", { bubbles: true }));
        }
      });
    }
  }

  private focusTo(selectors: string, timeout: number = 0) {
    setTimeout(() => {
      const { container } = this.picker.ui;
      const element: HTMLElement | null = container.querySelector(selectors);
      element?.focus();
    }, timeout);
  }
}
