import { Container } from "../base/Container";
import { Header } from "./Header";
import { Main } from "./main/Main";
import { Footer } from "./Footer";
import { PopupContext } from "./types";

type Props = {
  entry: string;
  picked: string[];
  hover?: string;
};

export class CalendarPopup extends Container<PopupContext, Props> {
  private header = new Header();
  private main = new Main();
  private footer = new Footer();

  get type(): string {
    return "calendar-popup";
  }

  protected onRender(el: HTMLElement, props: Props) {
    el.className = "container preset-plugin lock-plugin keyboard-plugin range";
    if (this.context.extraSelect || this.context.resetButton) {
      el.classList.add("extra-options-plugin");
    }
    if (this.context.header) {
      this.header.render(el, {});
    }

    this.main.render(el, {
      entry: props.entry,
      picked: props.picked,
      hover: props.hover,
    });

    if (!this.context.autoApply) {
      this.footer.render(el, {
        picked: props.picked,
      });
    }
  }

  protected onUpdate(el: HTMLElement, props: Props): void {
    this.main.update({
      entry: props.entry,
      picked: props.picked,
      hover: props.hover,
    });
    if (!this.context.autoApply) {
      this.footer.update({
        picked: props.picked,
      });
    }
  }
}
