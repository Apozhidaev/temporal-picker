import { InputPresentation } from "@temporal-picker/core";
import { TemporalElement } from "./TemporalElement";

export class InputElement extends TemporalElement {
  constructor() {
    super();
  }

  get presentation(): InputPresentation {
    return this.getStringValue("presentation", "input") as InputPresentation;
  }
  set presentation(value: InputPresentation) {
    this.setAttribute("presentation", value);
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

  get open() {
    return this.getBooleanValue("open");
  }
  set open(value: boolean) {
    if (value) {
      this.setAttribute("open", "");
    } else {
      this.removeAttribute("open");
    }
  }
}
