import { Control } from "../base/Control";
import { GridPopupContext } from "./types";

type Props = {};

export class Header extends Control<Props, GridPopupContext> {
  constructor() {
    super("header");
  }

  get type(): string {
    return "Header";
  }

  protected render(el: HTMLElement) {
    const { header } = this.getContext(el);
    if (header instanceof HTMLElement) {
      el.appendChild(header);
    }

    if (typeof header === "string") {
      el.innerHTML = header;
    }
  }
}
