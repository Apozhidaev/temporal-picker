import { Container } from "../base/Container";
import { Header } from "./Header";
import { Grid } from "./grid/Grid";
import { Footer } from "./Footer";
import { GridPopupContext } from "./types";

type Props = {
  entry: string;
  picked: string[];
  hover?: string;
};

export class GridPopup extends Container<GridPopupContext, Props> {
  private header = new Header();
  private grid = new Grid();
  private footer = new Footer();

  get type(): string {
    return "Popup";
  }

  protected onRender(el: HTMLElement, props: Props) {
    el.className =
      "container extra-options-plugin preset-plugin keyboard-plugin range";
    if (this.context.header) {
      this.header.render(el, {});
    }

    this.grid.render(
      el,
      {
        entry: props.entry,
        picked: props.picked,
        hover: props.hover,
      },
    );

    if (!this.context.autoApply) {
      this.footer.render(
        el,
        {
          picked: props.picked,
        },
      );
    }
  }

  protected onUpdate(el: HTMLElement, props: Props): void {
    this.grid.update(
      {
        entry: props.entry,
        picked: props.picked,
        hover: props.hover,
      },
    );
    if (!this.context.autoApply) {
      this.footer.update(
        {
          picked: props.picked,
        },
      );
    }
  }
}
