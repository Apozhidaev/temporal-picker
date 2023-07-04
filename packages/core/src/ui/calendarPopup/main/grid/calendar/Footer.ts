import { Control } from "../../../../base/Control";

type Props = {};

export class Footer extends Control<Props> {
  constructor() {
    super();
  }

  get type(): string {
    return "calendar-footer";
  }

  protected onRender(el: HTMLElement, props: Props) {
    el.className = "footer";
  }
}
