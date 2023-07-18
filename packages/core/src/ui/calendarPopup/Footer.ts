import { PlainType } from "../../types";
import { t } from "../../utils";
import { Control } from "../base/Control";
import { PopupContext } from "./types";

type Props = {
  picked: string[];
  isValid: boolean;
};

export class Footer extends Control<Props, PopupContext> {
  constructor(host: HTMLElement, context: PopupContext) {
    super(host, context, "footer");
  }

  get type(): string {
    return "calendar-popup-footer";
  }

  protected onRender(el: HTMLElement, { picked, isValid }: Props) {
    const { localeCancel, localeApply, plain, locale, grid, pickLabel } = this.context;
    const buttons = document.createElement("div");
    buttons.className = "footer-buttons";

    if (pickLabel) {
      const label = document.createElement("div");
      label.className = "pick-label";
      label.style.marginRight = grid > 1 ? "1.5em" : "auto";
      label.innerText = t(plain).label(picked, locale);
      buttons.appendChild(label);
    }

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
