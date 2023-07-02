import { Context } from "../base/Context";
import { Header } from "./Header";
import { Grid } from "./grid/Grid";
import { Footer } from "./Footer";
import { GridPopupContext } from "./types";

type Props = {
  entry: string;
  picked: string[];
  hover?: string;
};

export class GridPopup extends Context<GridPopupContext, Props> {
  private header = new Header();
  private grid = new Grid();
  private footer = new Footer();

  get type(): string {
    return "Popup";
  }

  protected render(el: HTMLElement, props: Props, namespace: string) {
    el.className =
      "container extra-options-plugin preset-plugin keyboard-plugin range";
    if (this.context.header) {
      this.header.memo(el, {}, namespace);
    }

    this.grid.memo(
      el,
      {
        entry: props.entry,
        picked: props.picked,
        hover: props.hover,
      },
      namespace
    );

    if (!this.context.autoApply) {
      this.footer.memo(
        el,
        {
          picked: props.picked,
        },
        namespace
      );
    }
  }
}
