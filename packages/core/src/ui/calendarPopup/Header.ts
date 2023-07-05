import { Control } from "../base/Control";
import { PopupContext } from "./types";

type Props = {};

export class Header extends Control<Props, PopupContext> {
  constructor(host: HTMLElement, context: PopupContext) {
    super(host, context, "header");
  }

  get type(): string {
    return "calendar-popup-header";
  }

  protected onRender(el: HTMLElement) {
    const { header } = this.context;
    if (header instanceof HTMLElement) {
      el.appendChild(header);
    }

    if (typeof header === "string") {
      el.innerHTML = header;
    }
  }
}
