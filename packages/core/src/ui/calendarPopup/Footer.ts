import { Control } from "../base/Control";
import { PopupContext } from "./types";

type Props = {
  isValid: boolean;
};

export class Footer extends Control<Props, PopupContext> {
  constructor(host: HTMLElement, context: PopupContext) {
    super(host, context, "footer");
  }

  get type(): string {
    return "calendar-popup-footer";
  }

  protected onRender(el: HTMLElement, { isValid }: Props) {
    const { localeCancel, localeApply } = this.context;
    const buttons = document.createElement("div");
    buttons.className = "footer-buttons";

    const cancelButton = document.createElement("button");
    cancelButton.className = "cancel-button unit";
    cancelButton.innerText = localeCancel || "Cancel";
    buttons.appendChild(cancelButton);

    const applyButton = document.createElement("button");
    applyButton.className = "apply-button unit";
    applyButton.innerText = localeApply || "Apply";
    applyButton.disabled = !isValid;
    buttons.appendChild(applyButton);

    el.appendChild(buttons);
  }

  protected onUpdate(el: HTMLElement, props: Props): void {
    el.innerHTML = "";
    this.onRender(el, props);
  }
}
