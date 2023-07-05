import { Control } from "../../base/Control";
import { PopupContext } from "../types";
import { Grid } from "./grid/Grid";
import { Presets } from "./Presets";

type Props = {
  entry: string;
  picked: string[];
  hover?: string;
};

export class Main extends Control<Props, PopupContext> {
  private grid;
  private presetsContainer;

  constructor(host: HTMLElement, context: PopupContext) {
    super(host, context, "main");
    this.grid = new Grid(host, context);
    this.presetsContainer = new Presets(host, context);
  }

  get type(): string {
    return "calendar-popup-main";
  }

  protected onRender(el: HTMLElement, props: Props) {
    const { presets, tooltipElement, presetPosition } = this.context;

    this.grid.render(el, props);

    if (Array.isArray(presets) && presets.length > 0) {
      el.classList.add(`preset-${presetPosition || "bottom"}`);
      this.presetsContainer.render(el, { picked: props.picked });
    }

    if (tooltipElement) {
      tooltipElement.className = "range-tooltip";
      tooltipElement.style.position = "absolute";
      el.appendChild(tooltipElement);
    }
  }

  protected onUpdate(el: HTMLElement, props: Props): void {
    const { presets } = this.context;

    this.grid.update(props);

    if (Array.isArray(presets) && presets.length > 0) {
      this.presetsContainer.update({ picked: props.picked });
    }
  }
}
