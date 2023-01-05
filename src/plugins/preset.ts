import { DateTime } from "../core/datetime";
import { BasePlugin, IEventDetail, IPlugin } from "./base";

export type PresetItem = {
  label: string;
  start: string;
  end: string;
};

export interface IPresetConfig {
  presets: PresetItem[];
  position?: "left" | "right" | "top" | "bottom";
}

export class PresetPlugin extends BasePlugin implements IPlugin {
  public dependencies = ["RangePlugin"];

  public binds = {
    onView: this.onView.bind(this),
    onClick: this.onClick.bind(this),
  };

  public options: IPresetConfig = {
    presets: [],
    position: "bottom",
  };

  /**
   * Returns plugin name
   *
   * @returns String
   */
  public getName(): string {
    return "PresetPlugin";
  }

  /**
   * - Called automatically via BasePlugin.attach() -
   * The function execute on initialize the picker
   */
  public onAttach(): void {
    this.picker.on("view", this.binds.onView);
    this.picker.on("click", this.binds.onClick);
  }

  /**
   * - Called automatically via BasePlugin.detach() -
   */
  public onDetach(): void {
    this.picker.off("view", this.binds.onView);
    this.picker.off("click", this.binds.onClick);
  }

  /**
   * Function `view` event
   * Adds HTML layout of current plugin to the picker layout
   *
   * @param event
   */
  private onView(event: CustomEvent) {
    const { view, target }: IEventDetail = event.detail;

    if (target && view === "Main") {
      const container = document.createElement("div");
      container.className = "preset-plugin-container";

      const startDate = this.picker.datePicked[0] || this.picker.getStartDate();
      const endDate = this.picker.datePicked[1] || this.picker.getEndDate();

      this.options.presets.forEach(({ label, start, end }) => {
        const item = document.createElement("button");
        item.className = "preset-button unit";
        if (
          startDate?.getTime() === new DateTime(start).getTime() &&
          endDate?.getTime() === new DateTime(end).getTime()
        ) {
          item.classList.add("selected");
        } else {
          item.classList.remove("selected");
        }
        item.innerHTML = label;
        item.dataset.start = start;
        item.dataset.end = end;

        container.appendChild(item);

        this.picker.trigger("view", {
          view: "PresetPluginButton",
          target: item,
        });
      });
      target.appendChild(container);
      target.classList.add(`preset-${this.options.position}`);

      this.picker.trigger("view", {
        view: "PresetPluginContainer",
        target: container,
      });
    }
  }

  /**
   * Handle click event
   *
   * @param event
   */
  private onClick(event: any) {
    const target = event.target;
    if (target instanceof HTMLElement) {
      const element = target.closest(".unit") as HTMLElement;

      if (!(element instanceof HTMLElement)) return;

      if (this.isPresetButton(element)) {
        const startDate = new DateTime(element.dataset.start);
        const endDate = new DateTime(element.dataset.end);

        if (this.picker.options.autoApply) {
          this.picker.setDateRange(startDate, endDate);

          this.picker.trigger("select", {
            start: this.picker.getStartDate(),
            end: this.picker.getEndDate(),
            startDateISO: this.picker.getStartDate()?.format("YYYY-MM-DD"),
            endDateISO: this.picker.getEndDate()?.format("YYYY-MM-DD"),
          });

          this.picker.hide();
        } else {
          this.picker.datePicked = [startDate, endDate];

          this.picker.renderAll();
        }
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
}
