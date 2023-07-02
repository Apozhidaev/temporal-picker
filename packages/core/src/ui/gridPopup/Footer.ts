import { Control } from "../base/Control";
import { GridPopupContext } from "./types";

type Props = {
  picked: string[];
};

export class Footer extends Control<Props, GridPopupContext> {
  constructor() {
    super("footer");
  }

  get type(): string {
    return "Footer";
  }

  protected render(el: HTMLElement, { picked }: Props) {
    const { dictionary, pickCount } = this.getContext(el);
    const buttons = document.createElement("div");
    buttons.className = "footer-buttons";

    const cancelButton = document.createElement("button");
    cancelButton.className = "cancel-button unit";
    cancelButton.innerHTML = dictionary?.cancel || "Cancel";
    buttons.appendChild(cancelButton);

    const applyButton = document.createElement("button");
    applyButton.className = "apply-button unit";
    applyButton.innerHTML = dictionary?.apply || "Apply";
    applyButton.disabled = picked.length !== pickCount;
    buttons.appendChild(applyButton);

    el.appendChild(buttons);
  }
}
