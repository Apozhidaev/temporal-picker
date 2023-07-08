import { Container } from "../base/Container";
import { Header } from "./Header";
import { Main } from "./main/Main";
import { Footer } from "./Footer";
import { PopupContext } from "./types";

type Props = {
  entry: string;
  picked: (string | undefined)[];
  isValid: boolean;
};

export class CalendarPopup extends Container<Props, PopupContext> {
  private header;
  private main;
  private footer;

  constructor(host: HTMLElement, context: PopupContext) {
    super(host, context);
    this.header = new Header(host, context);
    this.main = new Main(host, context);
    this.footer = new Footer(host, context);
  }

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
    });

    if (!this.context.autoApply) {
      this.footer.render(el, {
        isValid: props.isValid,
      });
    }
  }

  protected onUpdate(el: HTMLElement, props: Props): void {
    this.main.update({
      entry: props.entry,
      picked: props.picked,
    });
    if (!this.context.autoApply) {
      this.footer.update({
        isValid: props.isValid,
      });
    }
  }
}
