import { Control } from "../../../base/Control";

type Props = {};

export class Footer extends Control<Props> {
  constructor() {
    super();
  }

  get type(): string {
    return "Footer";
  }

  protected render(el: HTMLElement, props: Props) {
    el.className = "footer";
  }
}
