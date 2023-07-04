import { Control } from "../base/Control";
import { PopupContext } from "./types";

type Props = {};

export class Header extends Control<Props, PopupContext> {
  constructor() {
    super("header");
  }

  get type(): string {
    return "calendar-popup-header";
  }

  protected onRender(el: HTMLElement) {
    const { header } = this.getContext(el);
    if (header instanceof HTMLElement) {
      el.appendChild(header);
    }

    if (typeof header === "string") {
      el.innerHTML = header;
    }
  }
}
