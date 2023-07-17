import { PlainType, PickerType } from "@temporal-picker/core";
import { CustomElement } from "./CustomElement";

export class TemporalElement extends CustomElement {
  constructor() {
    super();
  }

  get type(): PickerType {
    return this.getStringValue("type", "plain") as PickerType;
  }
  set type(value: PickerType) {
    this.setAttribute("type", value);
  }

  get plain(): PlainType {
    return this.getStringValue("plain", "date") as PlainType;
  }
  set plain(value: PlainType) {
    this.setAttribute("plain", value);
  }

  get start() {
    return this.getStringValue("start");
  }
  set start(value: string) {
    if (value) {
      this.setAttribute("start", value);
    } else {
      this.removeAttribute("start");
    }
  }

  get end() {
    return this.getStringValue("end");
  }
  set end(value: string) {
    if (value) {
      this.setAttribute("end", value);
    } else {
      this.removeAttribute("end");
    }
  }

  get value() {
    return this.getStringValue("value");
  }
  set value(value: string) {
    if (value) {
      this.setAttribute("value", value);
    } else {
      this.removeAttribute("value");
    }
  }

  get min() {
    return this.getStringValue("min");
  }
  set min(value: string) {
    if (value) {
      this.setAttribute("min", value);
    } else {
      this.removeAttribute("min");
    }
  }

  get max() {
    return this.getStringValue("max");
  }
  set max(value: string) {
    if (value) {
      this.setAttribute("max", value);
    } else {
      this.removeAttribute("max");
    }
  }

  get locale() {
    return this.getStringValue("locale", "en-US");
  }
  set locale(value: string) {
    if (value) {
      this.setAttribute("locale", value);
    } else {
      this.removeAttribute("locale");
    }
  }
}
