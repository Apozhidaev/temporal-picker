import { Placement } from "@popperjs/core";
import { InputPresentation } from "@temporal-picker/core";
import { PopupElement } from "./PopupElement";

export class PickerElement extends PopupElement {
  constructor() {
    super();
  }

  get picker(): InputPresentation {
    return this.getStringValue("picker", "input") as InputPresentation;
  }
  set picker(value: InputPresentation) {
    this.setAttribute("picker", value);
  }

  get placement(): Placement {
    return this.getStringValue("placement", "bottom") as Placement;
  }
  set placement(value: Placement) {
    this.setAttribute("placement", value);
  }

  get disabled() {
    return this.getBooleanValue("disabled");
  }
  set disabled(value: boolean) {
    if (value) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
  }

  get readonly() {
    return this.getBooleanValue("readonly");
  }
  set readonly(value: boolean) {
    if (value) {
      this.setAttribute("readonly", "");
    } else {
      this.removeAttribute("readonly");
    }
  }

  get native() {
    return this.getBooleanValue("native");
  }
  set native(value: boolean) {
    if (value) {
      this.setAttribute("native", "");
    } else {
      this.removeAttribute("native");
    }
  }
}
