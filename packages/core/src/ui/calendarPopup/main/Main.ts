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
  private grid = new Grid();
  private presetsContainer = new Presets();

  constructor() {
    super("main");
  }

  get type(): string {
    return "Main";
  }

  protected onRender(el: HTMLElement, props: Props) {
    const { presets, tooltipElement, presetPosition } = this.getContext(el);

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
    const { presets } = this.getContext(el);

    this.grid.update(props);

    if (Array.isArray(presets) && presets.length > 0) {
      this.presetsContainer.update(props);
    }
  }
}
