import { Control } from "../../base/Control";
import { GridPopupContext } from "../types";
import { Grid } from "./grid/Grid";

type Props = {
  entry: string;
  picked: string[];
  hover?: string;
};

export class Main extends Control<Props, GridPopupContext> {
  private grid = new Grid();

  constructor() {
    super("main");
  }

  get type(): string {
    return "Main";
  }

  protected onRender(el: HTMLElement, props: Props) {
    const { tooltipElement } = this.getContext(el);

    this.grid.render(el, props);

    if (tooltipElement) {
      tooltipElement.className = "range-tooltip";
      tooltipElement.style.position = "absolute"
      el.appendChild(tooltipElement);
    }
  }

  protected onUpdate(el: HTMLElement, props: Props): void {
    this.grid.update(props);
  }
}
